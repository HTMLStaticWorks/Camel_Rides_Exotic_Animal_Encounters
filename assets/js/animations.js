/* 
 * GSAP Animations
 */

// Check if GSAP is loaded
if (typeof gsap !== 'undefined') {
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
                    start: 'top 80%'
                },
                y: 30,
                opacity: 0,
                duration: 1,
                ease: 'power2.out'
            });
        });
    });
}
