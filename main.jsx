import React from 'react';
import ReactDOM from 'react-dom/client';
import Beams from './Beams';
import CardSwap, { Card } from './CardSwap';
import Lenis from 'lenis';
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });


// Mount Beams component into the hero background
const heroBgElement = document.getElementById('hero-background-root');
if (heroBgElement) {
    ReactDOM.createRoot(heroBgElement).render(
        <React.StrictMode>
            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                <Beams
                    beamWidth={1.1}
                    beamHeight={30}
                    beamNumber={18}
                    lightColor="#b81e1e"
                    speed={6.3}
                    noiseIntensity={1.75}
                    scale={0.2}
                    rotation={30}
                />
            </div>
        </React.StrictMode>
    );

}

// Mount CardSwap component into the hero right side
const cardSwapRoot = document.getElementById('card-swap-root');
if (cardSwapRoot) {
    ReactDOM.createRoot(cardSwapRoot).render(
        <React.StrictMode>
            <div style={{ height: '100%', position: 'relative' }}>
                <CardSwap
                    width={600}
                    height={480}
                    cardDistance={45}
                    verticalDistance={75}
                    delay={3000}
                    pauseOnHover
                >
                    <Card customClass="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                        <h3 style={{ marginBottom: '0.5rem', color: '#fff' }}>Smart Security</h3>
                        <p style={{ color: '#ccc', fontSize: '0.9rem' }}>Comprehensive AI-powered protection for your peace of mind.</p>
                    </Card>
                    <Card customClass="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                        <h3 style={{ marginBottom: '0.5rem', color: '#fff' }}>Home Automation</h3>
                        <p style={{ color: '#ccc', fontSize: '0.9rem' }}>Control lighting, climate, and more with a single touch.</p>
                    </Card>
                    <Card customClass="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                        <h3 style={{ marginBottom: '0.5rem', color: '#fff' }}>Energy Saving</h3>
                        <p style={{ color: '#ccc', fontSize: '0.9rem' }}>Smart systems that optimize usage and reduce utility bills.</p>
                    </Card>
                    <Card customClass="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                        <h3 style={{ marginBottom: '0.5rem', color: '#fff' }}>Access Control</h3>
                        <p style={{ color: '#ccc', fontSize: '0.9rem' }}>Biometric and card-based entry systems for maximum security.</p>
                    </Card>
                    <Card customClass="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                        <h3 style={{ marginBottom: '0.5rem', color: '#fff' }}>Video Door Phone</h3>
                        <p style={{ color: '#ccc', fontSize: '0.9rem' }}>See and speak to visitors from anywhere in the world.</p>
                    </Card>
                    <Card customClass="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                        <h3 style={{ marginBottom: '0.5rem', color: '#fff' }}>Gate Automation</h3>
                        <p style={{ color: '#ccc', fontSize: '0.9rem' }}>Smooth, silent, and reliable automatic gate systems.</p>
                    </Card>
                </CardSwap>
            </div>
        </React.StrictMode>
    );
}

// React environment initialized

// Existing placeholder for main app root
const rootElement = document.getElementById('react-root');
if (rootElement) {
    // Can mount other React components here in the future
    // ReactDOM.createRoot(rootElement).render(<React.StrictMode></React.StrictMode>);
}
// ===========================
// PERFECT LENIS + GSAP SETUP
// ===========================

// ===========================
// OFFICIAL GSAP + LENIS FIXED VERSION
// ===========================

const lenis = new Lenis({
    duration: 1.2, // Reduced for snappier, less 'floaty' feel
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    smoothTouch: false,
    wheelMultiplier: 1.15, // Slightly increased responsiveness
});

// Sync Lenis scroll with GSAP ScrollTrigger
lenis.on("scroll", ScrollTrigger.update);

// Use GSAP ticker ONLY (no requestAnimationFrame)
gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

// Enable GSAP lag smoothing to prevent jumps on heavy frames
gsap.ticker.lagSmoothing(1000, 16);

// Refresh ScrollTrigger after everything loads
ScrollTrigger.refresh();
// PARALLAX CAMERA SCENE

gsap.from(".parallax-title", {
    opacity: 0,
    y: 100,
    force3D: true, // GPU
    scrollTrigger: {
        trigger: ".camera-scene",
        start: "top 70%",
        scrub: true,
    }
});

gsap.from(".parallax-subtitle", {
    opacity: 0,
    y: 80,
    force3D: true, // GPU
    scrollTrigger: {
        trigger: ".camera-scene",
        start: "top 60%",
        scrub: true,
    }
});
gsap.to(".parallax-bg", {
    y: 250,
    ease: "none",
    scrollTrigger: {
        trigger: ".camera-scene",
        start: "top bottom",
        end: "bottom top",
        scrub: 0.5
    },
    force3D: true
});

gsap.to(".parallax-camera", {
    y: -180,
    ease: "none",
    scrollTrigger: {
        trigger: ".camera-scene",
        start: "top bottom",
        end: "bottom top",
        scrub: 0.5
    },
    force3D: true
});

// Navbar Scroll Effect (Stable with Lenis)
const navbar = document.querySelector('.navbar');
if (navbar) {
    ScrollTrigger.create({
        start: "top -50",
        end: 99999,
        toggleClass: { className: "scrolled", targets: navbar },
    });
}
