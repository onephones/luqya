// Luqya Project - Main JavaScript File

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initThemeToggle();
    initSmoothScroll();
    initHeaderScroll();
    initMobileMenu();
    initTabs();
    initProcessTabs();
    initFaqAccordion();
    initScrollAnimation();
    initCounters();
    initRtlSupport();
    initBackToTop();
    
    // Initialize additional animations
    initStepAnimations();
    initBenefitsAnimations();
    initTestimonialSlider();
    
    // Dark Mode Toggle - Enhanced version
    const modeToggle = document.getElementById('mode-switch');
    const body = document.body;
    
    // Check system preference for dark mode
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Get user preference from localStorage or use system preference
    const currentMode = localStorage.getItem('mode') || (prefersDarkScheme.matches ? 'dark' : 'light');
    
    // Apply initial mode
    if (currentMode === 'dark') {
        body.classList.add('dark-mode');
        modeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#1A262F');
    } else {
        modeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#FFFFFF');
    }
    
    // Add transition class after initial load to enable smooth transitions
    setTimeout(() => {
        document.documentElement.classList.add('color-theme-in-transition');
    }, 100);
    
    // Toggle dark/light mode with enhanced animation
    modeToggle.addEventListener('click', function() {
        // Add transition class
        document.documentElement.classList.add('color-theme-in-transition');
        
        // Toggle dark mode class
        body.classList.toggle('dark-mode');
        
        // Update icon and store preference
        if (body.classList.contains('dark-mode')) {
            modeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('mode', 'dark');
            document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#1A262F');
        } else {
            modeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('mode', 'light');
            document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#FFFFFF');
        }
        
        // Remove transition class after animation completes
        setTimeout(() => {
            document.documentElement.classList.remove('color-theme-in-transition');
        }, 500);
    });
    
    // Listen for system dark mode preference changes
    prefersDarkScheme.addEventListener('change', (e) => {
        // Only apply if user hasn't set a preference
        if (!localStorage.getItem('mode')) {
            if (e.matches) {
                body.classList.add('dark-mode');
                modeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#1A262F');
            } else {
                body.classList.remove('dark-mode');
                modeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#FFFFFF');
            }
        }
    });
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            
            // Change icon based on menu state
            if (mainNav.classList.contains('active')) {
                mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
                mobileMenuBtn.setAttribute('aria-expanded', 'true');
            } else {
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mainNav && mainNav.classList.contains('active')) {
            // Check if the click is outside the mobile menu and not on the menu button
            if (!mainNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mainNav.classList.remove('active');
                document.body.classList.remove('menu-open');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        }
    });
    
    // Goals Tabs Functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show corresponding content
            const target = button.getAttribute('data-target');
            document.getElementById(target).classList.add('active');
        });
    });
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other open items
            faqItems.forEach(faqItem => {
                if (faqItem !== item && faqItem.classList.contains('active')) {
                    faqItem.classList.remove('active');
                }
            });
            
            // Toggle the clicked item
            item.classList.toggle('active');
        });
    });
    
    // Auto activate first FAQ item
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
    }
    
    // Header scroll effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for anchor links with improved offset calculation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (mainNav && mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
                
                // Calculate header height for proper offset
                const headerHeight = header.getBoundingClientRect().height;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - headerHeight - 20; // additional 20px for spacing
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animate numbers on scroll with improved animation
    const animateNumbers = () => {
        const statNumbers = document.querySelectorAll('.stat-number[data-count]');
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const suffix = target > 999 ? '+' : (stat.getAttribute('data-suffix') || '');
            
            // Adjust animation speed based on number size
            const duration = 2000; // 2 seconds total animation time
            const frameDuration = 1000 / 60; // 60fps
            const totalFrames = Math.round(duration / frameDuration);
            
            let currentFrame = 0;
            let currentCount = 0;
            
            // Use requestAnimationFrame for smoother animation
            const animate = () => {
                currentFrame++;
                
                // Easing function - ease out cubic
                const progress = currentFrame / totalFrames;
                const easingProgress = 1 - Math.pow(1 - progress, 3);
                
                currentCount = Math.floor(easingProgress * target);
                
                if (currentCount > target) currentCount = target;
                
                stat.textContent = currentCount + suffix;
                
                if (currentFrame < totalFrames) {
                    requestAnimationFrame(animate);
                }
            };
            
            requestAnimationFrame(animate);
        });
    };
    
    // Use IntersectionObserver to trigger animations when elements come into view
    const observeElements = () => {
        const sections = document.querySelectorAll('section');
        const impactSection = document.querySelector('.impact');
        let hasAnimatedNumbers = false;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add animation class to section
                    entry.target.classList.add('section-visible');
                    
                    // Animate numbers in impact section
                    if (entry.target === impactSection && !hasAnimatedNumbers) {
                        animateNumbers();
                        hasAnimatedNumbers = true;
                    }
                }
            });
        }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });
        
        sections.forEach(section => {
            observer.observe(section);
        });
    };
    
    observeElements();
    
    // Form submission handling
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically send the form data to a server
            // For now, we'll just show a success message
            const formData = new FormData(contactForm);
            const formValues = {};
            
            formData.forEach((value, key) => {
                formValues[key] = value;
            });
            
            console.log('Form submitted with values:', formValues);
            
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
            submitButton.disabled = true;
            
            // Simulate server request
            setTimeout(() => {
                // Reset form and show success message
                contactForm.reset();
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'form-success-message';
                successMessage.innerHTML = '<i class="fas fa-check-circle"></i> شكراً لتواصلك معنا! سنرد عليك في أقرب وقت ممكن.';
                contactForm.parentNode.appendChild(successMessage);
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.opacity = '0';
                    setTimeout(() => {
                        successMessage.remove();
                    }, 300);
                }, 5000);
            }, 1500);
        });
    }
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            // Here you would typically send the email to a server
            console.log('Newsletter subscription:', email);
            
            // Show success message
            emailInput.value = '';
            
            const successMessage = document.createElement('div');
            successMessage.className = 'newsletter-success';
            successMessage.textContent = 'تم الاشتراك بنجاح!';
            
            const parentElement = newsletterForm.parentNode;
            parentElement.appendChild(successMessage);
            
            // Remove success message after 3 seconds
            setTimeout(() => {
                successMessage.style.opacity = '0';
                setTimeout(() => {
                    successMessage.remove();
                }, 300);
            }, 3000);
        });
    }
    
    // Success Indicators Tabs
    initSuccessIndicatorsTabs();
    
    // Initialize responsive features
    initEnhancedMobileMenu();
    initResponsiveTabs();
    initResponsiveGrids();
    initMobileFixedElements();
});

// Theme Toggle (Light/Dark mode)
function initThemeToggle() {
    const toggleBtn = document.getElementById('mode-switch');
    const htmlElement = document.documentElement;
    const themeIcon = toggleBtn.querySelector('i');
    
    // Check for saved user preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        enableDarkMode();
    }
    
    toggleBtn.addEventListener('click', () => {
        if (htmlElement.classList.contains('dark-mode')) {
            disableDarkMode();
            localStorage.setItem('theme', 'light');
        } else {
            enableDarkMode();
            localStorage.setItem('theme', 'dark');
        }
    });
    
    // Check for system preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    prefersDarkScheme.addEventListener('change', (e) => {
        if (e.matches && !localStorage.getItem('theme')) {
            enableDarkMode();
        } else if (!e.matches && !localStorage.getItem('theme')) {
            disableDarkMode();
        }
    });
    
    function enableDarkMode() {
        htmlElement.classList.add('color-theme-in-transition');
        htmlElement.classList.add('dark-mode');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        setTimeout(() => {
            htmlElement.classList.remove('color-theme-in-transition');
        }, 300);
    }
    
    function disableDarkMode() {
        htmlElement.classList.add('color-theme-in-transition');
        htmlElement.classList.remove('dark-mode');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        setTimeout(() => {
            htmlElement.classList.remove('color-theme-in-transition');
        }, 300);
    }
}

// Smooth Scrolling for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                document.querySelector('.main-nav').classList.remove('active');
            }
        });
    });
}

// Header scroll effect
function initHeaderScroll() {
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    menuBtn.addEventListener('click', () => {
        mainNav.classList.toggle('active');
    });
}

// Tabs Functionality
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and content
            tabBtns.forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Add active class to clicked button and corresponding content
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });
}

// Process Tabs Functionality
function initProcessTabs() {
    const processTabs = document.querySelectorAll('.process-tab');
    
    processTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and panels
            processTabs.forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.process-panel').forEach(panel => {
                panel.classList.remove('active');
            });
            
            // Add active class to clicked tab and corresponding panel
            tab.classList.add('active');
            const targetId = tab.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
            
            // Reset animation for steps
            const steps = document.querySelectorAll(`#${targetId} .step`);
            steps.forEach((step, index) => {
                step.style.animationDelay = `${0.1 * (index + 1)}s`;
                step.classList.remove('animate__animated', 'animate__fadeInUp');
                void step.offsetWidth; // Trigger reflow
                step.classList.add('animate__animated', 'animate__fadeInUp');
            });
        });
    });
}

// Enhanced animation for process steps
function initStepAnimations() {
    const steps = document.querySelectorAll('.step');
    
    steps.forEach((step, index) => {
        // Initially hide all steps
        step.style.opacity = "0";
        step.style.transform = "translateY(20px)";
        
        // Create intersection observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add delay based on step index
                    setTimeout(() => {
                        step.style.transition = "opacity 0.5s ease, transform 0.5s ease";
                        step.style.opacity = "1";
                        step.style.transform = "translateY(0)";
                    }, index * 100);
                    
                    // Unobserve after animation
                    observer.unobserve(step);
                }
            });
        }, { threshold: 0.1 });
        
        // Observe each step
        observer.observe(step);
    });
    
    // Add hover effects
    steps.forEach(step => {
        step.addEventListener('mouseenter', () => {
            const icon = step.querySelector('.step-icon');
            if (icon) {
                icon.style.transform = "scale(1.1)";
            }
        });
        
        step.addEventListener('mouseleave', () => {
            const icon = step.querySelector('.step-icon');
            if (icon) {
                icon.style.transform = "scale(1)";
            }
        });
    });
}

// Benefits section animations
function initBenefitsAnimations() {
    // Animate benefit cards on scroll
    const benefitCards = document.querySelectorAll('.benefit-card');
    const impactStats = document.querySelectorAll('.impact-stat');
    const principles = document.querySelectorAll('.principle');
    
    const animateOnScroll = (elements, delay = 100) => {
        elements.forEach((element, index) => {
            // Initially hide elements
            element.style.opacity = "0";
            element.style.transform = "translateY(20px)";
            
            // Create intersection observer
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Add delay based on element index
                        setTimeout(() => {
                            element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
                            element.style.opacity = "1";
                            element.style.transform = "translateY(0)";
                        }, index * delay);
                        
                        // Unobserve after animation
                        observer.unobserve(element);
                    }
                });
            }, { threshold: 0.1 });
            
            // Observe each element
            observer.observe(element);
        });
    };
    
    // Apply animations
    animateOnScroll(benefitCards);
    animateOnScroll(impactStats, 200);
    animateOnScroll(principles, 150);
    
    // Animate benefit elements in a circle
    const benefitElements = document.querySelectorAll('.benefit-element');
    
    benefitElements.forEach((element, index) => {
        // Set animation with different delays
        element.style.animation = `float-element 4s infinite ease-in-out ${index * 0.7}s`;
    });
    
    // Animate impact numbers with counting effect
    const impactValues = document.querySelectorAll('.impact-value');
    
    impactValues.forEach(value => {
        const startNumber = 0;
        const endNumber = parseInt(value.getAttribute('data-count'));
        const formatWithPlus = value.textContent.includes('+');
        const formatWithM = value.textContent.includes('M');
        const formatWithK = value.textContent.includes('K');
        
        // Create intersection observer for each impact value
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let currentNumber = startNumber;
                    const duration = 2000; // 2 seconds
                    const stepTime = Math.abs(Math.floor(duration / (endNumber - startNumber)));
                    
                    // Don't start immediately
                    setTimeout(() => {
                        const timer = setInterval(() => {
                            currentNumber += 1;
                            
                            // Format the output
                            if (formatWithPlus) {
                                value.textContent = currentNumber + '+';
                            } else if (formatWithM) {
                                value.textContent = currentNumber + 'M+';
                            } else if (formatWithK) {
                                value.textContent = currentNumber + 'K+';
                            } else {
                                value.textContent = currentNumber;
                            }
                            
                            if (currentNumber >= endNumber) {
                                clearInterval(timer);
                            }
                        }, stepTime);
                    }, 500);
                    
                    // Unobserve after triggering
                    observer.unobserve(value);
                }
            });
        }, { threshold: 0.5 });
        
        // Observe each impact value
        observer.observe(value);
    });
}

// Testimonial slider
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial');
    if (testimonials.length <= 1) return;
    
    let currentIndex = 0;
    
    // Hide all testimonials except the first one
    testimonials.forEach((testimonial, index) => {
        if (index !== 0) {
            testimonial.style.display = 'none';
        }
    });
    
    // Create navigation buttons
    const testimonialContainer = document.querySelector('.testimonials-container');
    const navButtons = document.createElement('div');
    navButtons.className = 'testimonial-nav';
    navButtons.innerHTML = `
        <button class="testimonial-prev"><i class="fas fa-chevron-right"></i></button>
        <div class="testimonial-dots"></div>
        <button class="testimonial-next"><i class="fas fa-chevron-left"></i></button>
    `;
    
    // Create dots
    const dotsContainer = navButtons.querySelector('.testimonial-dots');
    testimonials.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.className = index === 0 ? 'dot active' : 'dot';
        dot.setAttribute('data-index', index);
        dotsContainer.appendChild(dot);
        
        // Add click event to dots
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });
    
    // Add navigation to the DOM
    if (testimonialContainer.parentNode) {
        testimonialContainer.parentNode.appendChild(navButtons);
    }
    
    // Add click events to buttons
    const prevButton = navButtons.querySelector('.testimonial-prev');
    const nextButton = navButtons.querySelector('.testimonial-next');
    
    prevButton.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
    });
    
    nextButton.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
    });
    
    // Function to navigate to a specific slide
    function goToSlide(index) {
        // Handle wrapping around the ends
        if (index < 0) {
            index = testimonials.length - 1;
        } else if (index >= testimonials.length) {
            index = 0;
        }
        
        // Hide current testimonial
        testimonials[currentIndex].style.display = 'none';
        
        // Update dots
        const dots = dotsContainer.querySelectorAll('.dot');
        dots[currentIndex].classList.remove('active');
        dots[index].classList.add('active');
        
        // Show new testimonial
        testimonials[index].style.display = 'block';
        
        // Update current index
        currentIndex = index;
    }
    
    // Auto-rotate testimonials every 5 seconds
    setInterval(() => {
        goToSlide(currentIndex + 1);
    }, 5000);
}

// FAQ Accordion
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    otherAnswer.style.maxHeight = 0;
                }
            });
            
            // Toggle current FAQ item
            item.classList.toggle('active');
            const answer = item.querySelector('.faq-answer');
            
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = 0;
            }
        });
    });
}

// Scroll Animation for sections
function initScrollAnimation() {
    const animatedElements = document.querySelectorAll('.feature, .value-card, .vision-card, .platform-feature, .benefit-card, .impact-stat, .principle, .testimonial');
    const statsContainers = document.querySelectorAll('.hero-stats, .impact-stats');
    
    // Initial check on page load
    animateElements();
    statsContainers.forEach(container => {
        if (isElementInViewport(container)) {
            animateCounters(container);
        }
    });
    
    // Check on scroll
    window.addEventListener('scroll', () => {
        animateElements();
        statsContainers.forEach(container => {
            if (isElementInViewport(container) && !container.classList.contains('counted')) {
                container.classList.add('counted');
                animateCounters(container);
            }
        });
    });
    
    function animateElements() {
        animatedElements.forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('animate');
            }
        });
    }
}

// Counter Animation
function initCounters() {
    // Initialize all stat values with their starting values
    document.querySelectorAll('.stat-value, .impact-value').forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const formatWithPlus = counter.textContent.includes('+');
        const formatWithM = counter.textContent.includes('M');
        const formatWithK = counter.textContent.includes('K');
        
        if (formatWithPlus) {
            counter.textContent = '0+';
        } else if (formatWithM) {
            counter.textContent = '0M+';
        } else if (formatWithK) {
            counter.textContent = '0K+';
        } else {
            counter.textContent = '0';
        }
        counter.setAttribute('data-target', target);
    });
}

function animateCounters(container) {
    const counters = container.querySelectorAll('.stat-value, .impact-value');
    const speed = 200; // The lower the faster
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const formatWithPlus = counter.textContent.includes('+');
        const formatWithM = counter.textContent.includes('M');
        const formatWithK = counter.textContent.includes('K');
        
        const updateCounter = () => {
            const count = +counter.textContent.replace(/\D/g, '');
            const increment = Math.ceil(target / speed);
            
            if (count < target) {
                let newValue = count + increment;
                if (newValue > target) newValue = target;
                
                if (formatWithPlus) {
                    counter.textContent = `${newValue}+`;
                } else if (formatWithM) {
                    counter.textContent = `${newValue}M+`;
                } else if (formatWithK) {
                    counter.textContent = `${newValue}K+`;
                } else {
                    counter.textContent = newValue;
                }
                
                setTimeout(updateCounter, 25);
            }
        };
        
        updateCounter();
    });
}

// Helper function to check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0 &&
        rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
        rect.right >= 0
    );
}

// Success Indicators Tabs
function initSuccessIndicatorsTabs() {
    const indicatorsTabBtns = document.querySelectorAll('.indicators-tabs .tab-btn');
    const indicatorsTabContents = document.querySelectorAll('.indicators-tabs .tab-content');
    
    indicatorsTabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            
            // Remove active class from all buttons and content
            indicatorsTabBtns.forEach(btn => btn.classList.remove('active'));
            indicatorsTabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to current button and content
            this.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });
}

// Enhanced Mobile Menu
function initEnhancedMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    const body = document.body;
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            body.classList.toggle('menu-open');
            
            // Toggle aria attributes for accessibility
            const expanded = mainNav.classList.contains('active');
            mobileMenuBtn.setAttribute('aria-expanded', expanded);
            
            // Toggle menu icon
            const menuIcon = mobileMenuBtn.querySelector('i');
            if (menuIcon) {
                if (expanded) {
                    menuIcon.classList.remove('fa-bars');
                    menuIcon.classList.add('fa-times');
                } else {
                    menuIcon.classList.remove('fa-times');
                    menuIcon.classList.add('fa-bars');
                }
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mainNav.classList.remove('active');
                body.classList.remove('menu-open');
                
                if (mobileMenuBtn) {
                    mobileMenuBtn.setAttribute('aria-expanded', false);
                    const menuIcon = mobileMenuBtn.querySelector('i');
                    if (menuIcon) {
                        menuIcon.classList.remove('fa-times');
                        menuIcon.classList.add('fa-bars');
                    }
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mainNav.contains(event.target) && !mobileMenuBtn.contains(event.target) && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                body.classList.remove('menu-open');
                
                if (mobileMenuBtn) {
                    mobileMenuBtn.setAttribute('aria-expanded', false);
                    const menuIcon = mobileMenuBtn.querySelector('i');
                    if (menuIcon) {
                        menuIcon.classList.remove('fa-times');
                        menuIcon.classList.add('fa-bars');
                    }
                }
            }
        });
    }
}

// Handle tabs better on mobile
function initResponsiveTabs() {
    const tabsNavs = document.querySelectorAll('.tabs-nav');
    
    tabsNavs.forEach(tabsNav => {
        const tabBtns = tabsNav.querySelectorAll('.tab-btn');
        
        // Scroll active tab into view on mobile
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    // Give it a slight delay to ensure the active class is applied
                    setTimeout(() => {
                        this.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                    }, 100);
                }
            });
        });
    });
}

// Fix for features grid on mobile
function initResponsiveGrids() {
    const updateGrids = () => {
        const featuresGrids = document.querySelectorAll('.features-grid, .indicators-grid');
        
        featuresGrids.forEach(grid => {
            if (window.innerWidth <= 576) {
                if (grid.dataset.originalDisplay) return; // Already processed
                
                grid.dataset.originalDisplay = grid.style.display || 'grid';
                grid.style.display = 'flex';
                grid.style.flexDirection = 'column';
            } else {
                if (!grid.dataset.originalDisplay) return; // Wasn't processed
                
                grid.style.display = grid.dataset.originalDisplay;
                delete grid.dataset.originalDisplay;
            }
        });
    };
    
    // Initial call
    updateGrids();
    
    // Update on resize
    window.addEventListener('resize', debounce(updateGrids, 250));
}

// Better handling of fixed elements on mobile
function initMobileFixedElements() {
    const header = document.querySelector('header');
    const updateHeaderOnScroll = () => {
        if (window.scrollY > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    // Initial call
    updateHeaderOnScroll();
    
    // Update on scroll
    window.addEventListener('scroll', debounce(updateHeaderOnScroll, 10));
}

// Debounce function to limit the rate at which a function can fire
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}

// Add RTL support
function initRtlSupport() {
    // Check if the document is in RTL mode
    const isRtl = document.documentElement.dir === 'rtl' || document.body.dir === 'rtl';
    
    if (isRtl) {
        // Adjust sliders for RTL
        const sliders = document.querySelectorAll('.testimonial-slider');
        sliders.forEach(slider => {
            slider.setAttribute('dir', 'rtl');
        });
        
        // Reverse direction of some animations
        document.querySelectorAll('.animate__fadeInRight').forEach(el => {
            el.classList.remove('animate__fadeInRight');
            el.classList.add('animate__fadeInLeft');
        });
        
        document.querySelectorAll('.animate__fadeInLeft').forEach(el => {
            el.classList.remove('animate__fadeInLeft');
            el.classList.add('animate__fadeInRight');
        });
        
        // Fix icon directions
        document.querySelectorAll('.fa-arrow-right').forEach(icon => {
            icon.classList.remove('fa-arrow-right');
            icon.classList.add('fa-arrow-left');
        });
        
        document.querySelectorAll('.fa-arrow-left').forEach(icon => {
            icon.classList.remove('fa-arrow-left');
            icon.classList.add('fa-arrow-right');
        });
        
        // Add RTL class to body for additional styling
        document.body.classList.add('rtl-active');
    }
}

// Add back to top button functionality
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            // Show button when page is scrolled down 300px or more
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        // Scroll to top when button is clicked
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
} 