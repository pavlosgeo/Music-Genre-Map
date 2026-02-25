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

  const simplified = {
    name: bestMatch.name,
    image: bestMatch.images?.[0]?.url,
    spotifyUrl: bestMatch.external_urls?.spotify,
    followers: bestMatch.followers?.total ?? 0,
  };

  setCachedArtist(name, simplified);
  return simplified;
}
