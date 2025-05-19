document.addEventListener('DOMContentLoaded', function() {
    // --- Theme Toggle ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');

    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.remove('light-theme', 'dark-theme');
        body.classList.add(savedTheme);
        if (savedTheme === 'dark-theme') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    } else { // Default to light theme if nothing saved
        body.classList.add('light-theme');
        themeIcon.classList.add('fa-moon');
    }


    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('light-theme')) {
            body.classList.replace('light-theme', 'dark-theme');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark-theme');
        } else {
            body.classList.replace('dark-theme', 'light-theme');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light-theme');
        }
    });

    // --- Mobile Navigation Toggle ---
    const navToggler = document.getElementById('nav-toggler');
    const navMenuMobile = document.getElementById('nav-menu-mobile');
    const navTogglerIcon = navToggler.querySelector('i');

    if (navToggler && navMenuMobile) {
        navToggler.addEventListener('click', () => {
            navMenuMobile.classList.toggle('hidden');
            const isExpanded = navMenuMobile.classList.contains('hidden') ? 'false' : 'true';
            navToggler.setAttribute('aria-expanded', isExpanded);
            if (isExpanded === 'true') {
                navTogglerIcon.classList.replace('fa-bars', 'fa-times');
            } else {
                navTogglerIcon.classList.replace('fa-times', 'fa-bars');
            }
        });
    }
    
    // --- Smooth Scroll & Active Link Highlighting ---
    const navbar = document.getElementById('navbar');
    const navbarHeight = navbar ? navbar.offsetHeight : 70; // Fallback height
    const allNavLinks = document.querySelectorAll('.nav-link'); // For desktop and mobile

    allNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - navbarHeight - 20; // Extra 20px padding

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Close mobile nav if open and it's a mobile link click
                    if (navMenuMobile && !navMenuMobile.classList.contains('hidden')) {
                        navMenuMobile.classList.add('hidden');
                        navToggler.setAttribute('aria-expanded', 'false');
                        navTogglerIcon.classList.replace('fa-times', 'fa-bars');
                    }
                }
            }
        });
    });
    
    // Active link highlighting on scroll
    const sections = document.querySelectorAll('section.section'); // Ensure your sections have class 'section'
    function changeLinkState() {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - navbarHeight - 25) { // Adjusted offset
                currentSectionId = section.getAttribute('id');
            }
        });

        allNavLinks.forEach(link => {
            link.classList.remove('active'); // 'active' class defined in CSS
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
        // Ensure home is active if at the very top
        if (window.pageYOffset < sections[0].offsetTop - navbarHeight - 25) {
             allNavLinks.forEach(link => link.classList.remove('active'));
             document.querySelector('.nav-link[href="#home"]')?.classList.add('active');
        }
    }
    if (sections.length > 0) {
        window.addEventListener('scroll', changeLinkState);
        changeLinkState(); // Initial call
    }


    // --- Update current year in footer ---
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Back to Top Button ---
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.remove('hidden', 'opacity-0');
                backToTopButton.classList.add('opacity-100');
            } else {
                backToTopButton.classList.remove('opacity-100');
                backToTopButton.classList.add('opacity-0');
                setTimeout(() => { // Ensure it's hidden after transition
                    if (window.pageYOffset <= 300) backToTopButton.classList.add('hidden');
                }, 300);
            }
        });
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- tsParticles Initialization ---
    const heroParticlesElement = document.getElementById('tsparticles-hero');
    if (typeof tsParticles !== 'undefined' && heroParticlesElement) {
        tsParticles.load("tsparticles-hero", {
            fpsLimit: 60,
            interactivity: {
                events: {
                    onHover: { enable: true, mode: "grab" },
                    onClick: { enable: true, mode: "push" }
                },
                modes: {
                    grab: { distance: 140, links: { opacity: 0.7 } },
                    push: { quantity: 3 }
                }
            },
            particles: {
                color: { value: "#ffffff" },
                links: {
                    color: "#ffffff",
                    distance: 150,
                    enable: true,
                    opacity: 0.25, // Subtle links
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1.5, // Slower, more elegant movement
                    direction: "none",
                    random: true,
                    straight: false,
                    outModes: "out"
                },
                number: {
                    density: { enable: true, area: 800 },
                    value: 50 // Fewer particles for a cleaner look
                },
                opacity: {
                    value: {min: 0.1, max: 0.5} // Random opacity for depth
                },
                shape: { type: "circle" },
                size: {
                    value: { min: 1, max: 3 } // Small, consistent particle size
                }
            },
            detectRetina: true,
            background: {
                // color: "transparent" // Ensure it doesn't override section background
            }
        }).then(container => {
            // console.log("tsparticles container loaded for hero");
        }).catch(error => {
            console.error("tsparticles hero loading error:", error);
        });
    }

    // --- Contact Form Submission (AJAX for Formspree) ---
    const contactForm = document.getElementById('contactForm');
    const formStatusDiv = document.getElementById('form-status'); // Optional: for displaying messages outside alerts

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent the default form submission

            const formData = new FormData(contactForm);
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML; // Save original button content

            // Change button text to indicate processing
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="spinner-border" role="status" aria-hidden="true"></span> Sending...';
            
            if(formStatusDiv) formStatusDiv.innerHTML = ''; // Clear previous status

            fetch(contactForm.action, { // Use form's action attribute for the URL
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json' // Important for Formspree to return JSON
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                // If response not OK, try to parse error or throw generic error
                return response.json().then(errorData => {
                    throw new Error(errorData.error || 'Something went wrong. Please try again.');
                });
            })
            .then(data => {
                if (data.ok) {
                    if(formStatusDiv) {
                        formStatusDiv.textContent = "Message sent successfully! Thank you for reaching out.";
                        formStatusDiv.className = 'success text-green-600 dark:text-green-400';
                    } else {
                        alert("Message sent successfully! Thank you for reaching out.");
                    }
                    contactForm.reset(); // Clear the form fields
                } else {
                    throw new Error(data.error || 'Failed to send message. Please try again.');
                }
            })
            .catch(error => {
                console.error("Form submission error:", error);
                if(formStatusDiv) {
                    formStatusDiv.textContent = `Error: ${error.message}`;
                    formStatusDiv.className = 'error text-red-600 dark:text-red-400';
                } else {
                    alert(`Error: ${error.message}`);
                }
            })
            .finally(() => {
                // Restore button text and enable it
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText; // Restore original content
            });
        });
    }
});