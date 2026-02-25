import { getCachedArtist, setCachedArtist } from './spotifyCache';

function normalizeArtistName(value) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function pickBestArtistMatch(items, queryName) {
  if (!Array.isArray(items) || items.length === 0) return null;

  const normalizedQuery = normalizeArtistName(queryName);

  const exactMatch = items.find(
    (item) => normalizeArtistName(item.name) === normalizedQuery
  );

  if (exactMatch) return exactMatch;

  const startsWithMatch = items.find((item) =>
    normalizeArtistName(item.name).startsWith(normalizedQuery)
  );

  if (startsWithMatch) return startsWithMatch;

  return items[0];
}

export async function fetchSpotifyArtist(name, token) {
  if (!token) return null;

  const cached = getCachedArtist(name);
  if (cached) return cached;

  const query = `artist:${name}`;
  const res = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=artist&limit=10`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) throw new Error('Spotify fetch failed');

  const data = await res.json();
  const bestMatch = pickBestArtistMatch(data?.artists?.items, name);

  if (!bestMatch) return null;

  let topTracks = [];

  const readTrackNames = (items) =>
    (items || [])
      .map((track) => track?.name)
      .filter(Boolean)
      .slice(0, 3);

  const fetchArtistTopTracks = async (market) => {
    const params = new URLSearchParams();
    if (market) params.set('market', market);

    const topTracksRes = await fetch(
      `https://api.spotify.com/v1/artists/${bestMatch.id}/top-tracks${params.toString() ? `?${params.toString()}` : ''}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!topTracksRes.ok) {
      const errorBody = await topTracksRes.text();
      throw new Error(`Top tracks request failed (${topTracksRes.status}): ${errorBody}`);
    }

    const topTracksData = await topTracksRes.json();
    return readTrackNames(topTracksData?.tracks);
  };

  const fetchTrackSearchFallback = async () => {
    const query = `artist:"${bestMatch.name}"`;
    const searchRes = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=5`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!searchRes.ok) {
      const errorBody = await searchRes.text();
      throw new Error(`Track search fallback failed (${searchRes.status}): ${errorBody}`);
    }

    const searchData = await searchRes.json();
    return readTrackNames(searchData?.tracks?.items);
  };

  const topTrackResolvers = [
    () => fetchArtistTopTracks('from_token'),
    () => fetchArtistTopTracks('US'),
    fetchTrackSearchFallback,
  ];

  for (const resolveTopTracks of topTrackResolvers) {
    try {
      topTracks = await resolveTopTracks();
      if (topTracks.length > 0) break;
    } catch (error) {
      console.warn('Could not fetch top tracks resolver for artist', name, error);
    }
  }

  const simplified = {
    name: bestMatch.name,
    image: bestMatch.images?.[0]?.url,
    spotifyUrl: bestMatch.external_urls?.spotify,
    followers: bestMatch.followers?.total ?? 0,
    topTracks,
  };

  setCachedArtist(name, simplified);
  return simplified;
}
