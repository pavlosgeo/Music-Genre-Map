// src/pages/CallbackPage.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchSpotifyToken } from '../utils/spotifyAuth';

export default function CallbackPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');

        if (code) {
            fetchSpotifyToken(code).then((data) => {
                if (data?.access_token) {
                    // Successfully got token, redirect to map
                    navigate('/map');
                } else {
                    alert('Spotify login failed');
                    navigate('/');
                }
            });
        } else {
            navigate('/');
        }
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