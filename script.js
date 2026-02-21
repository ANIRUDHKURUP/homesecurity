// Intro animation removed

document.addEventListener('DOMContentLoaded', () => {

    // Navbar Scroll Effect
    // Navbar Scroll Effect - Handled via GSAP in main.jsx for stability with Lenis

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
        rootMargin: "0px 0px -10% 0px" // Trigger earlier for smoother feel
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active-reveal');
                // CSS handles the transition now for smoother performance
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
    const details = document.getElementById(detailsId);
    const modal = document.getElementById('service-modal');
    const modalContent = document.getElementById('modal-body-content');

    if (details && modal && modalContent) {
        // Cancel any pending close timer
        if (window.modalCloseTimer) {
            clearTimeout(window.modalCloseTimer);
            window.modalCloseTimer = null;
        }

        modalContent.innerHTML = details.innerHTML;

        // Customise the Back button to be a Close button
        const closeBtns = modalContent.querySelectorAll('button');
        closeBtns.forEach(btn => {
            btn.innerHTML = 'Close';
            btn.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                closeServiceModal();
            };
        });

        modal.style.display = 'flex';
        // Force reflow
        void modal.offsetWidth;
        modal.classList.add('active');

        // Pause Lenis so scroll only happens inside modal
        if (window.__lenis) {
            window.__lenis.stop();
        }

        // Prevent layout shift only if not already handled
        if (document.body.style.overflow !== 'hidden') {
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.paddingRight = `${scrollbarWidth}px`;
            document.body.style.overflow = 'hidden';

            // Also adjust navbar if fixed
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                navbar.style.paddingRight = `${scrollbarWidth}px`;
            }
        }
    }
}

function closeServiceModal() {
    const modal = document.getElementById('service-modal');
    if (modal) {
        modal.classList.remove('active');

        if (window.modalCloseTimer) clearTimeout(window.modalCloseTimer);

        // Restore layout after transition
        window.modalCloseTimer = setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                navbar.style.paddingRight = '';
            }
            // Resume Lenis smooth scroll
            if (window.__lenis) {
                window.__lenis.start();
            }
            window.modalCloseTimer = null;
        }, 500); // Wait for transition
    }
}

// Close on outside click
window.addEventListener('click', (e) => {
    const modal = document.getElementById('service-modal');
    if (e.target === modal) {
        closeServiceModal();
    }
});

// Specific wrapper functions for HTML onclick attributes
function toggleSmartHomeDetails() { toggleServiceDetails('smart-home-card', 'smart-home-details'); }
function toggleCCTVDetails() { toggleServiceDetails('cctv-card', 'cctv-details'); }
function toggleAccessControlDetails() { toggleServiceDetails('access-control-card', 'access-control-details'); }
function toggleSmartLockDetails() { toggleServiceDetails('smart-lock-card', 'smart-lock-details'); }
function toggleGateAutomationDetails() { toggleServiceDetails('gate-automation-card', 'gate-automation-details'); }
function toggleVDPDetails() { toggleServiceDetails('vdp-card', 'vdp-details'); }
function toggleIntrusionDetails() { toggleServiceDetails('intrusion-alarm-card', 'intrusion-alarm-details'); }
function toggleNetworkingDetails() { toggleServiceDetails('networking-card', 'networking-details'); }
function toggleCurtainDetails() { toggleServiceDetails('curtain-card', 'curtain-details'); }
function toggleShutterDetails() { toggleServiceDetails('shutter-card', 'shutter-details'); }
function toggleBoomBarrierDetails() { toggleServiceDetails('boom-barrier-card', 'boom-barrier-details'); }
function toggleSprinklerDetails() { toggleServiceDetails('sprinkler-card', 'sprinkler-details'); }
function toggleMultiroomAudioDetails() { toggleServiceDetails('multiroom-audio-card', 'multiroom-audio-details'); }

// Expose to window
if (typeof window !== 'undefined') {
    window.toggleServiceDetails = toggleServiceDetails;
    window.closeServiceModal = closeServiceModal;
    window.toggleSmartHomeDetails = toggleSmartHomeDetails;
    window.toggleCCTVDetails = toggleCCTVDetails;
    window.toggleAccessControlDetails = toggleAccessControlDetails;
    window.toggleSmartLockDetails = toggleSmartLockDetails;
    window.toggleGateAutomationDetails = toggleGateAutomationDetails;
    window.toggleVDPDetails = toggleVDPDetails;
    window.toggleIntrusionDetails = toggleIntrusionDetails;
    window.toggleNetworkingDetails = toggleNetworkingDetails;
    window.toggleCurtainDetails = toggleCurtainDetails;
    window.toggleShutterDetails = toggleShutterDetails;
    window.toggleBoomBarrierDetails = toggleBoomBarrierDetails;
    window.toggleSprinklerDetails = toggleSprinklerDetails;
    window.toggleMultiroomAudioDetails = toggleMultiroomAudioDetails;
}

/* Testimonials Carousel Logic */
document.addEventListener('DOMContentLoaded', () => {
    // Wait for DOM to be fully ready
    setTimeout(initTestimonials, 100);
});

function initTestimonials() {
    const cards = Array.from(document.querySelectorAll('.review-card'));
    const track = document.querySelector('.carousel-track-wrapper');
    const dots = document.querySelectorAll('.dot');

    if (!cards.length || !track) return;

    let currentIndex = 0;
    let autoRotateInterval;
    const intervalTime = 4000;

    // Helper to set classes
    function updateClasses() {
        const total = cards.length;

        cards.forEach((card, index) => {
            // Remove all state classes
            card.classList.remove('active', 'prev', 'next', 'hidden');

            // Determine relative position
            // We want wrapping: prev is (current - 1), next is (current + 1)
            // If total=4:
            // current=0 -> active
            // prev index = 3 -> prev
            // next index = 1 -> next
            // index 2 -> hidden

            if (index === currentIndex) {
                card.classList.add('active');
            } else if (index === (currentIndex - 1 + total) % total) {
                card.classList.add('prev');
            } else if (index === (currentIndex + 1) % total) {
                card.classList.add('next');
            } else {
                card.classList.add('hidden');
            }
        });

        // Update dots
        dots.forEach((dot, index) => {
            if (index === currentIndex) dot.classList.add('active');
            else dot.classList.remove('active');
        });
    }

    function rotateNext() {
        currentIndex = (currentIndex + 1) % cards.length;
        updateClasses();
    }

    function rotatePrev() {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateClasses();
    }

    function startAutoRotate() {
        stopAutoRotate();
        autoRotateInterval = setInterval(rotateNext, intervalTime);
    }

    function stopAutoRotate() {
        clearInterval(autoRotateInterval);
    }

    // Initialize
    updateClasses();
    startAutoRotate();

    // Event Listeners

    // Pause on hover
    const carouselSection = document.querySelector('.testimonials-carousel');
    if (carouselSection) {
        carouselSection.addEventListener('mouseenter', stopAutoRotate);
        carouselSection.addEventListener('mouseleave', startAutoRotate);
    }

    // Dots Click
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateClasses();
            startAutoRotate();
        });
    });

    // Button Click
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            rotatePrev();
            startAutoRotate();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            rotateNext();
            startAutoRotate();
        });
    }

    // Touch Support
    let touchStartX = 0;
    let touchEndX = 0;

    if (carouselSection) {
        carouselSection.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        carouselSection.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }

    function handleSwipe() {
        const threshold = 50;
        if (touchEndX < touchStartX - threshold) {
            rotateNext();
            startAutoRotate();
        } else if (touchEndX > touchStartX + threshold) {
            rotatePrev();
            startAutoRotate();
        }
    }
}

/* Click Spark Effect - Global Implementation */
class ClickSpark {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.sparks = [];
        this.config = {
            color: '#FF2D2D', // Updated to Red
            size: 14,      // Updated from 10
            radius: 30,    // Updated from 15
            count: 8,
            duration: 400,
            extraScale: 1.0,
            easing: 'ease-out'
        };

        // Initialize on load
        this.init();
    }

    init() {
        this.setupCanvas();
        window.addEventListener('resize', () => this.resize());

        // Global click listener
        document.addEventListener('mousedown', (e) => this.handleClick(e));

        // Start animation loop
        requestAnimationFrame((t) => this.animate(t));
    }

    setupCanvas() {
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100vw'; // Use vw/vh for full viewport
        this.canvas.style.height = '100vh';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '99999'; // Highest z-index
        document.body.appendChild(this.canvas);
        this.resize();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    ease(t) {
        // ease-out helper: cubic ease-out
        return 1 - Math.pow(1 - t, 3);
    }

    handleClick(e) {
        const x = e.clientX;
        const y = e.clientY;
        const now = performance.now();

        const newSparks = Array.from({ length: this.config.count }, (_, i) => ({
            x,
            y,
            angle: (2 * Math.PI * i) / this.config.count,
            startTime: now
        }));

        this.sparks.push(...newSparks);

        // Restart animation if not running
        if (!this.isRunning) {
            this.isRunning = true;
            requestAnimationFrame((t) => this.animate(t));
        }
    }

    animate(timestamp) {
        if (!this.isRunning) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.sparks = this.sparks.filter(spark => {
            const elapsed = timestamp - spark.startTime;
            if (elapsed >= this.config.duration) return false; // Remove old sparks

            const progress = elapsed / this.config.duration;
            const eased = this.ease(progress);

            const distance = eased * this.config.radius * this.config.extraScale;
            const lineLength = this.config.size * (1 - eased);

            const x1 = spark.x + distance * Math.cos(spark.angle);
            const y1 = spark.y + distance * Math.sin(spark.angle);
            const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
            const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

            this.ctx.strokeStyle = this.config.color;
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.moveTo(x1, y1);
            this.ctx.lineTo(x2, y2);
            this.ctx.stroke();

            return true;
        });

        if (this.sparks.length > 0) {
            requestAnimationFrame((t) => this.animate(t));
        } else {
            this.isRunning = false;
        }
    }
}

// Initialize ClickSpark global instance
document.addEventListener('DOMContentLoaded', () => {
    new ClickSpark();
});



// Camera Tracking Logic
function initCameraTracking() {
    const cameraHead = document.getElementById('camera-head');
    const cameraContainer = document.querySelector('.hero-camera');

    if (!cameraHead || !cameraContainer) return;

    // Throttle for performance? Mousemove fires fast. 
    // `requestAnimationFrame` is smoother.
    let ticking = false;

    window.addEventListener('mousemove', (e) => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const rect = cameraContainer.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                const dx = e.clientX - centerX;
                const dy = e.clientY - centerY;

                // Calculate angle to mouse
                // atan2 returns angle from X+ axis (Right)
                // We want 0 degrees to be X- axis (Left) because the image points Left
                let angle = (Math.atan2(dy, dx) * (180 / Math.PI)) - 180;

                // Normalize to [-180, 180]
                if (angle < -180) angle += 360;
                if (angle > 180) angle -= 360;

                // Clamp to +/- 30 degrees
                const limit = 30;
                if (angle > limit) angle = limit;
                if (angle < -limit) angle = -limit;

                cameraHead.style.transform = `rotate(${angle}deg)`;
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Init when DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCameraTracking);
} else {
    initCameraTracking();
}

// Hero Text Animation - Premium Cinematic Transition
document.addEventListener('DOMContentLoaded', () => {
    const textElement = document.getElementById('changing-text');
    const words = ["Automation", "Security", "Rovex"];
    let wordIndex = 0;

    if (textElement) {
        // Ensure element is ready for transforms
        // The inline-block style is critical and handled in HTML or CSS

        const animateText = () => {
            // Phase 1: Exit Animation (Fade Out + Move Up + Blur)
            const exitAnimation = textElement.animate([
                { opacity: 1, transform: 'translateY(0)', filter: 'blur(0px)' },
                { opacity: 0, transform: 'translateY(-20px)', filter: 'blur(8px)' }
            ], {
                duration: 800,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)', // Premium ease
                fill: 'forwards'
            });

            exitAnimation.onfinish = () => {
                // Swap Text Content
                wordIndex = (wordIndex + 1) % words.length;
                textElement.textContent = words[wordIndex];

                // Phase 2: Enter Animation (Fade In + Move Up from Bottom + Clear Blur)
                textElement.animate([
                    { opacity: 0, transform: 'translateY(20px)', filter: 'blur(8px)' },
                    { opacity: 1, transform: 'translateY(0)', filter: 'blur(0px)' }
                ], {
                    duration: 800,
                    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                    fill: 'forwards'
                });
            };
        };

        // Start the cycle
        setInterval(animateText, 3500);
    }
});
