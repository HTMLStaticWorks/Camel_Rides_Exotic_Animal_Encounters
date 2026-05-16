/* 
 * Main Website Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle (Basic)
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Tablet/Mobile Dropdown Logic (Fixed for 1024px and below)
    const dropdownTriggers = document.querySelectorAll(".has-dropdown > a");
    
    dropdownTriggers.forEach(trigger => {
        trigger.addEventListener("click", function (e) {
            // Use matchMedia to perfectly sync with CSS media queries
            const isMobileOrTablet = window.matchMedia("(max-width: 1024px)").matches;
            
            if (isMobileOrTablet) {
                e.preventDefault();
                e.stopPropagation();

                const parent = this.parentElement;

                // Close other open dropdowns
                document.querySelectorAll(".has-dropdown").forEach(item => {
                    if (item !== parent) {
                        item.classList.remove("active");
                    }
                });

                // Toggle current dropdown
                parent.classList.toggle("active");
            }
        });
    });

    // Prevent clicks inside the dropdown menu from closing it
    document.querySelectorAll(".dropdown-menu").forEach(menu => {
        menu.addEventListener("click", function (e) {
            if (window.matchMedia("(max-width: 1024px)").matches) {
                e.stopPropagation();
            }
        });
    });

    // Close all dropdowns when clicking anywhere else on the document
    document.addEventListener("click", () => {
        if (window.matchMedia("(max-width: 1024px)").matches) {
            document.querySelectorAll(".has-dropdown").forEach(item => {
                item.classList.remove("active");
            });
        }
    });

    // Theme Toggle (Handle both mobile and desktop)
    const themeToggles = document.querySelectorAll('[id^="theme-toggle"]');
    themeToggles.forEach(toggle => {
        toggle.addEventListener('change', () => {
            const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            // Sync all toggles
            themeToggles.forEach(t => t.checked = (newTheme === 'dark'));
        });
    });

    // RTL Toggle (Handle both mobile and desktop)
    const rtlToggles = document.querySelectorAll('[id^="rtl-toggle"]');
    rtlToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
            document.documentElement.setAttribute('dir', isRTL ? 'ltr' : 'rtl');
        });
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all items
            faqItems.forEach(i => i.classList.remove('active'));

            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Lazy Loading Images
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        let imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let image = entry.target;
                    image.src = image.dataset.src || image.src;
                    imageObserver.unobserve(image);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // Active Menu Highlighting
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const allNavLinks = document.querySelectorAll('.nav-links a');

    // 1. First remove all active classes
    allNavLinks.forEach(link => link.classList.remove('active'));

    // 2. Add active class to matching link
    allNavLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath) {
            link.classList.add('active');

            // If it's a dropdown item, highlight the parent as well
            const parentDropdown = link.closest('.dropdown-menu');
            if (parentDropdown) {
                const parentLink = parentDropdown.parentElement.querySelector('a');
                if (parentLink) parentLink.classList.add('active');
            }
        }
    });

    // 3. Special case for Blog sub-pages
    if (currentPath.startsWith('blog-')) {
        const blogLink = document.querySelector('.nav-links a[href="blog.html"]');
        if (blogLink) blogLink.classList.add('active');
    }

    // Password Visibility Toggle
    const passwordToggles = document.querySelectorAll('.toggle-password');
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const targetId = toggle.getAttribute('data-target');
            const input = document.getElementById(targetId);
            const icon = toggle.querySelector('i');

            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
});
