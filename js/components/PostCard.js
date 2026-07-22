/**
 * PostCard component for rendering album review cards in the main grid
 */

export function createPostCard(post, { onPostClick }) {
  const card = document.createElement('article');
  card.className = 'post-card';

  // Category badge class
  let badgeClass = 'badge-indepth';
  if (post.category === 'new_music') badgeClass = 'badge-new-music';
  if (post.category === 'hidden_gem') badgeClass = 'badge-hidden-gem';

  card.innerHTML = `
    <div class="card-header">
      <img src="${post.coverUrl}" alt="${post.album}" class="card-cover-img" loading="lazy" />
      
      <div class="card-category-tag">
        <span class="badge ${badgeClass}">${post.categoryLabel}</span>
      </div>

      <div class="card-rating-badge">
        <span class="rating-pill">
          <i data-lucide="star"></i>
          <span>${post.ratings?.overall || '9.0'}</span>
        </span>
      </div>
    </div>

    <div class="card-body">
      <span class="card-artist-name">${post.artist}</span>
      <h3 class="card-album-title">${post.album}</h3>
      <p class="card-excerpt">${post.excerpt}</p>

      <div class="card-footer">
        <span class="card-genre">${post.genre}</span>
        
        <div class="card-streaming-links">
          ${post.spotifyUrl ? `
            <a href="${post.spotifyUrl}" target="_blank" rel="noopener noreferrer" class="card-stream-icon spotify" title="Listen on Spotify" onclick="event.stopPropagation()">
              <i data-lucide="music"></i>
            </a>
          ` : ''}
          ${post.appleMusicUrl ? `
            <a href="${post.appleMusicUrl}" target="_blank" rel="noopener noreferrer" class="card-stream-icon apple" title="Listen on Apple Music" onclick="event.stopPropagation()">
              <i data-lucide="disc"></i>
            </a>
          ` : ''}
        </div>
      </div>
    </div>
  `;

  card.addEventListener('click', () => onPostClick(post));

  return card;
}
