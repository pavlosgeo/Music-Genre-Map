// spotifyAuth.js
// Handles Spotify PKCE flow and token fetching for Vite projects

// Encode string to Base64 URL safe
function base64UrlEncode(str) {
  return btoa(str)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

// Generate random code verifier for PKCE
function generateCodeVerifier(length = 128) {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  let verifier = '';
  for (let i = 0; i < length; i++) {
    verifier += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return verifier;
}

// Generate code challenge from verifier using SHA256
async function generateCodeChallenge(verifier) {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashStr = String.fromCharCode(...hashArray);
  return base64UrlEncode(hashStr);
}

// Redirect user to Spotify authorization page
export async function redirectToSpotifyAuth() {
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const redirectUri = window.location.origin + '/map';

  const codeVerifier = generateCodeVerifier();
  const codeChallenge = await generateCodeChallenge(codeVerifier);

  sessionStorage.setItem('spotify_code_verifier', codeVerifier);

  const authUrl = new URL('https://accounts.spotify.com/authorize');
  authUrl.searchParams.set('client_id', clientId);
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('redirect_uri', redirectUri);
  authUrl.searchParams.set('code_challenge_method', 'S256');
  authUrl.searchParams.set('code_challenge', codeChallenge);
  authUrl.searchParams.set('scope', 'user-read-private user-read-email');

  window.location.href = authUrl.toString();
}

// Exchange authorization code for access token
export async function fetchSpotifyToken(code) {
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const redirectUri = window.location.origin + '/map';
  const codeVerifier = sessionStorage.getItem('spotify_code_verifier');

  if (!codeVerifier) {
    console.error('No code verifier found in sessionStorage');
    return null;
  }

  const params = new URLSearchParams({
    client_id: clientId,
    grant_type: 'authorization_code',
    code,
    redirect_uri: redirectUri,
    code_verifier: codeVerifier,
  });

  try {
    const res = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    const data = await res.json();

    if (data.error) {
      console.error('Spotify token error:', data);
      return null;
    }

    // Store access token in sessionStorage
    sessionStorage.setItem('spotify_token', data.access_token);

    return data;
  } catch (err) {
    console.error('Failed to fetch Spotify token:', err);
    return null;
  }
}