const { createApp } = Vue;

createApp({
    data() {
        return {
            // ============================================
            // CONFIGURATION - Update with your information
            // ============================================
            config: {
                name: 'Steve Appeltants',
                title: 'Software Manager | Prof. Bachelor of Applied Science',
                bio: 'Final year student combining 15+ years of business leadership with modern software management' +
                    ' expertise. With deep empassie for healthcare technology, architecture of enterprise solutions and lead' +
                    ' multidisciplinary teams to transform research into real-world impact. Always with' +
                    ' sustainability and innovation are at the core.',
                email: 'steve.appeltants@outlook.com',
                github: 'https://github.com/steveappeltantsPXL',
                linkedin: 'https://www.linkedin.com/in/steve-appeltants/',
                location: 'Sint-Truiden, Belgium',
                phone: '+32 470 31 01 81',
                githubToken: '__GITHUB_TOKEN_PLACEHOLDER__',

                // Featured GitHub repositories (add your repo names here)
                featuredRepos: [
                    'steveappeltantsPXL.github.io',
                    'WebSLT',
                    'WebSLT-Frontend',                ],
                
                skills: [
                    // ========================================
                    // SOFT SKILLS (Positions 1-5)
                    // ========================================
                    {
                        category: 'Leadership & Management',
                        items: ['Team Leadership', 'Strategic Planning', 'Coaching & Mentoring',
                                'Quality Assurance', 'Risk Management', 'Stakeholder Management']
                    },
                    {
                        category: 'Communication & Networking',
                        items: ['Stakeholder Engagement', 'Cross-Functional Collaboration',
                                'Technical Communication', 'Persuasion & Influence',
                                'Active Listening']
                    },
                    {
                        category: 'Organizational & Administrative',
                        items: ['Project Management', 'Budget Management', 'Resource Allocation',
                                'Planning & Coordination', 'Process Optimization']
                    },
                    {
                        category: 'Entrepreneurial & Innovation',
                        items: ['Entrepreneurial Mindset', 'Innovation-Driven Approach',
                                'Business Development', 'Change Management',
                                'Initiative & Ownership', 'Continuous Improvement']
                    },
                    {
                        category: 'X-Factor Model Alignment',
                        items: ['Passion & Empathy', 'Collaborative Spirit',
                                'Sustainability Mindset', 'Adaptability',
                                'Pragmatic Thinking', 'International Orientation']
                    },

                    // ========================================
                    // TECHNICAL SKILLS (Positions 6-12)
                    // ========================================
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
                        items: ['Vue.js', 'JavaScript', 'TypeScript', 'HTML/CSS', 'Responsive Design']
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
                            'Blueprint and Operational Manager for CIVIC Tech pilot cases using Agile/Scrum' +
                            ' methodology (Scrum Master role)',
                            'Designed and implemented architectural blueprint for research project scalability',
                            'Developed CSM (Content Management System) dashboard for knowledge management and project tracking',
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
                    },
                    {
                        title: 'Project Lead',
                        company: 'Algemene Aannemingen Janssen NV',
                        period: '2018 - 2020',
                        highlights: [
                            'Led the Waterkant Mechelen construction project',
                            'Managed cross-functional teams and budgets',
                            'Coordinated stakeholder communications'
                        ]
                    },
                    {
                        title: 'Managing Director',
                        company: 'S&C Invest BV (Management Company)',
                        period: '2010 - 2016',
                        highlights: [
                            'Strategic business management and planning',
                            'Financial oversight and budget management',
                            'Delegated administrator for Mascom NV (2013-2015)'
                        ]
                    },
                    {
                        title: 'Managing Director',
                        company: 'Appeltants Bouw BV & Appeltants Dak & Gevel BV',
                        period: '2001 - 2013',
                        highlights: [
                            'Built and led construction companies',
                            'Managed operations, teams, and client relationships',
                            'Delivered consistent business growth'
                        ]
                    }
                ],
                
                education: [
                    {
                        degree: 'Professional Bachelor of Applied Informatics',
                        specialization: 'Software Management, Application Development',
                        institution: 'University College PXL - Hasselt',
                        period: '2021 - 2026',
                        achievements: [
                            'Software Analysis & Quality Engineering',
                            'UX Design & Automated Testing',
                            'Java Expert & .NET Developer tracks',
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
                    { language: 'Dutch', level: 'Native' },
                    { language: 'English', level: 'Professional' }
                ],

                volunteering: [
                    {
                        title: 'Student Commission Member',
                        organization: 'Hogeschool PXL - Applied Informatics',
                        period: '2021 - 2024',
                        description: 'The Student Commission is a formal body established at the program level, giving students a voice within their own education. Members advise on all student and education-related topics including curriculum, schedules, student guidance, and communication.',
                        highlights: [
                            'Represented student interests in program-level decision-making',
                            'Provided feedback on educational profile, curriculum, and exam schedules',
                            'Participated in improving student support services and communication',
                            'Collaborated with program leadership on student-related initiatives',
                            'Served as a bridge between students and faculty administration'
                        ]
                    },
                    {
                        title: 'Code for Belgium Volunteer',
                        organization: 'Code for Belgium',
                        period: '2023 - Present',
                        website: 'https://codeforbelgium.org/projects/',
                        description: 'Contributing to civic technology projects that improve government services and citizen engagement through open-source development.',
                        highlights: [
                            'Participate in civic tech hackathons and collaborative projects',
                            'Developed open-source solutions for public sector challenges',
                            'Collaborated with government agencies and civic organizations',
                            'Contributed to projects improving transparency and accessibility'
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
                                website: 'https://www.zorghuislimburg.be/'
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
            showScrollNav: false,
            scrollPercentage: 0,
            
            // Repository management
            showRepoManager: false,
            newRepoName: '',
            tempRepos: [],

            // Skills separation
            softSkillsCount: 5  // The first 5 categories are soft skills
        };
    },

    computed: {
        softSkills() {
            return this.config.skills.slice(0, this.softSkillsCount);
        },
        technicalSkills() {
            return this.config.skills.slice(this.softSkillsCount);
        }
    },
    
    mounted() {
        this.fetchRepositories();
        this.initScrollAnimations();
        this.initScrollListener();
    },
    
    beforeUnmount() {
        this.removeScrollListener();
    },
    
    methods: {
        // ============================================
        // Scroll Handling
        // ============================================
        initScrollListener() {
            window.addEventListener('scroll', this.handleScroll);
        },
        
        removeScrollListener() {
            window.removeEventListener('scroll', this.handleScroll);
        },
        
        handleScroll() {
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = window.scrollY;
            const scrollPercentage = windowHeight > 0 ? Math.round((scrolled / windowHeight) * 100) : 0;
            
            this.scrollPercentage = scrollPercentage;
            this.showScrollNav = scrollPercentage > 6;
        },
        
        scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        },
        
        scrollToSection(sectionId) {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        },
        
        // ============================================
        // Scroll Animations (Timeline)
        // ============================================
        initScrollAnimations() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, {
                threshold: 0.2,
                rootMargin: '0px 0px -50px 0px'
            });
            
            const timelineItems = document.querySelectorAll('.timeline-item');
            timelineItems.forEach(item => {
                observer.observe(item);
            });
        },
        
        // ============================================
        // GitHub Repository Management
        // ============================================
        toggleRepoManager() {
            this.showRepoManager = !this.showRepoManager;
            if (this.showRepoManager) {
                // Create a copy of current repos for editing
                this.tempRepos = [...this.config.featuredRepos];
            }
        },
        
        addRepository() {
            const repoName = this.newRepoName.trim();
            
            if (!repoName) {
                alert('Please enter a repository name');
                return;
            }
            
            // Check for duplicates
            if (this.tempRepos.includes(repoName)) {
                alert('This repository is already in the list');
                return;
            }
            
            this.tempRepos.push(repoName);
            this.newRepoName = '';
        },
        
        removeRepository(index) {
            if (confirm('Are you sure you want to remove this repository?')) {
                this.tempRepos.splice(index, 1);
            }
        },
        
        saveRepositories() {
            // Update the config with new repos
            this.config.featuredRepos = [...this.tempRepos];
            
            // Fetch the updated repositories
            this.fetchRepositories();
            
            // Close the manager
            this.showRepoManager = false;
            
            // Notify user
            alert('Repository list updated! The page will now fetch the new repositories.');
        },
        
        cancelRepoChanges() {
            this.showRepoManager = false;
            this.newRepoName = '';
        },
        
        // ============================================
        // Fetch GitHub Repositories
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
                // Extract username from GitHub URL
                const githubUsername = this.extractGitHubUsername(this.config.github);
                
                const repos = [];
                const failedRepos = [];
                
                for (const repoName of this.config.featuredRepos) {
                    try {
                        const response = await fetch(
                            `https://api.github.com/repos/${githubUsername}/${repoName}`,
                            {
                                headers: {
                                    'Accept': 'application/vnd.github.v3+json',
                                    'Authorization': `Bearer ${this.config.githubToken}`
                                }
                            }
                        );
                        
                        if (!response.ok) {
                            console.error(`Failed to fetch ${repoName}: ${response.status}`);
                            failedRepos.push(repoName);
                            continue;
                        }
                        
                        const data = await response.json();
                        repos.push(data);
                    } catch (err) {
                        console.error(`Error fetching ${repoName}:`, err);
                        failedRepos.push(repoName);
                    }
                }
                
                if (repos.length === 0) {
                    this.error = 'No repositories found. Please check your repository names and GitHub username.';
                } else {
                    this.repositories = repos;
                    
                    // Warn about failed repos
                    if (failedRepos.length > 0) {
                        console.warn('Failed to fetch:', failedRepos.join(', '));
                    }
                }
            } catch (err) {
                this.error = `Error fetching repositories: ${err.message}`;
                console.error('Repository fetch error:', err);
            } finally {
                this.loading = false;
            }
        },
        
        extractGitHubUsername(githubUrl) {
            // Handle both full URLs and just usernames
            if (githubUrl.includes('github.com/')) {
                const match = githubUrl.match(/github\.com\/([^\/]+)/);
                return match ? match[1] : null;
            }
            // If it's just a username, return it
            return githubUrl.replace(/\/$/, ''); // Remove trailing slash
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
                'JavaScript': 'javascript',
                'TypeScript': 'javascript'
            };
            return langMap[language] || '';
        },
        
        getSkillClass(skill) {
            // Map skills to color classes
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
            
            return ''; // Default styling
        }
    }
}).mount('#app');