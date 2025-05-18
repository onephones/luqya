/*!
 * Advanced Animations for Luqya Platform
 * Using GSAP (GreenSock Animation Platform)
 */

// Initialize GSAP animations after DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Make sure GSAP is loaded
    if (typeof gsap === 'undefined') {
        // Load GSAP from CDN
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js';
        script.onload = initAnimations;
        document.head.appendChild(script);
    } else {
        initAnimations();
    }
});

function initAnimations() {
    // Register ScrollTrigger plugin if available
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    } else {
        // Load ScrollTrigger plugin
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/ScrollTrigger.min.js';
        script.onload = () => {
            gsap.registerPlugin(ScrollTrigger);
            initScrollBasedAnimations();
        };
        document.head.appendChild(script);
        
        // Continue with non-scroll animations
        initBasicAnimations();
        return;
    }
    
    // Initialize all animations
    initBasicAnimations();
    initScrollBasedAnimations();
}

function initBasicAnimations() {
    // Animate hero section
    animateHeroSection();
    
    // Animated numbers counter effect using GSAP
    initNumberCounters();
    
    // Header link hover effects
    initHeaderHoverEffects();
    
    // Button hover effects
    initButtonEffects();
    
    // Add parallax to background elements
    initParallaxEffects();
}

function animateHeroSection() {
    const heroTitle = document.querySelector('.hero-title');
    const heroText = document.querySelector('.hero-text');
    const heroBtn = document.querySelector('.hero-btn');
    const heroStats = document.querySelector('.hero-stats');
    
    if (heroTitle && heroText && heroBtn) {
        const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        
        heroTl.from(heroTitle, { 
            y: 50, 
            opacity: 0, 
            duration: 0.8,
            clearProps: 'all'
        })
        .from(heroText, { 
            y: 30, 
            opacity: 0, 
            duration: 0.8,
            clearProps: 'all' 
        }, '-=0.5')
        .from(heroBtn, { 
            y: 20, 
            opacity: 0, 
            scale: 0.9,
            duration: 0.5,
            clearProps: 'all' 
        }, '-=0.5');
        
        if (heroStats) {
            heroTl.from(heroStats.children, { 
                y: 30, 
                opacity: 0, 
                stagger: 0.1,
                duration: 0.6,
                clearProps: 'all' 
            }, '-=0.3');
        }
    }
}

function initNumberCounters() {
    // Get all counter elements
    const counters = document.querySelectorAll('.stat-value, .impact-value');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const prefix = counter.getAttribute('data-prefix') || '';
        const suffix = counter.getAttribute('data-suffix') || '';
        
        // Create a ScrollTrigger for each counter
        ScrollTrigger.create({
            trigger: counter,
            start: 'top 80%',
            onEnter: () => {
                // Animate counter
                gsap.to(counter, {
                    duration: 2,
                    ease: 'power2.out',
                    innerText: target,
                    snap: { innerText: 1 },
                    modifiers: {
                        innerText: value => `${prefix}${Math.floor(value)}${suffix}`
                    }
                });
            },
            once: true
        });
    });
}

function initHeaderHoverEffects() {
    // Get header navigation links
    const navLinks = document.querySelectorAll('header .nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            gsap.to(link, {
                duration: 0.3,
                y: -3,
                ease: 'power2.out'
            });
        });
        
        link.addEventListener('mouseleave', () => {
            gsap.to(link, {
                duration: 0.3,
                y: 0,
                ease: 'power2.in'
            });
        });
        
        // Create hover effect with pseudo-element
        if (!link.querySelector('.nav-hover-effect')) {
            const effect = document.createElement('span');
            effect.className = 'nav-hover-effect';
            link.appendChild(effect);
            
            link.addEventListener('mouseenter', () => {
                gsap.fromTo(effect, 
                    { width: '0%', left: '50%' },
                    { width: '100%', left: '0%', duration: 0.3, ease: 'power2.out' }
                );
            });
            
            link.addEventListener('mouseleave', () => {
                gsap.to(effect, {
                    width: '0%',
                    left: '50%',
                    duration: 0.3,
                    ease: 'power2.in'
                });
            });
        }
    });
}

function initButtonEffects() {
    // Get all buttons
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            gsap.to(btn, {
                duration: 0.3,
                y: -5,
                scale: 1.05,
                ease: 'back.out(1.7)'
            });
        });
        
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                duration: 0.3,
                y: 0,
                scale: 1,
                ease: 'back.out(1.7)'
            });
        });
    });
}

function initParallaxEffects() {
    // Get elements for parallax effect
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-speed') || 0.1;
        
        window.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth / 2 - e.pageX) * speed;
            const y = (window.innerHeight / 2 - e.pageY) * speed;
            
            gsap.to(element, {
                duration: 1,
                x: x,
                y: y,
                ease: 'power1.out'
            });
        });
    });
}

function initScrollBasedAnimations() {
    // Stagger animation for sections
    initSectionAnimations();
    
    // Process steps animations
    initProcessStepsAnimations();
    
    // Benefit cards and impact stats animations
    initBenefitAnimations();
    
    // Platform features animations
    initFeatureAnimations();
    
    // Testimonial animations
    initTestimonialAnimations();
    
    // FAQ animations
    initFaqAnimations();
}

function initSectionAnimations() {
    // Animate section titles and descriptions on scroll
    document.querySelectorAll('section').forEach(section => {
        const sectionTitle = section.querySelector('h2');
        const sectionDesc = section.querySelector('p.section-desc');
        
        if (sectionTitle) {
            gsap.from(sectionTitle, {
                scrollTrigger: {
                    trigger: sectionTitle,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                clearProps: 'all'
            });
        }
        
        if (sectionDesc) {
            gsap.from(sectionDesc, {
                scrollTrigger: {
                    trigger: sectionDesc,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                delay: 0.2,
                ease: 'power3.out',
                clearProps: 'all'
            });
        }
    });
}

function initProcessStepsAnimations() {
    // Get process tabs
    const processTabs = document.querySelectorAll('.process-tab');
    
    if (processTabs.length) {
        // Add click effect to process tabs
        processTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                gsap.fromTo(
                    this, 
                    { scale: 0.95 }, 
                    { scale: 1, duration: 0.4, ease: 'back.out(1.7)' }
                );
            });
        });
    }
    
    // Animate steps timeline using ScrollTrigger
    document.querySelectorAll('.steps-container').forEach(container => {
        const steps = container.querySelectorAll('.step');
        
        if (steps.length) {
            gsap.set(steps, { opacity: 0, y: 30 });
            
            ScrollTrigger.create({
                trigger: container,
                start: 'top 70%',
                onEnter: () => {
                    gsap.to(steps, {
                        opacity: 1,
                        y: 0,
                        stagger: 0.2,
                        duration: 0.8,
                        ease: 'power3.out',
                        clearProps: 'transform'
                    });
                },
                once: true
            });
        }
    });
    
    // Add subtle animation to step icons
    document.querySelectorAll('.step-icon').forEach(icon => {
        gsap.to(icon, {
            y: '-10px',
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    });
}

function initBenefitAnimations() {
    // Animate benefit cards
    const benefitCards = document.querySelectorAll('.benefit-card');
    
    if (benefitCards.length) {
        gsap.set(benefitCards, { opacity: 0, y: 50 });
        
        ScrollTrigger.create({
            trigger: '.benefits-container',
            start: 'top 70%',
            onEnter: () => {
                gsap.to(benefitCards, {
                    opacity: 1,
                    y: 0,
                    stagger: 0.2,
                    duration: 0.8,
                    ease: 'power3.out',
                    clearProps: 'transform'
                });
            },
            once: true
        });
    }
    
    // Animate impact stats with counting effect
    const impactStats = document.querySelectorAll('.impact-stat');
    
    if (impactStats.length) {
        gsap.set(impactStats, { opacity: 0, y: 30 });
        
        ScrollTrigger.create({
            trigger: '.impact-stats',
            start: 'top 70%',
            onEnter: () => {
                gsap.to(impactStats, {
                    opacity: 1,
                    y: 0,
                    stagger: 0.2,
                    duration: 0.8,
                    ease: 'power3.out',
                    clearProps: 'transform'
                });
            },
            once: true
        });
    }
    
    // Animate principles with staggered entrance
    const principles = document.querySelectorAll('.principle');
    
    if (principles.length) {
        gsap.set(principles, { opacity: 0, y: 40 });
        
        ScrollTrigger.create({
            trigger: '.principles-container',
            start: 'top 70%',
            onEnter: () => {
                gsap.to(principles, {
                    opacity: 1,
                    y: 0,
                    stagger: 0.2,
                    duration: 0.8,
                    ease: 'power3.out',
                    clearProps: 'transform'
                });
            },
            once: true
        });
    }
}

function initFeatureAnimations() {
    // Animate platform features
    const features = document.querySelectorAll('.platform-feature');
    
    if (features.length) {
        gsap.set(features, { opacity: 0, y: 50 });
        
        ScrollTrigger.create({
            trigger: '.features-grid',
            start: 'top 70%',
            onEnter: () => {
                gsap.to(features, {
                    opacity: 1,
                    y: 0,
                    stagger: 0.2,
                    duration: 0.8,
                    ease: 'power3.out',
                    clearProps: 'transform'
                });
            },
            once: true
        });
        
        // Add subtle animation to feature icons
        features.forEach(feature => {
            const icon = feature.querySelector('.feature-icon-wrapper');
            if (icon) {
                gsap.to(icon, {
                    rotate: 10,
                    duration: 3,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut'
                });
            }
        });
    }
}

function initTestimonialAnimations() {
    // Get testimonials
    const testimonialContainer = document.querySelector('.testimonials-container');
    
    if (testimonialContainer) {
        // Add entrance animation
        gsap.from(testimonialContainer, {
            scrollTrigger: {
                trigger: testimonialContainer,
                start: 'top 70%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out',
            clearProps: 'all'
        });
        
        // Add continuous subtle animation
        gsap.to(testimonialContainer, {
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            y: -10,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    }
}

function initFaqAnimations() {
    // Get FAQ items
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length) {
        // Stagger entrance of FAQ items
        gsap.from(faqItems, {
            scrollTrigger: {
                trigger: '.faq-list',
                start: 'top 70%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 30,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power3.out',
            clearProps: 'all'
        });
        
        // Add click animation for FAQ questions
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (question) {
                question.addEventListener('click', function() {
                    gsap.fromTo(
                        this, 
                        { scale: 0.98 }, 
                        { scale: 1, duration: 0.3, ease: 'power2.out' }
                    );
                });
            }
        });
    }
} 