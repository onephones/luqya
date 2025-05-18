/*!
 * Preloader and Page Transition Effects for Luqya Platform
 */

document.addEventListener('DOMContentLoaded', function() {
    // Create preloader element
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    
    // Create preloader content
    const preloaderLogo = document.createElement('div');
    preloaderLogo.className = 'preloader-logo';
    
    const spinner = document.createElement('div');
    spinner.className = 'preloader-spinner';
    
    // Create preloader text
    const preloaderText = document.createElement('div');
    preloaderText.className = 'preloader-text';
    
    // Display "لُقيا" as a single word instead of splitting it
    const siteName = "لُقيا";
    preloaderText.textContent = siteName;
    
    // Assemble preloader
    preloaderLogo.appendChild(spinner);
    preloaderLogo.appendChild(preloaderText);
    preloader.appendChild(preloaderLogo);
    
    // Add preloader to body
    document.body.appendChild(preloader);
    
    // Prevent scrolling while preloader is active
    document.body.style.overflow = 'hidden';
    
    // Add event listener for when page is fully loaded
    window.addEventListener('load', () => {
        // Delay hiding preloader for a smoother effect
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.style.overflow = 'auto';
            
            // Remove preloader from DOM after animation
            setTimeout(() => {
                preloader.remove();
                
                // Animate page entrance
                animatePageEntrance();
            }, 500);
        }, 1000); // Show preloader for at least 1 second
    });
});

function animatePageEntrance() {
    // Fade in different sections with a staggered delay
    const sections = document.querySelectorAll('section');
    
    if (sections.length) {
        sections.forEach((section, index) => {
            setTimeout(() => {
                section.classList.add('animate', 'animate-fade-in');
            }, index * 100);
        });
    }
    
    // Special animation for hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.classList.add('animate', 'animate-fade-in');
        
        const heroContent = heroSection.querySelector('.hero-content');
        if (heroContent) {
            heroContent.classList.add('animate', 'animate-fade-up');
        }
        
        // Add animated background elements
        addAnimatedBackgroundElements(heroSection);
    }
    
    // Add parallax elements to various sections
    addParallaxElements();
}

function addAnimatedBackgroundElements(heroSection) {
    // Create background elements
    const element1 = document.createElement('div');
    element1.className = 'animated-bg-element hero-element-1 parallax';
    element1.setAttribute('data-speed', '0.05');
    
    const element2 = document.createElement('div');
    element2.className = 'animated-bg-element hero-element-2 parallax';
    element2.setAttribute('data-speed', '0.08');
    
    const element3 = document.createElement('div');
    element3.className = 'animated-bg-element hero-element-3 parallax';
    element3.setAttribute('data-speed', '0.03');
    
    // Add elements to hero section
    heroSection.appendChild(element1);
    heroSection.appendChild(element2);
    heroSection.appendChild(element3);
}

function addParallaxElements() {
    // Add parallax background elements to sections
    const sections = document.querySelectorAll('section:not(.hero-section)');
    
    sections.forEach((section, index) => {
        if (index % 2 === 0) {
            // Create decoration elements for even sections
            const decElement = document.createElement('div');
            decElement.className = 'animated-bg-element parallax';
            decElement.setAttribute('data-speed', '0.04');
            decElement.style.width = '200px';
            decElement.style.height = '200px';
            decElement.style.top = '10%';
            decElement.style.right = '-50px';
            decElement.style.background = 'radial-gradient(var(--luqya-blue), transparent 70%)';
            
            section.style.position = 'relative';
            section.style.overflow = 'hidden';
            section.appendChild(decElement);
        } else {
            // Create decoration elements for odd sections
            const decElement = document.createElement('div');
            decElement.className = 'animated-bg-element parallax';
            decElement.setAttribute('data-speed', '0.06');
            decElement.style.width = '250px';
            decElement.style.height = '250px';
            decElement.style.bottom = '10%';
            decElement.style.left = '-50px';
            decElement.style.background = 'radial-gradient(var(--luqya-teal), transparent 70%)';
            
            section.style.position = 'relative';
            section.style.overflow = 'hidden';
            section.appendChild(decElement);
        }
    });
    
    // Add decoration elements to specific sections
    const processSection = document.querySelector('#how-it-works');
    const benefitsSection = document.querySelector('#benefits');
    
    if (processSection) {
        const decElement = document.createElement('div');
        decElement.className = 'animated-bg-element parallax';
        decElement.setAttribute('data-speed', '0.03');
        decElement.style.width = '150px';
        decElement.style.height = '150px';
        decElement.style.top = '30%';
        decElement.style.left = '10%';
        decElement.style.background = 'radial-gradient(var(--reunion-orange), transparent 70%)';
        
        processSection.appendChild(decElement);
    }
    
    if (benefitsSection) {
        const decElement = document.createElement('div');
        decElement.className = 'animated-bg-element parallax';
        decElement.setAttribute('data-speed', '0.05');
        decElement.style.width = '180px';
        decElement.style.height = '180px';
        decElement.style.bottom = '20%';
        decElement.style.right = '10%';
        decElement.style.background = 'radial-gradient(var(--hope-yellow), transparent 70%)';
        
        benefitsSection.appendChild(decElement);
    }
} 