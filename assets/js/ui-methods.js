// ============================================
// UI METHODS
// ============================================

import { debounce } from './utils.js';

export function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    this.darkMode = savedTheme === 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

export function toggleTheme() {
    this.darkMode = !this.darkMode;
    const theme = this.darkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    this.showNotification({
        title: 'Theme Changed',
        message: `Switched to ${theme} mode`,
        type: 'success'
    });
}

export function showNotification(notification) {
    this.notification = notification;
    setTimeout(() => {
        this.notification = null;
    }, 5000);
}

export function closeNotification() {
    this.notification = null;
}

export function initScrollListener() {
    window.addEventListener('scroll', this.handleScrollDebounced);
}

export function removeScrollListener() {
    window.removeEventListener('scroll', this.handleScrollDebounced);
}

export const handleScrollDebounced = debounce(function () {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    const scrollPercentage = windowHeight > 0 ? Math.round((scrolled / windowHeight) * 100) : 0;

    this.scrollPercentage = scrollPercentage;
    this.showScrollNav = scrollPercentage > 6;
    this.updateActiveSection();
}, 100);

export function updateActiveSection() {
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
}

export function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    this.closeMobileMenu();
}

export function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        this.closeMobileMenu();
    }
}

export function toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
}

export function closeMobileMenu() {
    this.mobileMenuOpen = false;
}

export function initKeyboardShortcuts() {
    document.addEventListener('keydown', this.handleKeydown);
}

export function handleKeydown(e) {
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
}

export function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -10% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
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
}
