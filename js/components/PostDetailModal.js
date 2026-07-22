/**
 * PostDetailModal component showing full album review with embedded player & ratings
 */

import { getSpotifyEmbedUrl, getAppleMusicEmbedUrl } from '../utils/spotifyHelper.js';

export function renderPostDetailModal(containerEl, post, { onClose }) {
  if (!post) {
    containerEl.innerHTML = '';
    return;
  }

  const spotifyEmbed = getSpotifyEmbedUrl(post.spotifyUrl);
  const appleEmbed = getAppleMusicEmbedUrl(post.appleMusicUrl);

  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'modal-overlay';

  let badgeClass = 'badge-indepth';
  if (post.category === 'new_music') badgeClass = 'badge-new-music';
  if (post.category === 'hidden_gem') badgeClass = 'badge-hidden-gem';

  modalOverlay.innerHTML = `
    <div class="modal-container">
      <!-- Close Button -->
      <button id="modal-close-btn" class="btn-icon modal-close-btn" title="Close Modal">
        <i data-lucide="x"></i>
      </button>

      <!-- Modal Header Banner -->
      <div class="modal-hero-header">
        <img src="${post.coverUrl}" alt="${post.album}" class="modal-cover-img" />
        
        <div class="modal-meta-title">
          <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem; flex-wrap: wrap;">
            <span class="badge ${badgeClass}">${post.categoryLabel}</span>
            <span style="font-size: 0.8rem; color: var(--text-muted);">${post.releaseDate || ''}</span>
          </div>

          <h2>${post.album}</h2>
          <div class="artist">by ${post.artist}</div>

          <div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
            <span class="rating-pill" style="font-size: 1rem; padding: 0.35rem 0.85rem;">
              <i data-lucide="star"></i>
              <span>Overall: ${post.ratings?.overall || '9.0'} / 10</span>
            </span>
            <span class="card-genre" style="font-size: 0.85rem; padding: 0.35rem 0.85rem;">${post.genre}</span>
          </div>
        </div>
      </div>

      <!-- Modal Content Body -->
      <div class="modal-content-body">
        
        <!-- Embedded Audio Player Widget -->
        <div class="player-container">
          <div class="player-tabs">
            <span style="font-size: 0.85rem; font-weight: 700; color: var(--text-secondary); margin-right: 0.5rem;">Listen Preview:</span>
            ${spotifyEmbed ? `
              <button class="player-tab-btn active spotify" id="tab-spotify-btn">
                <i data-lucide="music-2" style="width: 14px; height: 14px; display: inline;"></i> Spotify Player
              </button>
            ` : ''}
            ${appleEmbed ? `
              <button class="player-tab-btn apple ${!spotifyEmbed ? 'active' : ''}" id="tab-apple-btn">
                <i data-lucide="disc" style="width: 14px; height: 14px; display: inline;"></i> Apple Music Player
              </button>
            ` : ''}
          </div>

          <div class="iframe-wrapper" id="player-iframe-holder">
            ${spotifyEmbed ? `
              <iframe src="${spotifyEmbed}" height="152" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
            ` : appleEmbed ? `
              <iframe src="${appleEmbed}" height="175" allow="autoplay *; encrypted-media *;" loading="lazy"></iframe>
            ` : `
              <div style="padding: 1.5rem; text-align: center; color: var(--text-muted); font-size: 0.9rem;">
                No embedded audio player provided. Use external streaming badges below.
              </div>
            `}
          </div>
        </div>

        <!-- Rating Breakdown Radar/Bars -->
        <div class="rating-breakdown-card">
          <div class="rating-title">
            <span>Score Breakdown</span>
            <span style="color: var(--accent-violet); font-size: 0.85rem;">Sound & Artistry Index</span>
          </div>

          <div class="rating-row">
            <span class="rating-label">Production</span>
            <div class="rating-bar-bg">
              <div class="rating-bar-fill" style="width: ${(post.ratings?.production || 9) * 10}%;"></div>
            </div>
            <span class="rating-score-val">${post.ratings?.production || 9.0}</span>
          </div>

          <div class="rating-row">
            <span class="rating-label">Lyrics & Themes</span>
            <div class="rating-bar-bg">
              <div class="rating-bar-fill" style="width: ${(post.ratings?.lyrics || 8.5) * 10}%;"></div>
            </div>
            <span class="rating-score-val">${post.ratings?.lyrics || 8.5}</span>
          </div>

          <div class="rating-row">
            <span class="rating-label">Atmosphere / Vibe</span>
            <div class="rating-bar-bg">
              <div class="rating-bar-fill" style="width: ${(post.ratings?.vibe || 9.5) * 10}%;"></div>
            </div>
            <span class="rating-score-val">${post.ratings?.vibe || 9.5}</span>
          </div>
        </div>

        <!-- Review Text Body -->
        <div class="review-text-content">
          ${post.reviewBody ? post.reviewBody.split('\n\n').map(p => `<p>${p}</p>`).join('') : `<p>${post.excerpt}</p>`}
        </div>

        <!-- Key Tracks List -->
        ${post.keyTracks && post.keyTracks.length > 0 ? `
          <div class="tracklist-box">
            <h4><i data-lucide="disc-3" style="width: 18px; height: 18px; vertical-align: middle; margin-right: 0.35rem; color: var(--accent-violet);"></i> Key Track Highlights</h4>
            <div>
              ${post.keyTracks.map(t => `
                <div class="track-item">
                  <span class="track-name">${t.name}</span>
                  <span class="track-tag">${t.note || 'Essential Listen'}</span>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Streaming Badges & Footer Actions -->
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; padding-top: 1.5rem; border-top: 1px solid var(--border-glass);">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            ${post.spotifyUrl ? `
              <a href="${post.spotifyUrl}" target="_blank" rel="noopener noreferrer" class="platform-btn platform-btn-spotify">
                <i data-lucide="music-2"></i> Open in Spotify
              </a>
            ` : ''}
            ${post.appleMusicUrl ? `
              <a href="${post.appleMusicUrl}" target="_blank" rel="noopener noreferrer" class="platform-btn platform-btn-apple">
                <i data-lucide="disc"></i> Open in Apple Music
              </a>
            ` : ''}
          </div>

          <button id="share-btn" class="btn btn-secondary">
            <i data-lucide="share-2"></i> Share Review
          </button>
        </div>

      </div>
    </div>
  `;

  // Attach Close handlers
  const closeBtn = modalOverlay.querySelector('#modal-close-btn');
  if (closeBtn) closeBtn.addEventListener('click', onClose);

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) onClose();
  });

  // Attach Player Switcher
  const spotifyBtn = modalOverlay.querySelector('#tab-spotify-btn');
  const appleBtn = modalOverlay.querySelector('#tab-apple-btn');
  const iframeHolder = modalOverlay.querySelector('#player-iframe-holder');

  if (spotifyBtn && appleBtn && iframeHolder) {
    spotifyBtn.addEventListener('click', () => {
      spotifyBtn.className = 'player-tab-btn active spotify';
      appleBtn.className = 'player-tab-btn apple';
      iframeHolder.innerHTML = `<iframe src="${spotifyEmbed}" height="152" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
    });

    appleBtn.addEventListener('click', () => {
      appleBtn.className = 'player-tab-btn active apple';
      spotifyBtn.className = 'player-tab-btn spotify';
      iframeHolder.innerHTML = `<iframe src="${appleEmbed}" height="175" allow="autoplay *; encrypted-media *;" loading="lazy"></iframe>`;
    });
  }

  // Share button
  const shareBtn = modalOverlay.querySelector('#share-btn');
  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(window.location.href);
      shareBtn.innerHTML = `<i data-lucide="check"></i> Copied Link!`;
      setTimeout(() => {
        shareBtn.innerHTML = `<i data-lucide="share-2"></i> Share Review`;
        if (window.lucide) window.lucide.createIcons();
      }, 2000);
    });
  }

  containerEl.appendChild(modalOverlay);

  if (window.lucide) {
    window.lucide.createIcons();
  }
}
