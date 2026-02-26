// src/components/MapBackground.jsx
import React, { useState, useEffect } from 'react';
import '../styles/MapBackground.css';

const genreImageCache = new Map();

function getBestPlaylistImage(playlists = []) {
  const playlistImages = playlists
    .flatMap((playlist) => playlist?.images ?? [])
    .filter((image) => image?.url);

  if (!playlistImages.length) {
    return null;
  }

  return playlistImages.reduce((best, image) => {
    const bestArea = (best?.width ?? 0) * (best?.height ?? 0);
    const imageArea = (image?.width ?? 0) * (image?.height ?? 0);

    return imageArea > bestArea ? image : best;
  });
}

async function fetchSpotifyGenreImage(genreName, token) {
  const cacheKey = genreName.trim().toLowerCase();
  const cachedImage = genreImageCache.get(cacheKey);
  if (cachedImage) return cachedImage;

  const query = `${genreName} music`;
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=playlist&limit=20`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Spotify playlist search failed (${response.status})`);
  }

  const data = await response.json();
  const image = getBestPlaylistImage(data?.playlists?.items);
  const imageUrl = image?.url ?? null;

  if (imageUrl) {
    genreImageCache.set(cacheKey, imageUrl);
  }

  return imageUrl;
}

export default function MapBackground({ selectedGenre }) {
  const [bgImage, setBgImage] = useState('');
  const [fade, setFade] = useState(false);

  useEffect(() => {
    if (!selectedGenre) return;

    const spotifyToken = localStorage.getItem('spotify_token');

    if (!spotifyToken) {
      return;
    }

    const fetchImage = async () => {
      try {
        const imageUrl = await fetchSpotifyGenreImage(selectedGenre.name, spotifyToken);

        if (imageUrl) {
          setFade(false);
          setTimeout(() => {
            setBgImage(imageUrl);
            setFade(true);
          }, 200);
        }
      } catch (error) {
        console.error('Error fetching Spotify background image:', error);
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
