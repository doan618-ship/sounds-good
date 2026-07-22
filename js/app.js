/**
 * SoundVault App - Core Controller & State Management
 */

import { INITIAL_POSTS } from './data/posts.js';
import { renderNavbar } from './components/Navbar.js';
import { renderHero } from './components/HeroSection.js';
import { renderFilterBar } from './components/FilterBar.js';
import { createPostCard } from './components/PostCard.js';
import { renderPostDetailModal } from './components/PostDetailModal.js';
import { renderPostPublisherModal } from './components/PostPublisherModal.js';
import { renderFooter } from './components/Footer.js';

class AppController {
  constructor() {
    this.posts = this.loadPosts();
    this.activeCategory = 'all';
    this.activeGenre = '';
    this.searchQuery = '';
    this.sortBy = 'latest';
    this.selectedPost = null;
    this.isPublisherOpen = false;

    this.initDOM();
    this.bindGlobalEvents();
    this.render();
  }

  loadPosts() {
    const saved = localStorage.getItem('soundvault_custom_posts');
    if (saved) {
      try {
        const customPosts = JSON.parse(saved);
        return [...customPosts, ...INITIAL_POSTS];
      } catch (e) {
        console.error('Failed to parse custom posts', e);
      }
    }
    return [...INITIAL_POSTS];
  }

  saveCustomPost(newPost) {
    const customPosts = JSON.parse(localStorage.getItem('soundvault_custom_posts') || '[]');
    customPosts.unshift(newPost);
    localStorage.setItem('soundvault_custom_posts', JSON.stringify(customPosts));
    
    this.posts.unshift(newPost);
    this.render();
  }

  initDOM() {
    this.navbarEl = document.getElementById('navbar-root');
    this.heroEl = document.getElementById('hero-root');
    this.filterEl = document.getElementById('filter-root');
    this.gridEl = document.getElementById('grid-root');
    this.sectionTitleEl = document.getElementById('section-title');
    this.resultsCountEl = document.getElementById('results-count');
    this.sortSelectEl = document.getElementById('sort-select');
    this.emptyStateEl = document.getElementById('empty-state');
    this.resetFiltersBtn = document.getElementById('reset-filters-btn');
    this.footerEl = document.getElementById('footer-root');
    this.modalEl = document.getElementById('modal-root');
  }

  bindGlobalEvents() {
    if (this.sortSelectEl) {
      this.sortSelectEl.addEventListener('change', (e) => {
        this.sortBy = e.target.value;
        this.renderGrid();
      });
    }

    if (this.resetFiltersBtn) {
      this.resetFiltersBtn.addEventListener('click', () => {
        this.activeCategory = 'all';
        this.activeGenre = '';
        this.searchQuery = '';
        const searchInput = document.getElementById('search-input');
        if (searchInput) searchInput.value = '';
        this.render();
      });
    }
  }

  getFilteredPosts() {
    return this.posts.filter(post => {
      // Category Filter
      if (this.activeCategory !== 'all' && post.category !== this.activeCategory) {
        return false;
      }

      // Genre Filter
      if (this.activeGenre && post.genre !== this.activeGenre) {
        return false;
      }

      // Search Query Filter
      if (this.searchQuery) {
        const q = this.searchQuery.toLowerCase();
        const titleMatch = post.album.toLowerCase().includes(q);
        const artistMatch = post.artist.toLowerCase().includes(q);
        const genreMatch = post.genre.toLowerCase().includes(q);
        const textMatch = (post.reviewBody || '').toLowerCase().includes(q) || post.excerpt.toLowerCase().includes(q);
        if (!titleMatch && !artistMatch && !genreMatch && !textMatch) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (this.sortBy === 'highest_rated') {
        return (b.ratings?.overall || 0) - (a.ratings?.overall || 0);
      }
      if (this.sortBy === 'oldest') {
        return new Date(a.releaseDate) - new Date(b.releaseDate);
      }
      // default: latest
      return new Date(b.releaseDate) - new Date(a.releaseDate);
    });
  }

  render() {
    // 1. Render Navbar
    renderNavbar(this.navbarEl, {
      onSearch: (query) => {
        this.searchQuery = query;
        this.renderGrid();
      },
      onCreateClick: () => {
        this.isPublisherOpen = true;
        this.renderModals();
      },
      onBrandClick: () => {
        this.activeCategory = 'all';
        this.activeGenre = '';
        this.searchQuery = '';
        this.render();
      }
    });

    // 2. Render Hero Spotlight (Uses explicit featured post or first post)
    const featured = this.posts.find(p => p.featured) || this.posts[0];
    renderHero(this.heroEl, featured, {
      onPostClick: (post) => {
        this.selectedPost = post;
        this.renderModals();
      }
    });

    // 3. Render Filter Bar
    renderFilterBar(this.filterEl, {
      activeCategory: this.activeCategory,
      activeGenre: this.activeGenre,
      onCategoryChange: (cat) => {
        this.activeCategory = cat;
        this.renderGrid();
        this.renderFilterBarOnly();
      },
      onGenreChange: (genre) => {
        this.activeGenre = genre;
        this.renderGrid();
        this.renderFilterBarOnly();
      }
    });

    // 4. Render Grid & Header
    this.renderGrid();

    // 5. Render Footer
    renderFooter(this.footerEl);

    // 6. Render Modals
    this.renderModals();
  }

  renderFilterBarOnly() {
    renderFilterBar(this.filterEl, {
      activeCategory: this.activeCategory,
      activeGenre: this.activeGenre,
      onCategoryChange: (cat) => {
        this.activeCategory = cat;
        this.renderGrid();
        this.renderFilterBarOnly();
      },
      onGenreChange: (genre) => {
        this.activeGenre = genre;
        this.renderGrid();
        this.renderFilterBarOnly();
      }
    });
  }

  renderGrid() {
    const filtered = this.getFilteredPosts();

    // Section title update
    if (this.sectionTitleEl) {
      if (this.activeCategory === 'new_music') this.sectionTitleEl.textContent = '🔥 New Music Radar';
      else if (this.activeCategory === 'hidden_gem') this.sectionTitleEl.textContent = '💎 Hidden Gems';
      else if (this.activeCategory === 'indepth') this.sectionTitleEl.textContent = '📝 In-Depth Reviews';
      else this.sectionTitleEl.textContent = 'Latest Discoveries';
    }

    if (this.resultsCountEl) {
      this.resultsCountEl.textContent = `${filtered.length} ${filtered.length === 1 ? 'post' : 'posts'}`;
    }

    // Clear grid
    this.gridEl.innerHTML = '';

    if (filtered.length === 0) {
      this.emptyStateEl.classList.remove('hidden');
    } else {
      this.emptyStateEl.classList.add('hidden');

      filtered.forEach(post => {
        const card = createPostCard(post, {
          onPostClick: (selected) => {
            this.selectedPost = selected;
            this.renderModals();
          }
        });
        this.gridEl.appendChild(card);
      });
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  renderModals() {
    this.modalEl.innerHTML = '';

    if (this.selectedPost) {
      renderPostDetailModal(this.modalEl, this.selectedPost, {
        onClose: () => {
          this.selectedPost = null;
          this.renderModals();
        }
      });
    } else if (this.isPublisherOpen) {
      renderPostPublisherModal(this.modalEl, {
        onSave: (newPost) => {
          this.saveCustomPost(newPost);
        },
        onClose: () => {
          this.isPublisherOpen = false;
          this.renderModals();
        }
      });
    }
  }
}

// Initialize App when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.app = new AppController();
});
