// ============================================
// GITHUB API SERVICE
// ============================================

export const githubService = {
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
// CONTENT LOADING
// ============================================

export async function loadContent() {
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
}

// ============================================
// SEO & META TAGS
// ============================================

export function updateMetaTags() {
    document.title = `${this.config.name} - ${this.config.title}`;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute('content', this.config.bio);
    }
}

// ============================================
// FETCH GITHUB REPOSITORIES
// ============================================

export async function fetchRepositories() {
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
                const url = `https://api.github.com/repos/${githubUsername}/${repoName}`;
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

            } catch (err) {
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
    } catch (err) {
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
}

export function retryFetchRepositories() {
    githubService.clearCache();
    this.fetchRepositories();
}

export function extractGitHubUsername(githubUrl) {
    if (githubUrl.includes('github.com/')) {
        const match = githubUrl.match(/github\.com\/([^\/]+)/);
        return match ? match[1] : null;
    }
    return githubUrl.replace(/\/$/, '');
}
