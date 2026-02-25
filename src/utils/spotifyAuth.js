// src/utils/spotifyAuth.js
// Spotify PKCE auth for Vite + ngrok

function base64UrlEncode(buffer) {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function generateCodeVerifier(length = 128) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  return Array.from(crypto.getRandomValues(new Uint8Array(length)))
    .map(x => chars[x % chars.length])
    .join('');
}

async function generateCodeChallenge(verifier) {
  const data = new TextEncoder().encode(verifier);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return base64UrlEncode(digest);
}

const REDIRECT_URI = `${window.location.origin}/callback`;

export async function redirectToSpotifyAuth() {
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;

  const verifier = generateCodeVerifier();
  const challenge = await generateCodeChallenge(verifier);

  sessionStorage.setItem('spotify_code_verifier', verifier);

  const params = new URLSearchParams({
    client_id: clientId,
    response_type: 'code',
    redirect_uri: REDIRECT_URI,
    code_challenge_method: 'S256',
    code_challenge: challenge,
    scope: 'user-read-private user-read-email',
  });

  window.location.href = `https://accounts.spotify.com/authorize?${params}`;
}

export async function fetchSpotifyToken(code) {
  const verifier = sessionStorage.getItem('spotify_code_verifier');
  if (!verifier) throw new Error('Missing PKCE verifier');

  const body = new URLSearchParams({
    client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
    grant_type: 'authorization_code',
    code,
    redirect_uri: REDIRECT_URI,
    code_verifier: verifier,
  });

  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });

  const data = await res.json();

  if (!res.ok) {
    console.error('Spotify token error:', data);
    throw new Error('Spotify login failed');
  }

  sessionStorage.setItem('spotify_token', data.access_token);
  return data;
}