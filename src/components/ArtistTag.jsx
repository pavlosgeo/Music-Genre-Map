import React, { useState } from 'react';
import { fetchSpotifyArtist } from '../utils/fetchSpotifyArtist';

export default function ArtistTag({ name, spotifyToken }) {
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleHover = async () => {
    if (artist || loading) return;

    try {
      setLoading(true);
      const data = await fetchSpotifyArtist(name, spotifyToken);
      setArtist(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="artist-tag"
      onMouseEnter={handleHover}
    >
      {name}

      {artist && (
        <div className="artist-preview">
          {artist.image && <img src={artist.image} alt={artist.name} />}
          <div>
            <strong>{artist.name}</strong>
            <a
              href={artist.spotifyUrl}
              target="_blank"
              rel="noreferrer"
            >
              Open on Spotify
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
