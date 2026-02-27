// ============================================
// UTILITY FUNCTIONS
// ============================================

export function debounce(func, wait) {
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

export function formatDate(dateString) {
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
}

export function getLanguageClass(language) {
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
}

export function getSkillClass(skill) {
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
