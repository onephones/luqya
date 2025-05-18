// Main JavaScript File for Luqya Project

document.addEventListener('DOMContentLoaded', function() {
    // Initialize dark/light mode
    initThemeToggle();
    
    // Smooth scrolling for navigation
    initSmoothScroll();
    
    // Add scroll event for header shrinking
    initHeaderScroll();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize tabs system
    initTabs();
    
    // Initialize process tabs
    initProcessTabs();
    
    // Initialize animation on scroll
    initScrollAnimation();
    
    // Initialize counter animation
    initCounters();
});

// Initialize dark/light mode toggle
function initThemeToggle() {
    const modeToggle = document.getElementById('mode-switch');
    const htmlEl = document.documentElement;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        enableDarkMode();
    }
    
    modeToggle.addEventListener('click', function() {
        // Add transition class for smooth transition
        htmlEl.classList.add('color-theme-in-transition');
        
        if (htmlEl.classList.contains('dark-mode')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
        
        // Remove transition class after transition completes
        setTimeout(function() {
            htmlEl.classList.remove('color-theme-in-transition');
        }, 1000);
    });
    
    function enableDarkMode() {
        htmlEl.classList.add('dark-mode');
        modeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
    }
    
    function disableDarkMode() {
        htmlEl.classList.remove('dark-mode');
        modeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light');
    }
}

// Initialize smooth scrolling for navigation links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                document.querySelector('.main-nav').classList.remove('active');
                
                // Scroll to target
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize header scroll effect
function initHeaderScroll() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Initialize mobile menu
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.main-nav');
    
    menuBtn.addEventListener('click', function() {
        nav.classList.toggle('active');
    });
}

// Initialize tabs system
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const tabContent = document.getElementById(targetId);
            
            // Remove active class from all buttons and content
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Add active class to clicked button and its content
            this.classList.add('active');
            tabContent.classList.add('active');
        });
    });
}

// Initialize process tabs
function initProcessTabs() {
    const processTabs = document.querySelectorAll('.process-tab');
    
    processTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const tabContent = document.getElementById(targetId);
            
            // Remove active class from all tabs and panels
            document.querySelectorAll('.process-tab').forEach(t => {
                t.classList.remove('active');
            });
            
            document.querySelectorAll('.process-panel').forEach(panel => {
                panel.classList.remove('active');
            });
            
            // Add active class to clicked tab and its panel
            this.classList.add('active');
            tabContent.classList.add('active');
        });
    });
}

// Initialize scroll animation
function initScrollAnimation() {
    const sections = document.querySelectorAll('section');
    
    // Options for the Intersection Observer
    const options = {
        root: null, // viewport
        threshold: 0.1, // 10% of the item must be visible
        rootMargin: "-100px 0px" // offset from the viewport
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                
                // If the section has counters, animate them
                if (entry.target.querySelectorAll('.stat-value, .impact-value').length > 0) {
                    animateCounters(entry.target);
                }
                
                // Unobserve the section after it's been animated
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    // Observe each section
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Initialize counter animation
function initCounters() {
    // Add a scroll event listener to check for visible counters
    window.addEventListener('scroll', function() {
        const counterSections = document.querySelectorAll('.hero-stats, .impact-stats');
        
        counterSections.forEach(section => {
            if (isElementInViewport(section) && !section.classList.contains('counted')) {
                section.classList.add('counted');
                animateCounters(section);
            }
        });
    });
    
    // Initially check if any counters are in viewport
    const counterSections = document.querySelectorAll('.hero-stats, .impact-stats');
    counterSections.forEach(section => {
        if (isElementInViewport(section) && !section.classList.contains('counted')) {
            section.classList.add('counted');
            animateCounters(section);
        }
    });
}

// Helper function to animate counters
function animateCounters(container) {
    const counters = container.querySelectorAll('.stat-value, .impact-value');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // Animation duration in ms
        const steps = 60; // Animation steps
        const stepValue = target / steps;
        let current = 0;
        let step = 0;
        
        const updateCounter = () => {
            current += stepValue;
            step++;
            
            if (step <= steps) {
                counter.textContent = Math.round(current).toLocaleString() + (counter.textContent.includes('+') ? '+' : '');
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString() + (counter.textContent.includes('+') ? '+' : '');
            }
        };
        
        requestAnimationFrame(updateCounter);
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

// FAQ Accordion
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}); 