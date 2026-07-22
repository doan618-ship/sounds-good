/**
 * FilterBar component for categories, genre tags, and sorting
 */

export function renderFilterBar(containerEl, { activeCategory, activeGenre, onCategoryChange, onGenreChange }) {
  const categories = [
    { id: 'all', label: 'All Reviews', icon: 'grid' },
    { id: 'new_music', label: '🔥 New Music', icon: 'flame' },
    { id: 'hidden_gem', label: '💎 Hidden Gem', icon: 'sparkles' },
    { id: 'indepth', label: '📝 In-Depth Review', icon: 'file-text' }
  ];

  const genres = [
    'All Genres',
    'Synthwave / Indie',
    'Neo-Folk / Ambient',
    'Future R&B / Soul',
    'Modern Classical / Post-Rock',
    'City Pop / Funk'
  ];

  containerEl.innerHTML = `
    <!-- Category Tabs -->
    <div class="category-tabs">
      ${categories.map(cat => `
        <button 
          class="tab-btn ${activeCategory === cat.id ? 'active' : ''}" 
          data-category="${cat.id}"
        >
          <i data-lucide="${cat.icon}"></i>
          <span>${cat.label}</span>
        </button>
      `).join('')}
    </div>

    <!-- Genre Tags Bar -->
    <div class="genre-tags-bar">
      <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600; margin-right: 0.25rem;">Genre:</span>
      ${genres.map(g => {
        const isAll = g === 'All Genres';
        const isActive = isAll ? !activeGenre : activeGenre === g;
        return `
          <button 
            class="genre-pill ${isActive ? 'active' : ''}" 
            data-genre="${isAll ? '' : g}"
          >
            ${g}
          </button>
        `;
      }).join('')}
    </div>
  `;

  // Attach tab listeners
  containerEl.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-category');
      onCategoryChange(cat);
    });
  });

  // Attach genre listeners
  containerEl.querySelectorAll('.genre-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const genre = pill.getAttribute('data-genre');
      onGenreChange(genre);
    });
  });

  if (window.lucide) {
    window.lucide.createIcons();
  }
}
