// Intro Animation Logic
window.addEventListener('load', () => {
    const introScreen = document.getElementById('intro-screen');
    const introLogo = document.querySelector('.intro-logo');
    const navLogoImg = document.getElementById('nav-logo-img');

    // Prevent scrolling during intro
    document.body.style.overflow = 'hidden';

    if (introScreen && introLogo && navLogoImg) {
        // Wait for a bit of glitter (1.5s)
        setTimeout(() => {
            // Get positions
            const startRect = introLogo.getBoundingClientRect();
            // We need to show the nav logo temporarily (invisible but layout) to measure it?
            // It is already in the DOM, style opacity: 0.
            // But we need to make sure the navbar is in its initial state (top).
            // It is top 0 fixed.

            // Just in case, ensure nav logo is rendered size
            const endRect = navLogoImg.getBoundingClientRect();

            // Set fixed position on intro logo to prepare for move
            introLogo.style.width = startRect.width + 'px';
            introLogo.style.height = startRect.height + 'px'; // Maintain aspect
            introLogo.style.top = startRect.top + 'px';
            introLogo.style.left = startRect.left + 'px';
            introLogo.classList.add('moving');

            // Force reflow
            void introLogo.offsetWidth;

            // Move to new position
            introLogo.style.width = endRect.width + 'px';
            introLogo.style.height = endRect.height + 'px'; // Adjust height too if needed
            introLogo.style.top = endRect.top + 'px';
            introLogo.style.left = endRect.left + 'px';

            // When transition ends
            setTimeout(() => {
                // Fade out intro screen background
                introScreen.style.opacity = '0';

                // Show real nav logo instantly
                navLogoImg.style.opacity = '1';
                // Hide animated logo
                introLogo.style.opacity = '0';

                // Allow scrolling
                document.body.style.overflow = '';

                // Remove intro screen from DOM after fade
                setTimeout(() => {
                    introScreen.style.display = 'none';
                }, 500);

            }, 1200); // 1.2s matches transition duration

        }, 1500); // 1.5s delay for glitter
    }
});

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

    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileMenu.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenu.classList.toggle('is-active');
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenu.classList.remove('is-active');
        });
    });

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active-reveal');
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translate(0, 0)";
                observer.unobserve(entry.target); // Animates only once
            }
        });
    }, observerOptions);

    // Select elements to animate
    const hiddenElements = document.querySelectorAll('.fade-in-up, .reveal-left, .reveal-right, .reveal-bottom');
    hiddenElements.forEach((el) => observer.observe(el));

    // Optional: Add hover 3D effect to service cards if requested or fitting
    // Not adding to keep it clean and performant as per "clean layout" request
});



function toggleServiceDetails(cardId, detailsId) {
    const card = document.getElementById(cardId);
    const details = document.getElementById(detailsId);
    const allCards = document.querySelectorAll('.service-card');

    // Check if card is already expanded
    const isExpanded = card.classList.contains('expanded');

    // Reset all cards first
    allCards.forEach(c => {
        c.classList.remove('expanded');
        // Hide details for all cards that have them
        const cDetails = c.querySelector('.service-details');
        if (cDetails) {
            cDetails.style.display = 'none';
        }
        c.style.display = 'block';
    });

    if (!isExpanded) {
        // Expand the clicked card
        card.classList.add('expanded');
        details.style.display = 'block';

        setTimeout(() => {
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);

    } else {
        setTimeout(() => {
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    }
}

function toggleSmartHomeDetails() {
    toggleServiceDetails('smart-home-card', 'smart-home-details');
}

function toggleCCTVDetails() {
    toggleServiceDetails('cctv-card', 'cctv-details');
}

function toggleAccessControlDetails() {
    toggleServiceDetails('access-control-card', 'access-control-details');
}
function toggleSmartLockDetails() {
    toggleServiceDetails('smart-lock-card', 'smart-lock-details');
}

function toggleGateAutomationDetails() {
    toggleServiceDetails('gate-automation-card', 'gate-automation-details');
}

function toggleVDPDetails() {
    toggleServiceDetails('vdp-card', 'vdp-details');
}

function toggleIntrusionDetails() {
    toggleServiceDetails('intrusion-alarm-card', 'intrusion-alarm-details');
}

function toggleNetworkingDetails() {
    toggleServiceDetails('networking-card', 'networking-details');
}

function toggleCurtainDetails() {
    toggleServiceDetails('curtain-card', 'curtain-details');
}

function toggleShutterDetails() {
    toggleServiceDetails('shutter-card', 'shutter-details');
}

function toggleBoomBarrierDetails() {
    toggleServiceDetails('boom-barrier-card', 'boom-barrier-details');
}


function toggleSprinklerDetails() {
    toggleServiceDetails('sprinkler-card', 'sprinkler-details');
}


