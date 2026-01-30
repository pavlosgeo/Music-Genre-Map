import React, { useState, useEffect } from 'react';

// Read once from .env
const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export default function MapBackground({ selectedGenre }) {
  const [bgImage, setBgImage] = useState('');

  useEffect(() => {
    if (!selectedGenre || !UNSPLASH_KEY) return;

    const fetchImage = async () => {
      try {
        const response = await fetch(
          `https://api.unsplash.com/photos/random?query=${selectedGenre.name}+band&client_id=${UNSPLASH_KEY}`
        );

        if (!response.ok) throw new Error('Failed to fetch background image');

        const data = await response.json();
        if (data?.urls?.full) setBgImage(data.urls.full);
      } catch (error) {
        console.error('Error fetching background image:', error);
        setBgImage(''); // fallback to none
      }
    };

    fetchImage();
  }, [selectedGenre]);

  return (
    <div
      className="reactflow-background"
      style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: bgImage ? `url(${bgImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'brightness(0.4)',
        transition: 'background-image 0.5s ease-in-out',
        zIndex: 0,
        pointerEvents: 'none', // allow clicks on nodes
      }}
    />
  );
}
