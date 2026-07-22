/**
 * Footer component
 */

export function renderFooter(containerEl) {
  containerEl.innerHTML = `
    <div class="footer-container">
      <div style="display: flex; align-items: center; gap: 0.75rem;">
        <div class="brand-icon" style="width: 32px; height: 32px; font-size: 0.9rem;">
          <i data-lucide="disc-3"></i>
        </div>
        <div>
          <span style="font-weight: 800; font-family: var(--font-heading);">SoundVault</span>
          <span style="font-size: 0.75rem; color: var(--text-muted); display: block; margin-top: -2px;">Music Space Blog & Reviews</span>
        </div>
      </div>

      <div class="footer-copy">
        &copy; ${new Date().getFullYear()} SoundVault Music Space. Built for audio enthusiasts.
      </div>

      <div style="display: flex; gap: 0.75rem;">
        <a href="https://spotify.com" target="_blank" rel="noopener noreferrer" class="btn-icon" title="Spotify">
          <i data-lucide="music-2"></i>
        </a>
        <a href="https://music.apple.com" target="_blank" rel="noopener noreferrer" class="btn-icon" title="Apple Music">
          <i data-lucide="disc"></i>
        </a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="btn-icon" title="GitHub">
          <i data-lucide="github"></i>
        </a>
      </div>
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }
}
