// src/components/MapBackground.jsx
import React, { useState, useEffect } from 'react';
import '../styles/MapBackground.css';

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
        if (data?.urls?.full) {
          setBgImage(data.urls.full);
        }
      } catch (error) {
        console.error('Error fetching background image:', error);
      }
    };

    fetchImage();
  }, [selectedGenre]);

  return (
    <div
      className="map-background visible"
      style={{
        backgroundImage: bgImage
          ? `linear-gradient(rgba(10, 8, 20, 0.45), rgba(10, 8, 20, 0.6)), url(${bgImage})`
          : undefined,
      }}
    />
  );
}
