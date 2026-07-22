/**
 * Navbar component with brand logo, live search, and post creator CTA
 */

export function renderNavbar(containerEl, { onSearch, onCreateClick, onBrandClick }) {
  containerEl.innerHTML = `
    <div class="navbar-container">
      <!-- Brand Logo -->
      <a class="brand-logo" id="brand-link">
        <div class="brand-icon">
          <i data-lucide="disc-3"></i>
        </div>
        <div>
          <span class="brand-name">SoundVault</span>
          <span class="brand-tag">Music Space</span>
        </div>
      </a>

      <!-- Live Search Box -->
      <div class="search-box">
        <i data-lucide="search" class="search-icon"></i>
        <input 
          type="text" 
          id="search-input" 
          class="search-input" 
          placeholder="Search by artist, album, genre, or review..."
          autocomplete="off"
        />
      </div>

      <!-- Action Buttons -->
      <div class="navbar-actions">
        <button id="create-post-btn" class="btn btn-primary">
          <i data-lucide="plus-circle"></i>
          <span>Add Review</span>
        </button>
      </div>
    </div>
  `;

  // Attach event listeners
  const searchInput = containerEl.querySelector('#search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => onSearch(e.target.value.trim()));
  }

  const createBtn = containerEl.querySelector('#create-post-btn');
  if (createBtn) {
    createBtn.addEventListener('click', onCreateClick);
  }

  const brandLink = containerEl.querySelector('#brand-link');
  if (brandLink) {
    brandLink.addEventListener('click', (e) => {
      e.preventDefault();
      onBrandClick();
    });
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }
}
