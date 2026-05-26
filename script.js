/**
 * GRACE UCHENDU - PORTFOLIO INTERACTIVITY ENGINE
 * Author: Antigravity AI Pair Programmer
 * Date: May 2026
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. SYSTEM CLOCK FOR MOBILE MOCKUP
    // ==========================================================================
    const updateLockScreenClock = () => {
        const timeElements = [
            document.getElementById('mobile-time'),
            document.getElementById('lock-time')
        ];
        const dateElement = document.getElementById('lock-date');
        
        const now = new Date();
        
        // Time format: HH:MM
        let hours = now.getHours();
        let minutes = now.getMinutes();
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        
        const timeString = `${hours}:${minutes}`;
        timeElements.forEach(el => {
            if (el) el.textContent = timeString;
        });
        
        // Date format: Day Name, Month Name DD
        if (dateElement) {
            const options = { weekday: 'long', month: 'long', day: 'numeric' };
            dateElement.textContent = now.toLocaleDateString('en-US', options);
        }
    };
    
    // Initialize & update every minute
    updateLockScreenClock();
    setInterval(updateLockScreenClock, 60000);

    // ==========================================================================
    // 2. THEME SWITCHER SYSTEM (LIGHT & DARK MODES)
    // ==========================================================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    // Check saved local storage preference, default to dark
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Add button click effect
        themeToggleBtn.style.transform = 'scale(0.85) rotate(45deg)';
        setTimeout(() => {
            themeToggleBtn.style.transform = '';
        }, 150);
    });
    
    function updateThemeIcon(theme) {
        if (!themeIcon) return;
        if (theme === 'light') {
            themeIcon.className = 'fas fa-moon';
        } else {
            themeIcon.className = 'fas fa-sun';
        }
    }

    // ==========================================================================
    // 3. STICKY HEADER & SCROLL BEHAVIOR
    // ==========================================================================
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ==========================================================================
    // 4. MOBILE HAMBURGER MENU ACTIONS
    // ==========================================================================
    const hamburger = document.getElementById('hamburger-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Toggle hamburger span rotations
        const spans = hamburger.querySelectorAll('span');
        if (hamburger.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '1';
            spans[2].style.transform = '';
        }
    });
    
    // Close mobile menu on clicking any link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = '';
                spans[1].style.opacity = '1';
                spans[2].style.transform = '';
            }
        });
    });

    // ==========================================================================
    // 5. INTERACTIVE WORK SHOWROOM (TABS)
    // ==========================================================================
    const tabButtons = document.querySelectorAll('.showroom-tab-btn');
    const showroomContents = document.querySelectorAll('.showroom-content');
    
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            
            // Toggle buttons
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Toggle content panels
            showroomContents.forEach(content => {
                content.classList.remove('active');
                if (content.getAttribute('id') === `content-${targetTab}`) {
                    content.classList.add('active');
                }
            });
        });
    });

    // ==========================================================================
    // 6. GETLY COPYWRITING PUSH SIMULATOR
    // ==========================================================================
    const notifButtons = document.querySelectorAll('.notif-option-btn');
    const notifBubble = document.getElementById('notif-bubble');
    const notifTitleDisplay = document.getElementById('notif-title-display');
    const notifBodyDisplay = document.getElementById('notif-body-display');
    
    // Copy options mapped
    const notifMessages = {
        welcome: {
            title: "Ready to scale your reach? 🚀",
            body: "Welcome to Getly, Grace! Discover a smarter way to craft, share, and expand your digital stories today."
        },
        promo: {
            title: "Campaign launch live! ⚡",
            body: "The premium social analytics engine is now active. Log in to claim your 30-day builder pass instantly."
        },
        retention: {
            title: "Did you miss this guide? 💡",
            body: "Learn how Lucien Media grew their audience engagement by 200% using our custom framework. Read now!"
        }
    };
    
    notifButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const msgType = btn.getAttribute('data-msg');
            
            // Reset active states
            notifButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Animate bubble re-reveal
            if (notifBubble) {
                notifBubble.style.animation = 'none';
                notifBubble.offsetHeight; /* trigger reflow */
                
                // Update copy
                if (notifTitleDisplay) notifTitleDisplay.textContent = notifMessages[msgType].title;
                if (notifBodyDisplay) notifBodyDisplay.textContent = notifMessages[msgType].body;
                
                notifBubble.style.animation = 'notification-reveal 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
            }
        });
    });

    // ==========================================================================
    // 7. SKILLS FILTERING SYSTEM
    // ==========================================================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.getAttribute('data-category');
            
            // Toggle active states
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter cards
            skillCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                // Reset card displays
                card.classList.remove('hide');
                
                // Apply filter
                if (category !== 'all' && cardCategory !== category) {
                    card.classList.add('hide');
                }
            });
        });
    });

    // ==========================================================================
    // 8. SCROLL REVEAL (INTERSECTION OBSERVER)
    // ==========================================================================
    const revealElements = document.querySelectorAll('.reveal');
    
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target); // Reveal once
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });
        
        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        revealElements.forEach(el => el.classList.add('revealed'));
    }

    // ==========================================================================
    // 9. HIGH-FIDELITY CONTACT FORM HANDLING & SUCCESS ANIMATION
    // ==========================================================================
    const contactForm = document.getElementById('contact-form');
    const successOverlay = document.getElementById('form-success');
    const resetSuccessBtn = document.getElementById('btn-success-reset');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = document.getElementById('btn-submit-form');
            const originalText = submitBtn.innerHTML;
            
            // Simulate sending animation
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
            
            // Simulate API request delay
            setTimeout(() => {
                // Show success screen overlay
                if (successOverlay) {
                    successOverlay.classList.add('active');
                }
                
                // Clear the form fields
                contactForm.reset();
                
                // Reset submit button state
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                
                // Save lead metadata to localStorage locally
                const submissions = JSON.parse(localStorage.getItem('portfolio-leads') || '[]');
                submissions.push({
                    name: document.getElementById('form-name').value,
                    email: document.getElementById('form-email').value,
                    timestamp: new Date().toISOString()
                });
                localStorage.setItem('portfolio-leads', JSON.stringify(submissions));
                
            }, 1500);
        });
    }
    
    if (resetSuccessBtn) {
        resetSuccessBtn.addEventListener('click', () => {
            if (successOverlay) {
                successOverlay.classList.remove('active');
            }
        });
    }

    // ==========================================================================
    // 10. FLYER LIGHTBOX MODAL SYSTEM
    // ==========================================================================
    const flyerCards = document.querySelectorAll('.flyer-card');
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDesc = document.getElementById('lightbox-desc');
    const lightboxClose = document.getElementById('lightbox-close');
    
    if (flyerCards.length > 0 && lightboxModal) {
        flyerCards.forEach(card => {
            card.addEventListener('click', () => {
                const src = card.getAttribute('data-src');
                const title = card.getAttribute('data-title');
                const desc = card.getAttribute('data-desc');
                
                if (lightboxImg) lightboxImg.setAttribute('src', src);
                if (lightboxImg) lightboxImg.setAttribute('alt', title);
                if (lightboxTitle) lightboxTitle.textContent = title;
                if (lightboxDesc) lightboxDesc.textContent = desc;
                
                lightboxModal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Disable page scrolling
            });
        });
        
        const closeLightbox = () => {
            lightboxModal.classList.remove('active');
            document.body.style.overflow = ''; // Re-enable page scrolling
        };
        
        if (lightboxClose) {
            lightboxClose.addEventListener('click', closeLightbox);
        }
        
        // Close on clicking outside the content image
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                closeLightbox();
            }
        });
        
        // Close on Escape key press
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
                closeLightbox();
            }
        });
    }
});
