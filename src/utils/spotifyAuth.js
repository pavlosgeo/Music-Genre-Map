// src/utils/spotifyAuth.js
// Spotify PKCE Authentication (Vite + ngrok SAFE)

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;

const SPOTIFY_TOKEN_KEY = 'spotify_token';
const SPOTIFY_TOKEN_EXPIRY_KEY = 'spotify_token_expires_at';

// ---------- PKCE HELPERS ----------

// Convert ArrayBuffer → Base64URL
function base64UrlEncode(buffer) {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

// Generate secure random PKCE verifier
function generateCodeVerifier(length = 128) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  const random = crypto.getRandomValues(new Uint8Array(length));
  return Array.from(random, (x) => chars[x % chars.length]).join('');
}

// Generate SHA256 code challenge
async function generateCodeChallenge(verifier) {
  const data = new TextEncoder().encode(verifier);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return base64UrlEncode(digest);
}

// ---------- AUTH FLOW ----------

// Redirect user to Spotify login
export async function redirectToSpotifyAuth() {
  if (!CLIENT_ID || !REDIRECT_URI) {
    console.error('Missing Spotify env variables');
    return;
  }

  const verifier = generateCodeVerifier();
  const challenge = await generateCodeChallenge(verifier);

  sessionStorage.setItem('spotify_code_verifier', verifier);

  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: 'code',
    redirect_uri: REDIRECT_URI,
    code_challenge_method: 'S256',
    code_challenge: challenge,
    scope: 'user-read-private user-read-email',
  });

  window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

// Exchange authorization code → access token
export async function fetchSpotifyToken(code) {
  const verifier = sessionStorage.getItem('spotify_code_verifier');

  if (!verifier) {
    throw new Error('Missing PKCE code verifier');
  }

  const body = new URLSearchParams({
    client_id: CLIENT_ID,
    grant_type: 'authorization_code',
    code,
    redirect_uri: REDIRECT_URI,
    code_verifier: verifier,
  });

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error('Spotify token error:', data);
    throw new Error('Spotify authentication failed');
  }

  // Store token + expiry metadata
  localStorage.setItem(SPOTIFY_TOKEN_KEY, data.access_token);

  if (typeof data.expires_in === 'number') {
    const expiresAt = Date.now() + (data.expires_in * 1000);
    localStorage.setItem(SPOTIFY_TOKEN_EXPIRY_KEY, String(expiresAt));
  }

  // Cleanup PKCE state
  sessionStorage.removeItem('spotify_code_verifier');

  return data;
}

export function getSpotifyToken() {
  const token = localStorage.getItem(SPOTIFY_TOKEN_KEY);

  if (!token || token === 'undefined' || token === 'null') {
    return null;
  }

  const expiresAtRaw = localStorage.getItem(SPOTIFY_TOKEN_EXPIRY_KEY);

  if (!expiresAtRaw) {
    // Older/invalid sessions may have a token without expiry metadata.
    // Treat these as disconnected to avoid hiding login/connect UI incorrectly.
    localStorage.removeItem(SPOTIFY_TOKEN_KEY);
    return null;
  }

  const expiresAt = Number(expiresAtRaw);
  if (Number.isNaN(expiresAt) || Date.now() >= expiresAt) {
    localStorage.removeItem(SPOTIFY_TOKEN_KEY);
    localStorage.removeItem(SPOTIFY_TOKEN_EXPIRY_KEY);
    return null;
  }

  return token;
}

export function isSpotifyConnected() {
  return Boolean(getSpotifyToken());
}
