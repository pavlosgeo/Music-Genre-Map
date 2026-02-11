// src/pages/LandingPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css';

export default function LandingPage() {
    const navigate = useNavigate();

    const steps = [
        {
            icon: '🖱️',
            title: 'Browse Genres',
            description: 'Hover or click a node to explore a genre.',
        },
        {
            icon: '🔗',
            title: 'See Influences',
            description: 'Lines show how genres influenced each other.',
        },
        {
            icon: '🎹',
            title: 'Navigate Easily',
            description: 'Use arrow keys to move between connected genres.',
        },
    ];

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

                {/* 3-Step Tutorial with Curved SVG Arrows */}
                <div className="landing-tutorial">
                    {steps.map((step, idx) => (
                        <div key={idx} className="landing-tutorial-step">
                            <div className="landing-tutorial-icon">{step.icon}</div>
                            <div className="landing-tutorial-text">
                                <strong>{step.title}</strong>
                                <p>{step.description}</p>
                            </div>
                            {idx < steps.length - 1 && (
                                <svg
                                    className="landing-tutorial-arrow"
                                    width="60"
                                    height="40"
                                >
                                    <defs>
                                        <linearGradient id={`grad-${idx}`} x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#a78bfa" />
                                            <stop offset="100%" stopColor="#f472b6" />
                                        </linearGradient>
                                    </defs>
                                    <path
                                        d="M0,30 C20,0 40,0 60,30"
                                        stroke={`url(#grad-${idx})`}
                                        strokeWidth="3"
                                        fill="transparent"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            )}
                        </div>
                    ))}
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
                <span>
                    Built by <a href="https://github.com/pavlosgeo" target="_blank" rel="noopener noreferrer">@pavlosgeo</a>
                </span>
            </footer>
        </div>
    );
}
