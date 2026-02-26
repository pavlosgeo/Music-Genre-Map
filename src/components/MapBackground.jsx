// src/components/MapBackground.jsx
import React, { useState, useEffect } from 'react';
import '../styles/MapBackground.css';

const genreImageCache = new Map();

const fallbackImageByGenre = {
  rock: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1600&q=80',
  punk: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1600&q=80',
  grunge: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1600&q=80',
  metal: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1600&q=80',
  alternative: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1600&q=80',
  electronic: 'https://images.unsplash.com/photo-1571266028243-d220c9f2db78?auto=format&fit=crop&w=1600&q=80',
  house: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=1600&q=80',
  techno: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=80',
  breakbeat: 'https://images.unsplash.com/photo-1461784121038-f088ca1e7714?auto=format&fit=crop&w=1600&q=80',
  industrial: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1600&q=80',
};

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

async function fetchItunesGenreImage(genreName) {
  const response = await fetch(
    `https://itunes.apple.com/search?term=${encodeURIComponent(genreName)}&entity=album&limit=25`
  );

  if (!response.ok) {
    throw new Error(`iTunes search failed (${response.status})`);
  }

  const data = await response.json();
  const firstArtwork = data?.results?.find((item) => item?.artworkUrl100)?.artworkUrl100;
  if (!firstArtwork) return null;

  return firstArtwork.replace('100x100bb.jpg', '1200x1200bb.jpg');
}

export default function MapBackground({ selectedGenre }) {
  const [bgImage, setBgImage] = useState('');

  useEffect(() => {
    if (!selectedGenre) return;

    const spotifyToken = localStorage.getItem('spotify_token');
    const fallbackImage = fallbackImageByGenre[selectedGenre.id] ?? '';

    const fetchImage = async () => {
      try {
        let imageUrl = null;

        if (spotifyToken) {
          imageUrl = await fetchSpotifyGenreImage(selectedGenre.name, spotifyToken);
        }

        if (!imageUrl) {
          imageUrl = await fetchItunesGenreImage(selectedGenre.name);
        }

        if (!imageUrl) {
          imageUrl = fallbackImage;
        }

        if (imageUrl) {
          setBgImage(imageUrl);
        }
      } catch (error) {
        console.error('Error fetching Spotify background image:', error);
        if (fallbackImage) {
          setBgImage(fallbackImage);
        }
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
