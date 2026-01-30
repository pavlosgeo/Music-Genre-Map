// src/components/MapBackground.jsx
import React, { useState, useEffect } from 'react';
import '../styles/MapBackground.css';

const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export default function MapBackground({ selectedGenre }) {
  const [bgImage, setBgImage] = useState('');
  const [fade, setFade] = useState(false);

  useEffect(() => {
    if (!selectedGenre || !UNSPLASH_KEY) return;

    const fetchImage = async () => {
      try {
        const response = await fetch(
          `https://api.unsplash.com/photos/random?query=${selectedGenre.name}+band&client_id=${UNSPLASH_KEY}`
        );
        if (!response.ok) throw new Error('Failed to fetch background image');
        const data = await response.json();
        if (data?.urls?.full) {
          setFade(false); // start fade-out
          setTimeout(() => {
            setBgImage(data.urls.full); // update image
            setFade(true); // fade-in new image
          }, 200); // small delay for smooth crossfade
        }
      } catch (error) {
        console.error('Error fetching background image:', error);
      }
    };

    fetchImage();
  }, [selectedGenre]);

  return (
    <div
      className={`map-background ${fade ? 'visible' : ''}`}
      style={{ backgroundImage: `url(${bgImage})` }}
    />
  );
}
