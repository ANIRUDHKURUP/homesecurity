import React from 'react';
import ReactDOM from 'react-dom/client';
import Beams from './Beams';

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

console.log('React environment initialized. Beams background mounted.');

// Existing placeholder for main app root
const rootElement = document.getElementById('react-root');
if (rootElement) {
    // Can mount other React components here in the future
    // ReactDOM.createRoot(rootElement).render(<React.StrictMode></React.StrictMode>);
}
