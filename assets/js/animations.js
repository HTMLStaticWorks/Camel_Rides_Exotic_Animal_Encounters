/* 
 * GSAP Animations
 */

// Check if GSAP is loaded
if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    
    document.addEventListener('DOMContentLoaded', () => {
        // Hero Content Animation
        gsap.from('.hero-content > *', {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out'
        });

        // Navbar Links Animation
        gsap.from('.nav-item', {
            y: -20,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
            delay: 0.5
        });

        // Section Headers
        gsap.utils.toArray('.section-header').forEach(header => {
            gsap.from(header, {
                scrollTrigger: {
                    trigger: header,
                    start: 'top 85%'
                },
                y: 30,
                opacity: 0,
                duration: 1,
                ease: 'power2.out'
            });
        });

        // Fade Up Elements
        gsap.utils.toArray('.fade-up').forEach(el => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: 'top 90%'
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out'
            });
        });

        // Reveal Images
        gsap.utils.toArray('.reveal-img').forEach(img => {
            gsap.to(img, {
                scrollTrigger: {
                    trigger: img,
                    start: 'top 80%',
                    onEnter: () => img.classList.add('active')
                }
            });
        });
    });
}
