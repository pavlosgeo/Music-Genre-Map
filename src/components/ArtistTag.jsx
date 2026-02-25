import React, { useEffect, useRef, useState } from 'react';
import { fetchSpotifyArtist } from '../utils/fetchSpotifyArtist';

export default function ArtistTag({ name, spotifyToken }) {
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadAttempted, setLoadAttempted] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const tagRef = useRef(null);

  const loadArtistPreview = async () => {
    // 🔒 HARD GUARD: no token, no request
    if (!spotifyToken) {
      console.warn('No Spotify token available');
      setLoadAttempted(true);
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

  const handleHover = () => {
    loadArtistPreview();
    setIsPreviewOpen(true);
  };

  const handleClick = (event) => {
    event.stopPropagation();
    if (!isPreviewOpen) {
      loadArtistPreview();
    }
    setIsPreviewOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!tagRef.current?.contains(event.target)) {
        setIsPreviewOpen(false);
      }
    };

    document.addEventListener('pointerdown', handleOutsideClick);
    return () => {
      document.removeEventListener('pointerdown', handleOutsideClick);
    };
  }, []);

  return (
    <div
      ref={tagRef}
      className={`artist-tag ${isPreviewOpen ? 'is-open' : ''}`}
      onMouseEnter={handleHover}
      onClick={handleClick}
    >
      {name}

      {(artist || loading || loadAttempted) && (
        <div className="artist-preview" role="dialog" aria-label={`${name} preview`}>
          {artist?.image && <img src={artist.image} alt={artist.name} />}
          <div className="artist-preview-content">
            <strong>{artist?.name || name}</strong>
            {artist?.spotifyUrl && (
              <a
                href={artist.spotifyUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${artist.name} on Spotify`}
                onClick={(event) => event.stopPropagation()}
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
