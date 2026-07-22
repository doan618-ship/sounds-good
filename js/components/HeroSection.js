/**
 * HeroSection component spotlighting the top featured album review
 */

export function renderHero(containerEl, featuredPost, { onPostClick }) {
  if (!featuredPost) {
    containerEl.innerHTML = '';
    return;
  }

  containerEl.innerHTML = `
    <div class="hero-card">
      <div class="hero-cover-container">
        <span class="badge badge-indepth hero-badge-overlay">⭐ Featured Spotlight</span>
        <img src="${featuredPost.coverUrl}" alt="${featuredPost.album}" class="hero-cover-img" />
      </div>

      <div class="hero-info">
        <div class="hero-meta">
          <span class="hero-artist">${featuredPost.artist}</span>
          <span class="rating-pill">
            <i data-lucide="star"></i>
            <span>${featuredPost.ratings?.overall || '9.5'}</span>
          </span>
        </div>

        <h1 class="hero-title">${featuredPost.album}</h1>
        
        <p class="hero-quote">"${featuredPost.excerpt}"</p>

        <div class="hero-footer">
          <button class="btn btn-primary" id="hero-read-btn">
            <i data-lucide="book-open"></i>
            <span>Read In-Depth Review</span>
          </button>
          
          ${featuredPost.spotifyUrl ? `
            <a href="${featuredPost.spotifyUrl}" target="_blank" rel="noopener noreferrer" class="platform-btn platform-btn-spotify">
              <i data-lucide="music-2"></i>
              <span>Spotify</span>
            </a>
          ` : ''}

          ${featuredPost.appleMusicUrl ? `
            <a href="${featuredPost.appleMusicUrl}" target="_blank" rel="noopener noreferrer" class="platform-btn platform-btn-apple">
              <i data-lucide="disc"></i>
              <span>Apple Music</span>
            </a>
          ` : ''}
        </div>
      </div>
    </div>
  `;

  const readBtn = containerEl.querySelector('#hero-read-btn');
  if (readBtn) {
    readBtn.addEventListener('click', () => onPostClick(featuredPost));
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }
}
