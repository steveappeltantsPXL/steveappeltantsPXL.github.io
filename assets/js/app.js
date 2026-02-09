const { createApp } = Vue;

createApp({
    data() {
        return {
            config: {
                name: 'Steve Appeltants',
                title: 'Software Manager | Healthcare Tech | AI/ML Enthusiast',
                bio: 'Specialized in healthcare technology applications with expertise in HL7/FHIR messaging systems and accessibility technology.Passionate about building AI/ML solutions that make a difference.',
                email: 'steve.appeltants@outlook.com',
                github: 'steveappeltantsPXL/',
                linkedin: 'https://www.linkedin.com/in/steve-appeltants/',

                featuredRepos: [
                    'repo-name-1',
                    'repo-name-2',
                    'repo-name-3'
                ],

                skills: [
                    {
                        category: 'Primary Languages',
                        items: ['Kotlin', 'Vue.js', 'JavaScript', 'TypeScript']
                    },
                    {
                        category: 'Secondary Languages',
                        items: ['C#', 'ASP.NET', 'MAUI', 'PHP']
                    },
                    {
                        category: 'Specializations',
                        items: ['HL7/FHIR', 'Healthcare Technology', 'AI/ML', 'Accessibility Tech', 'MediaPipe', 'TensorFlow']
                    },
                    {
                        category: 'Tools & Platforms',
                        items: ['Docker', 'PostgreSQL', 'GitHub', 'Gradle', 'Kotlin Multiplatform']
                    }
                ],

                experience: [
                    {
                        title: 'Software Management',
                        company: 'University College PXL',
                        period: '2020 - Present',
                        highlights: [
                            'Developed orchestrator-agent services for healthcare interoperability',
                            'Built AI/ML applications for accessibility technology',
                            'Implemented HL7/FHIR messaging systems',
                            'Created cross-platform solutions using Kotlin Multiplatform'
                        ]
                    }
                ],

                education: [
                    {
                        degree: 'Bachelor of Applied Science in Software Management',
                        institution: 'University College PXL',
                        period: '2020 - Present'
                    }
                ]
            },

            repositories: [],
            loading: false,
            error: null,
            showScrollNav: false,
            scrollPercentage: 0
        };
    },

    mounted() {
        this.fetchRepositories();
        this.initScrollAnimations();
        window.addEventListener('scroll', this.handleScroll.bind(this));
    },

    beforeUnmount() {
        window.removeEventListener('scroll', this.handleScroll.bind(this));
    },

    methods: {
        handleScroll() {
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = window.scrollY;
            const scrollPercentage = windowHeight > 0 ? Math.round((scrolled / windowHeight) * 100) : 0;

            this.scrollPercentage = scrollPercentage;

            // Show scroll nav after scrolling 10% down
            this.showScrollNav = scrollPercentage > 10;
        },

        scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        },

        scrollToSection(sectionId) {
            document.getElementById(sectionId).scrollIntoView({
                behavior: 'smooth'
            });
        },

        showDemo(projectName) {
            alert(`${projectName} demo would be shown here!`);
        },

        initScrollAnimations() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, {
                threshold: 0.2
            });

            document.querySelectorAll('.timeline-item').forEach(item => {
                observer.observe(item);
            });
        },

        async fetchRepositories() {
            if (!this.config.github || this.config.featuredRepos.length === 0) {
                return;
            }

            this.loading = true;
            this.error = null;

            try {
                const repos = [];
                for (const repoName of this.config.featuredRepos) {
                    const response = await fetch(
                        `https://api.github.com/repos/${this.config.github}/${repoName}`
                    );

                    if (!response.ok) {
                        console.error(`Failed to fetch ${repoName}:`, response.status);
                        continue;
                    }

                    const data = await response.json();
                    repos.push(data);
                }

                if (repos.length === 0) {
                    this.error = 'No repositories found. Check your GitHub username and repo names.';
                } else {
                    this.repositories = repos;
                }
            } catch (err) {
                this.error = `Error fetching repositories: ${err.message}`;
                console.error(err);
            } finally {
                this.loading = false;
            }
        }
    }
}).mount('#app');
