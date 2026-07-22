/**
 * Helper utility to normalize and generate embed iframe URLs for Spotify & Apple Music
 */

/**
 * Converts a raw Spotify track/album URL or URI into an iframe embed URL
 * e.g., https://open.spotify.com/album/4eLPsYPBmXABThSJ821y6E -> https://open.spotify.com/embed/album/4eLPsYPBmXABThSJ821y6E
 */
export function getSpotifyEmbedUrl(urlOrUri) {
  if (!urlOrUri) return null;

  // Handle Spotify URI format (spotify:album:xyz)
  if (urlOrUri.startsWith('spotify:')) {
    const parts = urlOrUri.split(':');
    if (parts.length >= 3) {
      return `https://open.spotify.com/embed/${parts[1]}/${parts[2]}?utm_source=generator&theme=0`;
    }
  }

  // Handle Spotify Web URL
  try {
    const parsed = new URL(urlOrUri);
    if (parsed.hostname.includes('spotify.com')) {
      let path = parsed.pathname;
      if (!path.startsWith('/embed')) {
        path = '/embed' + path;
      }
      return `https://open.spotify.com${path}?utm_source=generator&theme=0`;
    }
  } catch (e) {
    // If not a valid URL string, check if it's just an ID
    if (urlOrUri.length > 10 && !urlOrUri.includes('/')) {
      return `https://open.spotify.com/embed/album/${urlOrUri}?utm_source=generator&theme=0`;
    }
  }

  return urlOrUri;
}

/**
 * Converts a raw Apple Music album/song URL into an iframe embed URL
 * e.g., https://music.apple.com/us/album/... -> https://embed.music.apple.com/us/album/...
 */
export function getAppleMusicEmbedUrl(url) {
  if (!url) return null;

  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes('music.apple.com')) {
      const path = parsed.pathname;
      return `https://embed.music.apple.com${path}?app=music`;
    }
  } catch (e) {
    // Return original if parsing fails
  }

  return url;
}
