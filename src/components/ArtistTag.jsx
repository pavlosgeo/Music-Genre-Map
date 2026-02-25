import React, { useState } from 'react';
import { fetchSpotifyArtist } from '../utils/fetchSpotifyArtist';

export default function ArtistTag({ name, spotifyToken }) {
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadAttempted, setLoadAttempted] = useState(false);

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
      setLoadAttempted(true);
    }
  };

  return (
    <div
      className="artist-tag"
      onMouseEnter={handleHover}
    >
      {name}

      {(artist || loading || loadAttempted) && (
        <div className="artist-preview">
          {artist?.image && <img src={artist.image} alt={artist.name} />}
          <div className="artist-preview-content">
            <strong>{artist?.name || name}</strong>
            {artist?.spotifyUrl && (
              <a
                href={artist.spotifyUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${artist.name} on Spotify`}
              >
                Open in Spotify
              </a>
            )}

            <div className="artist-top-tracks">
              <span>Top tracks:</span>
              {loading && <p>Loading top tracks…</p>}
              {!loading && artist?.topTracks?.length > 0 && (
                <ul>
                  {artist.topTracks.map((track, index) => (
                    <li key={`${track}-${index}`}>{track}</li>
                  ))}
                </ul>
              )}
              {!loading && (!artist?.topTracks || artist.topTracks.length === 0) && (
                <p>No top tracks available right now.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
