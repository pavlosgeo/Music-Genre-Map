// src/pages/LandingPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css';

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="landing-root">

            <div className="landing-bg-gradient" />
            <div className="landing-bg-noise" />


            <main className="landing-content">
                <div className="landing-heading">
                    <span className="landing-heading-line">
                        Music Genres,
                    </span>
                    <span className="landing-heading-line landing-heading-accent">
                        Visually Connected
                    </span>
                </div>

                <div className="landing-description">
                    <span>
                        Explore how sounds evolved, collided, and influenced each other —
                        from rock to electronic and beyond.
                    </span>
                </div>

                <div className="landing-actions">
                    <button
                        className="landing-cta"
                        onClick={() => navigate('/map')}
                    >
                        Explore the Map
                    </button>
                </div>
            </main>


            <footer className="landing-footer">
                <span>Interactive Music Genre Map</span> <br />
                <span>Built by <a href="https://github.com/pavlosgeo">@pavlosgeo</a></span>
            </footer>
        </div>
    );
}
