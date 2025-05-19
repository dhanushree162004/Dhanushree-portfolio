document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const navMenu = document.getElementById('nav-menu');
    const navToggler = document.getElementById('nav-toggler');
        const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const navbar = document.getElementById('navbar');
const backToTopButton = document.getElementById('back-to-top');

    // --- Theme Toggler ---
    // ... (existing theme toggler code) ...
    const currentTheme = localStorage.getItem('theme');
    const themeIcon = themeToggleBtn.querySelector('i');

    if (currentTheme) {
        body.classList.add(currentTheme);
        if (currentTheme === 'dark-theme') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    } else { // Default to light if no preference or if preference is light
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }

    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        let theme = 'light-theme';
        if (body.classList.contains('dark-theme')) {
            theme = 'dark-theme';
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
        localStorage.setItem('theme', theme);
        // Re-initialize particles with potentially new colors if needed, or use adaptive colors in config
        loadParticles();
    });


    // --- Mobile Navigation Toggle ---
    // ... (existing mobile nav code) ...
    navToggler.addEventListener('click', () => {
        navMenu.classList.toggle('nav-active');
        const icon = navToggler.querySelector('i');
        if (navMenu.classList.contains('nav-active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('nav-active')) {
                navMenu.classList.remove('nav-active');
                navToggler.querySelector('i').classList.remove('fa-times');
                navToggler.querySelector('i').classList.add('fa-bars');
            }
        });
    });

    // --- Active Link Highlighting on Scroll ---
    // ... (existing active link code) ...
    function highlightActiveLink() {
        let currentSectionId = '';
        const navbarHeight = navbar.offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 50;
            if (window.scrollY >= sectionTop) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        if (window.scrollY < sections[0].offsetTop - navbarHeight - 50) {
             currentSectionId = "home";
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', highlightActiveLink);
    

    // --- Back to Top Button ---
    // ... (existing back to top code) ...
        window.addEventListener('scroll', () => {
if (window.scrollY > 300) {
backToTopButton.classList.add('active');
} else {
backToTopButton.classList.remove('active');
}
});

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });


    // --- Footer Current Year ---
    // ... (existing footer year code) ...
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // --- Navbar Scroll Effect ---
    // ... (existing navbar scroll code) ...
        window.addEventListener('scroll', () => {
if (window.scrollY > 50) {
navbar.classList.add('scrolled');
} else {
navbar.classList.remove('scrolled');
}
});

    // --- tsParticles Initialization ---
    function getParticleColors() {
        const isDarkMode = body.classList.contains('dark-theme');
        // Using getComputedStyle to fetch CSS variable values
        const styles = getComputedStyle(document.documentElement);
        const primaryColor = styles.getPropertyValue('--primary-color').trim();
        const textColor = styles.getPropertyValue('--text-color').trim();
        
        return {
            particleColor: isDarkMode ? "#777" : "#bbb", // Lighter for dark, darker for light
            linkColor: isDarkMode ? primaryColor : primaryColor // Or a more neutral like "#999"
        };
    }

    async function loadParticles() {
        const colors = getParticleColors();

        if (window.tsParticles && typeof window.tsParticles.load === 'function') {
             // Destroy existing instance if it exists, to prevent multiple instances
            const existingContainer = tsParticles.domItem(0); // Or pass the specific container ID
            if (existingContainer) {
                existingContainer.destroy();
            }

            await tsParticles.load({
                id: "tsparticles-hero", // The ID of the div you added
                options: {
                    autoPlay: true,
                    background: {
                        // color: { value: "transparent" } // Make background transparent so CSS bg shows
                    },
                    fpsLimit: 60,
                    interactivity: {
                        events: {
                            onClick: {
                                enable: true,
                                mode: "push", // Adds particles on click
                            },
                            onHover: {
                                enable: true,
                                mode: "grab", // Creates links on hover
                            },
                        },
                        modes: {
                            push: {
                                quantity: 4,
                            },
                            repulse: {
                                distance: 150,
                                duration: 0.4,
                            },
                            grab: {
                                distance: 200,
                                links: {
                                    opacity: 0.5
                                }
                            }
                        },
                    },
                    particles: {
                        color: {
                            value: colors.particleColor,
                        },
                        links: {
                            color: colors.linkColor,
                            distance: 150,
                            enable: true,
                            opacity: 0.4,
                            width: 1,
                        },
                        collisions: {
                            enable: false, // True if you want them to bounce off each other
                        },
                        move: {
                            direction: "none",
                            enable: true,
                            outModes: {
                                default: "bounce", // How particles behave when they reach the edge
                            },
                            random: false,
                            speed: 2, // Movement speed
                            straight: false,
                        },
                        number: {
                            density: {
                                enable: true,
                                area: 800, // Lower value means more particles
                            },
                            value: 80, // Number of particles
                        },
                        opacity: {
                            value: 0.5,
                        },
                        shape: {
                            type: "circle",
                        },
                        size: {
                            value: { min: 1, max: 3 }, // Particles will have random sizes between 1 and 3
                        },
                    },
                    detectRetina: true, // Better rendering on high-density screens
                    // Responsive settings (optional, the density setting already helps)
                    // responsive: [
                    //     {
                    //         breakpoint: 768, // Below 768px
                    //         options: {
                    //             particles: {
                    //                 number: {
                    //                     value: 50,
                    //                     density: { area: 600 }
                    //                 },
                    //                 links: { distance: 120 }
                    //             }
                    //         }
                    //     },
                    //     {
                    //         breakpoint: 480, // Below 480px
                    //         options: {
                    //             particles: {
                    //                 number: {
                    //                     value: 30,
                    //                     density: { area: 400 }
                    //                 },
                    //                 links: { distance: 100 }
                    //             }
                    //         }
                    //     }
                    // ]
                },
            });
        } else {
            console.error("tsParticles library not loaded.");
        }
    }

    loadParticles(); // Load particles on initial page load
    highlightActiveLink(); // Call on load for active link
});