// src/pages/CallbackPage.jsx
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchSpotifyToken } from '../utils/spotifyAuth';

export default function CallbackPage() {
    const navigate = useNavigate();
    const hasFetched = useRef(false); // Prevent double execution

    useEffect(() => {
        if (hasFetched.current) return; // Skip if already fetched
        hasFetched.current = true;

        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');

        if (!code) {
            console.error('No Spotify authorization code found');
            navigate('/');
            return;
        }

        fetchSpotifyToken(code)
            .then((data) => {
                if (data?.access_token) {
                    // Token successfully obtained
                    navigate('/map');
                } else {
                    console.error('Spotify login failed', data);
                    alert('Spotify login failed');
                    navigate('/');
                }
            })
            .catch((err) => {
                console.error('Spotify token fetch error:', err);
                alert('Spotify login failed');
                navigate('/');
            });
    }, [navigate]);

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                color: 'white',
                background: '#0b0b10',
                fontSize: '1.2rem',
            }}
        >
            Logging in with Spotify...
        </div>
    );
}