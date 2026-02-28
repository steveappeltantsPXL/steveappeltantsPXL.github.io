import {
    extractGitHubUsername,
    fetchRepositories,
    loadContent,
    retryFetchRepositories,
    updateMetaTags
} from './github-service.js';
import {
    addRepository,
    cancelRepoChanges,
    removeRepository,
    saveRepositories,
    toggleRepoManager
} from './repo-manager.js';
import {
    closeMobileMenu,
    closeNotification,
    handleKeydown,
    handleScrollDebounced,
    initKeyboardShortcuts,
    initScrollAnimations,
    initScrollListener,
    initTheme,
    removeScrollListener,
    scrollToSection,
    scrollToTop,
    showNotification,
    toggleMobileMenu,
    toggleTheme,
    updateActiveSection
} from './ui-methods.js';
import {formatDate, getLanguageClass, getSkillClass} from './utils.js';

// Vue is loaded as a global via the <script> tag in index.html
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
                featuredRepos: ['ASL-Translator', 'WebSLT', 'WebSLT-Frontend'],
                
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
        loadContent,
        updateMetaTags,
        fetchRepositories,
        retryFetchRepositories,
        extractGitHubUsername,
        toggleRepoManager,
        addRepository,
        removeRepository,
        saveRepositories,
        cancelRepoChanges,
        initTheme,
        toggleTheme,
        showNotification,
        closeNotification,
        initScrollListener,
        removeScrollListener,
        handleScrollDebounced,
        updateActiveSection,
        scrollToTop,
        scrollToSection,
        toggleMobileMenu,
        closeMobileMenu,
        initKeyboardShortcuts,
        handleKeydown,
        initScrollAnimations,
        formatDate,
        getLanguageClass,
        getSkillClass
    }
}).mount('#app');