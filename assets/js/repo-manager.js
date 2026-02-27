// ============================================
// REPOSITORY MANAGER
// ============================================

import { githubService } from './github-service.js';

export function toggleRepoManager() {
    this.showRepoManager = !this.showRepoManager;
    if (this.showRepoManager) {
        this.tempRepos = [...this.config.featuredRepos];
    }
}

export function addRepository() {
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
}

export function removeRepository(index) {
    const repoName = this.tempRepos[index];
    if (confirm(`Remove "${repoName}" from featured repositories? `)) {
        this.tempRepos.splice(index, 1);
        this.showNotification({
            title: 'Repository Removed',
            message: `${repoName} removed from the list`,
            type: 'info'
        });
    }
}

export function saveRepositories() {
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
}

export function cancelRepoChanges() {
    this.showRepoManager = false;
    this.newRepoName = '';
}
