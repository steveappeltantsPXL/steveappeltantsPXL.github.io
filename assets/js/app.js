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
                name: 'Steve Appeltants',
                title: 'Professional Bachelor of Applied Computer Science in Software Management',
                bio: 'Combining 15+ years of business leadership with modern software management and development' +
                    ' expertise. With deep empathy for healthcare technology, architecture of enterprise solutions and lead' +
                    ' multidisciplinary teams to transform research into real-world impact. Always with' +
                    ' sustainability and innovation at the core.',
                email: 'steve.appeltants@outlook.com',
                github: 'https://github.com/steveappeltantsPXL',
                linkedin: 'https://www.linkedin.com/in/steve-appeltants/',
                location: 'Sint-Truiden, Belgium',
                phone: '+32 470 31 01 81',
                githubToken: '__GITHUB_TOKEN_PLACEHOLDER__',
                
                // Featured GitHub repositories
                featuredRepos: [
                    'WebSLT',
                    'WebSLT-Frontend',
                ],
                
                skills: [
                    // Soft Skills (Positions 1-4)
                    {
                        category: 'Leadership & Strategy',
                        items: ['Team Leadership', 'Strategic Planning', 'Coaching & Mentoring', 'Change Management']
                    },
                    {
                        category: 'Communication',
                        items: ['Stakeholder Engagement', 'Cross-Functional Collaboration', 'Technical Communication']
                    },
                    {
                        category: 'Project & Operations',
                        items: ['Project Management', 'Resource Allocation', 'Process Optimization', 'Quality Assurance']
                    },
                    {
                        category: 'Innovation',
                        items: ['Entrepreneurial Mindset', 'Innovation-Driven Approach', 'Continuous Improvement']
                    },
                    
                    // Technical Skills (Positions 6-12)
                    {
                        category: 'Software Management (Primary Role)',
                        items: ['Strategic Planning', 'Stakeholder Management', 'Risk Management',
                            'Change Management', 'Agile/Scrum', 'Quality Assurance', 'Budget Management']
                    },
                    {
                        category: 'Java Stack (Primary Tech)',
                        items: ['Java Essentials', 'Java Advanced', 'Spring Boot', 'Hibernate',
                            'Maven/Gradle', 'JUnit', 'Microservices']
                    },
                    {
                        category: 'Kotlin & Multiplatform',
                        items: ['Kotlin', 'Kotlin Multiplatform', 'Compose Multiplatform', 'Coroutines']
                    },
                    {
                        category: '.NET Stack (Secondary Tech)',
                        items: ['C# Essentials', 'C# Advanced', 'ASP.NET Core 8.0',
                            'Entity Framework', 'Blazor', '.NET MVC/API']
                    },
                    {
                        category: 'Frontend & Web',
                        items: ['Vue.js', 'React', 'JavaScript', 'TypeScript', 'HTML/CSS', 'Responsive Design']
                    },
                    {
                        category: 'Healthcare & Specializations',
                        items: ['HL7 - FHIR', 'Healthcare Interoperability',
                            'Enterprise Service Bus', 'Medical Data Systems']
                    },
                    {
                        category: 'DevOps & Tools',
                        items: ['Git - SVN', 'CI/CD', 'Docker', 'PostgreSQL', 'Test Automation', 'UX Design']
                    }
                ],
                
                experience: [
                    {
                        title: 'Blueprint & Operations Manager Pilot Cases (Internship)',
                        company: 'PXL Research - Smart ICT Department',
                        period: '2025 - 2026',
                        highlights: [
                            'Blueprint and Operational Manager for CIVIC Tech pilot cases using Agile/Scrum methodology (Scrum Master role)',
                            'Designed and implemented architectural blueprint for research project scalability',
                            'Developed CMS (Content Management System) dashboard for knowledge management and project' +
                            ' tracking',
                            'Coordinated cross-functional teams to deliver research outcomes and ensure stakeholder alignment',
                            'Contributed to Smart ICT research initiatives focused on civic technology solutions'
                        ]
                    },
                    {
                        title: 'Enterprise Service Bus (IT Project)',
                        company: 'Jessa Hospital - ICT Department',
                        period: '2025 - 2026',
                        highlights: [
                            'Leading Octogrid Enterprise Service Bus (ESB) project - Agent/Orchestrator development',
                            'Implementing HL7/FHIR healthcare interoperability solutions',
                            'Full-stack development with Kotlin and Vue.js',
                            'Managing stakeholder requirements and project delivery'
                        ]
                    },
                    {
                        title: 'Entrepreneurship Project',
                        company: 'University College PXL',
                        period: '2024 - 2025',
                        highlights: [
                            'Founded Visear startup concept for real-time sign language translation using AI/ML' +
                            ' technology',
                            'Developed business model targeting accessibility for the deaf community in Belgium and' +
                            ' the Netherlands',
                            'Designed cross-platform architecture with AI-powered bidirectional translation' +
                            ' (speech-to-sign and sign-to-speech)',
                            'Created comprehensive development roadmap and investor presentations demonstrating' +
                            ' market viability',
                            'Established strategic partnerships with PXL-Research, Cegeka and cloud service providers',
                            'Pitched subscription-based SaaS model with a scalable pricing strategy for European' +
                            ' market expansion'
                        ]
                    },
                    {
                        title: 'Research Project (Software Management)',
                        company: 'University College PXL',
                        period: '2022 - 2023',
                        highlights: [
                            'Conducted feasibility research for supermarket automation systems',
                            'Analyzed technical requirements and market viability',
                            'Delivered comprehensive research documentation'
                        ]
                    },
                    {
                        title: 'Research Project (Application Development)',
                        company: 'University College PXL',
                        period: '2021 - 2022',
                        highlights: [
                            'Developed Project Lingo backend and frontend',
                            'Built full-stack solutions with .NET, JavaScript, HTML/CSS',
                            'Applied clean architecture principles'
                        ]
                    }
                ],
                
                education: [
                    {
                        degree: 'Professional Bachelor of Applied Computer Science in Software Management',
                        specialization: 'Software Management and (partial) Application Development',
                        institution: 'University College PXL - Hasselt',
                        period: '2021 - 2026',
                        achievements: [
                            'Software Architecture & Enterprise Solutions',
                            'Software Analysis & Design',
                            'Java & .NET Expert Developer tracks',
                            'ITIL Service Management & DevOps'
                        ]
                    },
                    {
                        degree: 'Electronics & Measurement/Control Technology',
                        institution: 'Technicum (Hasp-O-Centrum) - Sint-Truiden',
                        period: '1987 - 1993 & 1994',
                        achievements: ['Graduated with distinction (75%)']
                    }
                ],
                
                languages: [
                    {language: 'Dutch', level: 'Native'},
                    {language: 'English', level: 'Professional'}
                ],
                
                volunteering: [
                    {
                        title: 'Student Commission Member',
                        organization: 'Hogeschool PXL - Applied Informatics',
                        period: '2021 - 2024',
                        description: 'The Student Commission is a formal body established at the program level, giving students a voice within their own education.',
                        highlights: [
                            'Represented student interests in program-level decision-making',
                            'Provided feedback on educational profile, curriculum, and exam schedules',
                            'Participated in improving student support services and communication'
                        ]
                    },
                    {
                        title: 'Code for Belgium Volunteer',
                        organization: 'Code for Belgium',
                        period: '2025 - Present',
                        website: 'https://codeforbelgium.org/projects/',
                        description: 'Contributing to civic technology projects that improve government services and citizen engagement.',
                        highlights: [
                            'Participate in civic tech hackathons and collaborative projects',
                            'Developed open-source solutions for public sector challenges',
                            'Collaborated with government agencies and civic organizations'
                        ],
                        projects: [
                            {
                                name: 'Naar school in Vlaanderen',
                                description: 'A project focused on providing accessible information about school ' +
                                    'transportation options in Flanders, helping parents and students make informed ' +
                                    'decisions about their commute to school.',
                                website: 'https://naarschoolinvlaanderen.be/'
                            },
                            {
                                name: 'Sint-Vincentius Kuringen',
                                description: 'A project aimed at supporting the operations of the Sint-Vincentius Kuringen, ' +
                                    'enhancing their digital infrastructure and improving patient care through ' +
                                    'technology solutions.',
                                website: 'https://vincentiuskuringen.be/'
                            },
                            {
                                name: 'Help+',
                                description: 'A project designed to help individuals in need by connecting them with ' +
                                    'resources and support services, leveraging technology to facilitate access to help ' +
                                    'and improve community welfare.',
                                website: 'https://www.helpplus.be/'
                            },
                            {
                                name: 'Zorghuis Limburg en Zorghuis Oostende',
                                description: 'A project focused on supporting the booking operations of Zorghuis' +
                                    ' Limburg and Zorghuis Oostende, two organizations providing care and support for' +
                                    ' individuals with chronic illnesses, enhancing their digital infrastructure and' +
                                    ' improving patient care through technology solutions.',
                                website: './under-construction.html'
                            }
                        ]
                    }
                ]
            },
            // ============================================
            // END CONFIGURATION
            // ============================================
            
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
        this.fetchRepositories();
        this.initScrollAnimations();
        this.initScrollListener();
        this.initKeyboardShortcuts();
        this.updateMetaTags();
    },
    
    beforeUnmount() {
        this.removeScrollListener();
        document.removeEventListener('keydown', this.handleKeydown);
    },
    
    methods: {
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
            // Alt + number to jump to section
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
            if (confirm(`Remove "${repoName}" from featured repositories ? `)) {
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
                message: 'Fetching latest repository data...',
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
                    this.error = 'No repositories found. Check repository names and GitHub username.';
                    
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