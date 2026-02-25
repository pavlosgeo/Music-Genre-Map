import React, { useState } from 'react';
import { fetchSpotifyArtist } from '../utils/fetchSpotifyArtist';

export default function ArtistTag({ name, spotifyToken }) {
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleHover = async () => {
    // 🔒 HARD GUARD: no token, no request
    if (!spotifyToken) {
      console.warn('No Spotify token available');
      return;
    }

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
          <div className="artist-preview-content">
            <strong>{artist.name}</strong>
            {artist.spotifyUrl && (
              <a
                href={artist.spotifyUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${artist.name} on Spotify`}
              >
                Open in Spotify
              </a>
            )}

            {artist.topTracks?.length > 0 && (
              <div className="artist-top-tracks">
                <span>Top tracks:</span>
                <ul>
                  {artist.topTracks.map((track) => (
                    <li key={track}>{track}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
