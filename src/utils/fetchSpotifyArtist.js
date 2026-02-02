import { getCachedArtist, setCachedArtist } from './spotifyCache';

export async function fetchSpotifyArtist(name, token) {
  if (!token) return null;

  const cached = getCachedArtist(name);
  if (cached) return cached;

  const res = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(name)}&type=artist&limit=1`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) throw new Error('Spotify fetch failed');

  const data = await res.json();
  const artist = data.artists.items[0];

  if (!artist) return null;

  const simplified = {
    name: artist.name,
    image: artist.images?.[0]?.url,
    spotifyUrl: artist.external_urls.spotify,
    followers: artist.followers.total,
  };

  setCachedArtist(name, simplified);
  return simplified;
}
