// ============================================
// UTILITY FUNCTIONS
// ============================================

// Debounce helper for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func.apply(this, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// GitHub API Service with caching
const githubService = {
    cache: new Map(),
    cacheTimeout: 5 * 60 * 1000, // 5 minutes
    
    async fetchWithCache(url, options = {}) {
        const cacheKey = url;
        const cached = this.cache.get(cacheKey);
        
        // Return cached data if valid
        if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
            console.log('Using cached data for:', url);
            return {data: cached.data, fromCache: true};
        }
        
        try {
            const response = await fetch(url, options);
            
            // Check rate limits
            const remaining = response.headers.get('X-RateLimit-Remaining');
            const resetTime = response.headers.get('X-RateLimit-Reset');
            
            if (remaining === '0') {
                const resetDate = new Date(resetTime * 1000);
                throw new Error(`GitHub API rate limit exceeded. Resets at ${resetDate.toLocaleTimeString()}`);
            }
            
            // Log rate limit info
            console.log(`GitHub API rate limit: ${remaining} remaining`);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            
            // Cache the successful response
            this.cache.set(cacheKey, {data, timestamp: Date.now()});
            
            return {data, fromCache: false};
        } catch (error) {
            // Return stale cached data if available
            if (cached) {
                console.warn('Using stale cache due to error:', error.message);
                return {data: cached.data, fromCache: true, stale: true};
            }
            throw error;
        }
    },
    
    clearCache() {
        this.cache.clear();
        console.log('GitHub cache cleared');
    }
};

// ============================================
// VUE APPLICATION
// ============================================

const {createApp} = Vue;

createApp({
    data() {
        return {
            // ============================================
            // CONFIGURATION - Update with your information
            // ============================================
            config: {
                // Personal info — loaded via fetch from assets/data/profile.json
                name: '', title: '', bio: '', email: '',
                github: '', linkedin: '', location: '', phone: '',

                // Managed by CI (token placeholder) and repo manager UI
                githubToken: '__GITHUB_TOKEN_PLACEHOLDER__',
                featuredRepos: ['WebSLT', 'WebSLT-Frontend'],

                // Content — loaded via fetch from assets/data/content.json
                skills: [],
                experience: [],
                education: [],
                languages: [],
                volunteering: []
            },
            // ============================================
            // END CONFIGURATION
            // ============================================
            
            // Content loading state
            contentLoaded: false,
            contentError: null,

            // Application state
            repositories: [],
            loading: false,
            error: null,
            notification: null,
            showScrollNav: false,
            scrollPercentage: 0,
            activeSection: '',
            
            // Repository management
            showRepoManager: false,
            newRepoName: '',
            tempRepos: [],
            
            // UI state
            mobileMenuOpen: false,
            darkMode: false,
            
            // Skills separation
            softSkillsCount: 4
        };
    },
    
    computed: {
        softSkills() {
            return this.config.skills.slice(0, this.softSkillsCount);
        },
        technicalSkills() {
            return this.config.skills.slice(this.softSkillsCount);
        },
        hasValidGithubToken() {
            return this.config.githubToken &&
                this.config.githubToken !== '__GITHUB_TOKEN_PLACEHOLDER__' &&
                this.config.githubToken.trim() !== '';
        }
    },
    
    mounted() {
        this.initTheme();
        this.loadContent();
        this.initScrollAnimations();
        this.initScrollListener();
        this.initKeyboardShortcuts();
    },
    
    beforeUnmount() {
        this.removeScrollListener();
        document.removeEventListener('keydown', this.handleKeydown);
    },
    
    methods: {
        // ============================================
        // Content Loading
        // ============================================
        async loadContent() {
            try {
                const [profile, content] = await Promise.all([
                    fetch('/assets/data/profile.json').then(r => r.json()),
                    fetch('/assets/data/content.json').then(r => r.json())
                ]);
                Object.assign(this.config, profile, content);
                this.contentLoaded = true;
                this.updateMetaTags();
                await this.fetchRepositories();
            } catch (e) {
                this.contentError = 'Portfolio content kon niet geladen worden.';
                console.error('Content load error:', e);
            }
        },

        // ============================================
        // Theme Management
        // ============================================
        initTheme() {
            const savedTheme = localStorage.getItem('theme') || 'light';
            this.darkMode = savedTheme === 'dark';
            document.documentElement.setAttribute('data-theme', savedTheme);
        },
        
        toggleTheme() {
            this.darkMode = !this.darkMode;
            const theme = this.darkMode ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            
            this.showNotification({
                title: 'Theme Changed',
                message: `Switched to ${theme} mode`,
                type: 'success'
            });
        },
        
        // ============================================
        // Notification System
        // ============================================
        showNotification(notification) {
            this.notification = notification;
            setTimeout(() => {
                this.notification = null;
            }, 5000);
        },
        
        closeNotification() {
            this.notification = null;
        },
        
        // ============================================
        // Scroll Handling (Debounced)
        // ============================================
        initScrollListener() {
            window.addEventListener('scroll', this.handleScrollDebounced);
        },
        
        removeScrollListener() {
            window.removeEventListener('scroll', this.handleScrollDebounced);
        },
        
        handleScrollDebounced: debounce(function () {
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = window.scrollY;
            const scrollPercentage = windowHeight > 0 ? Math.round((scrolled / windowHeight) * 100) : 0;
            
            this.scrollPercentage = scrollPercentage;
            this.showScrollNav = scrollPercentage > 6;
            this.updateActiveSection();
        }, 100),
        
        updateActiveSection() {
            const sections = ['soft-skills', 'technical-skills', 'experience',
                'education', 'volunteering', 'projects', 'github'];
            
            for (const sectionId of sections) {
                const element = document.getElementById(sectionId);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= window.innerHeight / 3 && rect.bottom >= window.innerHeight / 3) {
                        this.activeSection = sectionId;
                        break;
                    }
                }
            }
        },
        
        scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            this.closeMobileMenu();
        },
        
        scrollToSection(sectionId) {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                this.closeMobileMenu();
            }
        },
        
        // ============================================
        // Mobile Menu
        // ============================================
        toggleMobileMenu() {
            this.mobileMenuOpen = !this.mobileMenuOpen;
        },
        
        closeMobileMenu() {
            this.mobileMenuOpen = false;
        },
        
        // ============================================
        // Keyboard Shortcuts
        // ============================================
        initKeyboardShortcuts() {
            document.addEventListener('keydown', this.handleKeydown);
        },
        
        handleKeydown(e) {
            // Alt + number to jump to a section
            if (e.altKey && !isNaN(e.key)) {
                const sections = ['soft-skills', 'technical-skills', 'experience',
                    'education', 'volunteering', 'projects', 'github'];
                const index = parseInt(e.key) - 1;
                if (sections[index]) {
                    this.scrollToSection(sections[index]);
                    e.preventDefault();
                }
            }
            
            // Escape to close dialogs
            if (e.key === 'Escape') {
                if (this.showRepoManager) {
                    this.cancelRepoChanges();
                }
                if (this.mobileMenuOpen) {
                    this.closeMobileMenu();
                }
                if (this.notification) {
                    this.closeNotification();
                }
            }
            
            // Alt + T for theme toggle
            if (e.altKey && e.key.toLowerCase() === 't') {
                this.toggleTheme();
                e.preventDefault();
            }
        },
        
        // ============================================
        // Scroll Animations (Intersection Observer)
        // ============================================
        initScrollAnimations() {
            const observerOptions = {
                threshold: 0.15,
                rootMargin: '0px 0px -10% 0px'
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        // Optionally unobserve after animation completes
                        // observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);
            
            // Observe all timeline items
            const timelineItems = document.querySelectorAll('.timeline-item');
            timelineItems.forEach(item => {
                observer.observe(item);
            });
            
            // Observe other animated elements
            const animatedElements = document.querySelectorAll('.animate-on-scroll');
            animatedElements.forEach(el => {
                observer.observe(el);
            });
        },
        
        // ============================================
        // GitHub Repository Management
        // ============================================
        toggleRepoManager() {
            this.showRepoManager = !this.showRepoManager;
            if (this.showRepoManager) {
                this.tempRepos = [...this.config.featuredRepos];
            }
        },
        
        addRepository() {
            const repoName = this.newRepoName.trim();
            
            if (!repoName) {
                this.showNotification({
                    title: 'Validation Error',
                    message: 'Please enter a repository name',
                    type: 'warning'
                });
                return;
            }
            
            if (this.tempRepos.includes(repoName)) {
                this.showNotification({
                    title: 'Duplicate Repository',
                    message: 'This repository is already in the list',
                    type: 'warning'
                });
                return;
            }
            
            this.tempRepos.push(repoName);
            this.newRepoName = '';
            
            this.showNotification({
                title: 'Repository Added',
                message: `${repoName} added to the list`,
                type: 'success'
            });
        },
        
        removeRepository(index) {
            const repoName = this.tempRepos[index];
            if (confirm(`Remove "${repoName}" from featured repositories? `)) {
                this.tempRepos.splice(index, 1);
                this.showNotification({
                    title: 'Repository Removed',
                    message: `${repoName} removed from the list`,
                    type: 'info'
                });
            }
        },
        
        saveRepositories() {
            this.config.featuredRepos = [...this.tempRepos];
            
            // Clear cache to force fresh fetch
            githubService.clearCache();
            
            // Fetch updated repositories
            this.fetchRepositories();
            
            this.showRepoManager = false;
            
            this.showNotification({
                title: 'Repositories Updated',
                message: 'Fetching the latest repository data...',
                type: 'success'
            });
        },
        
        cancelRepoChanges() {
            this.showRepoManager = false;
            this.newRepoName = '';
        },
        
        // ============================================
        // Fetch GitHub Repositories (Enhanced)
        // ============================================
        async fetchRepositories() {
            if (!this.config.github || this.config.featuredRepos.length === 0) {
                this.error = null;
                this.repositories = [];
                return;
            }
            
            this.loading = true;
            this.error = null;
            
            try {
                const githubUsername = this.extractGitHubUsername(this.config.github);
                
                if (!githubUsername) {
                    throw new Error('Invalid GitHub URL format');
                }
                
                const repos = [];
                const failedRepos = [];
                
                // Fetch repositories with caching
                for (const repoName of this.config.featuredRepos) {
                    try {
                        const url = `https
    ://api.github.com/repos/${githubUsername}/${repoName}`;
                        const headers = {
                            'Accept': 'application/vnd.github.v3+json'
                        };
                        
                        // Only add Authorization if we have a valid token
                        if (this.hasValidGithubToken) {
                            headers['Authorization'] = `Bearer ${this.config.githubToken}`;
                        }
                        
                        const {data, fromCache, stale} = await githubService.fetchWithCache(url, {headers});
                        
                        // Add metadata about cache status
                        repos.push({
                            ...data,
                            _cached: fromCache,
                            _stale: stale || false
                        });
                        
                        if (fromCache) {
                            console.log(`Using cached data for ${repoName}${stale ? ' (stale)' : ''}`);
                        }
                        
                    } catch
                        (err) {
                        console.error(`Error fetching ${repoName}:`, err);
                        failedRepos.push({name: repoName, error: err.message});
                    }
                }
                
                if (repos.length === 0) {
                    this.error = 'No repositories were found. Check repository names and GitHub username.';
                    
                    if (failedRepos.length > 0) {
                        this.error += '\n\nFailed repositories:\n' +
                            failedRepos.map(r => `- ${r.name}: ${r.error}`).join('\n');
                    }
                } else {
                    this.repositories = repos;
                    
                    // Show notification if using cached data
                    const cachedCount = repos.filter(r => r._cached).length;
                    if (cachedCount > 0) {
                        console.log(`${cachedCount}/${repos.length} repositories loaded from cache`);
                    }
                    
                    // Warn about failed repos
                    if (failedRepos.length > 0) {
                        this.showNotification({
                            title: 'Partial Success',
                            message: `${repos.length} repositories loaded. ${failedRepos.length} failed to load.`,
                            type: 'warning'
                        });
                    }
                }
            } catch
                (err) {
                this.error = `Error fetching repositories: ${err.message}`;
                console.error('Repository fetch error:', err);
                
                this.showNotification({
                    title: 'Error',
                    message: err.message,
                    type: 'error'
                });
            } finally {
                this.loading = false;
            }
        },
        
        retryFetchRepositories() {
            githubService.clearCache();
            this.fetchRepositories();
        },
        
        extractGitHubUsername(githubUrl) {
            if (githubUrl.includes('github.com/')) {
                const match = githubUrl.match(/github\.com\/([^\/]+)/);
                return match ? match[1] : null;
            }
            return githubUrl.replace(/\/$/, '');
        },
        
        // ============================================
        // SEO & Meta Tags
        // ============================================
        updateMetaTags() {
            document.title = `${this.config.name} - ${this.config.title}`;
            
            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
                metaDescription.setAttribute('content', this.config.bio);
            }
        },
        
        // ============================================
        // Utility Functions
        // ============================================
        formatDate(dateString) {
            const date = new Date(dateString);
            const now = new Date();
            const diffTime = Math.abs(now - date);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays < 7) {
                return `${diffDays}d ago`;
            } else if (diffDays < 30) {
                return `${Math.floor(diffDays / 7)}w ago`;
            } else if (diffDays < 365) {
                return `${Math.floor(diffDays / 30)}mo ago`;
            } else {
                return `${Math.floor(diffDays / 365)}y ago`;
            }
        },
        
        getLanguageClass(language) {
            const langMap = {
                'Java': 'java',
                'Kotlin': 'kotlin',
                'C#': 'dotnet',
                'Vue': 'vue',
                'React': 'react',
                'JavaScript': 'javascript',
                'TypeScript': 'typescript',
                'HTML': 'html',
                'CSS': 'css'
            };
            return langMap[language] || '';
        },
        
        getSkillClass(skill) {
            const skillLower = skill.toLowerCase();
            
            if (skillLower.includes('java') && !skillLower.includes('javascript')) {
                return 'java';
            }
            if (skillLower.includes('kotlin')) {
                return 'kotlin';
            }
            if (skillLower.includes('c#') || skillLower.includes('.net') ||
                skillLower.includes('asp.net') || skillLower.includes('blazor')) {
                return 'dotnet';
            }
            if (skillLower.includes('vue')) {
                return 'vue';
            }
            if (skillLower.includes('react')) {
                return 'react';
            }
            if (skillLower.includes('typescript')) {
                return 'typescript';
            }
            if (skillLower.includes('javascript')) {
                return 'javascript';
            }
            
            return '';
        }
    }
}).mount('#app');