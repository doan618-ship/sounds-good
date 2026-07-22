/**
 * PostPublisherModal component - In-App Review Studio & JSON Exporter
 */

export function renderPostPublisherModal(containerEl, { onSave, onClose }) {
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'modal-overlay';

  modalOverlay.innerHTML = `
    <div class="modal-container" style="max-width: 800px;">
      <!-- Close Button -->
      <button id="pub-close-btn" class="btn-icon modal-close-btn" title="Close Modal">
        <i data-lucide="x"></i>
      </button>

      <!-- Modal Header -->
      <div style="padding: 2rem 2.5rem 1.5rem 2.5rem; border-bottom: 1px solid var(--border-glass);">
        <div style="display: flex; align-items: center; gap: 0.5rem; color: var(--accent-violet); font-size: 0.85rem; font-weight: 700; text-transform: uppercase;">
          <i data-lucide="pen-tool"></i> Post Studio & Exporter
        </div>
        <h2 style="font-size: 1.8rem; font-weight: 800; margin-top: 0.25rem;">Create New Music Entry</h2>
        <p style="color: var(--text-secondary); font-size: 0.9rem;">Compose a review post for New Music, Hidden Gems, or In-Depth Reviews.</p>
      </div>

      <!-- Modal Form Content -->
      <form id="publisher-form" style="padding: 2rem 2.5rem;">
        <div class="form-grid">
          
          <!-- Category -->
          <div class="form-group">
            <label class="form-label">Category *</label>
            <select id="pub-category" class="form-select" required>
              <option value="new_music">🔥 New Music (New Release)</option>
              <option value="hidden_gem">💎 Hidden Gem (Underrated Track)</option>
              <option value="indepth" selected>📝 In-Depth Review</option>
            </select>
          </div>

          <!-- Genre -->
          <div class="form-group">
            <label class="form-label">Genre Tag *</label>
            <input type="text" id="pub-genre" class="form-input" placeholder="e.g. Synthwave / Indie, R&B, Lo-Fi" required />
          </div>

          <!-- Artist Name -->
          <div class="form-group">
            <label class="form-label">Artist Name *</label>
            <input type="text" id="pub-artist" class="form-input" placeholder="e.g. The Midnight Echo" required />
          </div>

          <!-- Album Title -->
          <div class="form-group">
            <label class="form-label">Album / Track Title *</label>
            <input type="text" id="pub-album" class="form-input" placeholder="e.g. Neon Horizons" required />
          </div>

          <!-- Cover Image URL -->
          <div class="form-group full-width">
            <label class="form-label">Album Cover Artwork URL</label>
            <input type="url" id="pub-cover" class="form-input" placeholder="https://images.unsplash.com/photo-..." />
          </div>

          <!-- Spotify URL -->
          <div class="form-group">
            <label class="form-label">Spotify Link / URI</label>
            <input type="text" id="pub-spotify" class="form-input" placeholder="https://open.spotify.com/album/..." />
          </div>

          <!-- Apple Music URL -->
          <div class="form-group">
            <label class="form-label">Apple Music Link</label>
            <input type="url" id="pub-apple" class="form-input" placeholder="https://music.apple.com/us/album/..." />
          </div>

          <!-- Score Breakdown Sliders -->
          <div class="form-group full-width" style="background: rgba(255,255,255,0.02); padding: 1.25rem; border-radius: 12px; border: 1px solid var(--border-glass);">
            <label class="form-label" style="margin-bottom: 0.75rem;">Ratings Score (out of 10.0)</label>
            
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
              <div>
                <span style="font-size: 0.8rem; color: var(--text-secondary);">Production: <strong id="val-prod">9.5</strong></span>
                <input type="range" id="pub-rate-prod" min="5" max="10" step="0.1" value="9.5" style="width: 100%; accent-color: var(--accent-violet);" />
              </div>
              <div>
                <span style="font-size: 0.8rem; color: var(--text-secondary);">Lyrics: <strong id="val-lyr">9.0</strong></span>
                <input type="range" id="pub-rate-lyr" min="5" max="10" step="0.1" value="9.0" style="width: 100%; accent-color: var(--accent-violet);" />
              </div>
              <div>
                <span style="font-size: 0.8rem; color: var(--text-secondary);">Vibe: <strong id="val-vibe">9.8</strong></span>
                <input type="range" id="pub-rate-vibe" min="5" max="10" step="0.1" value="9.8" style="width: 100%; accent-color: var(--accent-violet);" />
              </div>
            </div>
          </div>

          <!-- Short Excerpt -->
          <div class="form-group full-width">
            <label class="form-label">Headline / Excerpt Quote *</label>
            <input type="text" id="pub-excerpt" class="form-input" placeholder="A brief one-sentence hook..." required />
          </div>

          <!-- Full Review Body -->
          <div class="form-group full-width">
            <label class="form-label">Full Review Article Content *</label>
            <textarea id="pub-review" class="form-textarea" placeholder="Write your full album breakdown, thoughts on sound design, highlights..." required></textarea>
          </div>

        </div>

        <!-- Publisher Footer Actions -->
        <div class="publisher-footer">
          <button type="button" id="pub-export-btn" class="btn btn-secondary">
            <i data-lucide="code"></i> Copy Post JSON
          </button>
          
          <div style="display: flex; gap: 0.75rem;">
            <button type="button" id="pub-cancel-btn" class="btn btn-secondary">Cancel</button>
            <button type="submit" class="btn btn-primary">
              <i data-lucide="check"></i> Publish Post
            </button>
          </div>
        </div>
      </form>
    </div>
  `;

  // Attach score listeners
  const prodSlider = modalOverlay.querySelector('#pub-rate-prod');
  const lyrSlider = modalOverlay.querySelector('#pub-rate-lyr');
  const vibeSlider = modalOverlay.querySelector('#pub-rate-vibe');

  if (prodSlider) prodSlider.addEventListener('input', e => modalOverlay.querySelector('#val-prod').textContent = e.target.value);
  if (lyrSlider) lyrSlider.addEventListener('input', e => modalOverlay.querySelector('#val-lyr').textContent = e.target.value);
  if (vibeSlider) vibeSlider.addEventListener('input', e => modalOverlay.querySelector('#val-vibe').textContent = e.target.value);

  // Close handlers
  const closeBtn = modalOverlay.querySelector('#pub-close-btn');
  const cancelBtn = modalOverlay.querySelector('#pub-cancel-btn');
  if (closeBtn) closeBtn.addEventListener('click', onClose);
  if (cancelBtn) cancelBtn.addEventListener('click', onClose);

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) onClose();
  });

  // Export JSON helper
  const exportBtn = modalOverlay.querySelector('#pub-export-btn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const postObj = buildPostObjectFromForm(modalOverlay);
      navigator.clipboard.writeText(JSON.stringify(postObj, null, 2));
      exportBtn.innerHTML = `<i data-lucide="check"></i> JSON Copied!`;
      setTimeout(() => {
        exportBtn.innerHTML = `<i data-lucide="code"></i> Copy Post JSON`;
        if (window.lucide) window.lucide.createIcons();
      }, 2000);
    });
  }

  // Form Submit
  const form = modalOverlay.querySelector('#publisher-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const newPost = buildPostObjectFromForm(modalOverlay);
    onSave(newPost);
    onClose();
  });

  containerEl.appendChild(modalOverlay);

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function buildPostObjectFromForm(modalOverlay) {
  const category = modalOverlay.querySelector('#pub-category').value;
  let categoryLabel = '📝 In-Depth Review';
  if (category === 'new_music') categoryLabel = '🔥 New Music';
  if (category === 'hidden_gem') categoryLabel = '💎 Hidden Gem';

  const prodScore = parseFloat(modalOverlay.querySelector('#pub-rate-prod').value);
  const lyrScore = parseFloat(modalOverlay.querySelector('#pub-rate-lyr').value);
  const vibeScore = parseFloat(modalOverlay.querySelector('#pub-rate-vibe').value);
  const overall = ((prodScore + lyrScore + vibeScore) / 3).toFixed(1);

  return {
    id: `post-custom-${Date.now()}`,
    featured: false,
    category,
    categoryLabel,
    artist: modalOverlay.querySelector('#pub-artist').value.trim(),
    album: modalOverlay.querySelector('#pub-album').value.trim(),
    releaseDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    genre: modalOverlay.querySelector('#pub-genre').value.trim() || 'Indie / Electronic',
    coverUrl: modalOverlay.querySelector('#pub-cover').value.trim() || 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=1000&auto=format&fit=crop',
    excerpt: modalOverlay.querySelector('#pub-excerpt').value.trim(),
    reviewBody: modalOverlay.querySelector('#pub-review').value.trim(),
    ratings: {
      production: prodScore,
      lyrics: lyrScore,
      vibe: vibeScore,
      overall: parseFloat(overall)
    },
    spotifyUrl: modalOverlay.querySelector('#pub-spotify').value.trim() || null,
    appleMusicUrl: modalOverlay.querySelector('#pub-apple').value.trim() || null,
    keyTracks: [
      { name: "Focus Track", note: "Recommended" }
    ]
  };
}
