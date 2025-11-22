// Sample data with websites
let websites = JSON.parse(localStorage.getItem('websites')) || [
  {
    id: 1,
    name: 'Portfolio 1',
    description: 'Beautiful personal portfolio website',
    category: 'portfolio',
    url: 'https://example1.com',
    thumbnail: '🎨',
    date: new Date().toLocaleDateString()
  }
];

// Load websites on page load
document.addEventListener('DOMContentLoaded', function() {
  loadWebsites();
  setupEventListeners();
});

function setupEventListeners() {
  // Search functionality
  const searchBtn = document.getElementById('searchBtn');
  const searchBar = document.getElementById('searchBar');
  
  if (searchBtn) {
    searchBtn.addEventListener('click', searchWebsites);
  }
  if (searchBar) {
    searchBar.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') searchWebsites();
    });
  }
  
  // Filter buttons
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      filterWebsites(this.dataset.filter);
    });
  });
}

function loadWebsites() {
  const gallery = document.getElementById('websiteGallery');
  if (!gallery) return;
  
  gallery.innerHTML = '';
  
  if (websites.length === 0) {
    gallery.innerHTML = '<div class="loading">No websites yet. Be the first to upload!</div>';
    return;
  }
  
  websites.forEach(site => {
    const card = createWebsiteCard(site);
    gallery.appendChild(card);
  });
}

function createWebsiteCard(site) {
  const div = document.createElement('div');
  div.className = 'website-card';
  div.dataset.category = site.category;
  
  div.innerHTML = `
    <div class="website-thumbnail">${site.thumbnail || '🌐'}</div>
    <div class="website-info">
      <h3 class="website-name">${site.name}</h3>
      <p class="website-description">${site.description}</p>
      <div class="website-meta">
        <span class="website-category">${site.category}</span>
        <span class="website-date">${site.date}</span>
      </div>
      <div class="website-actions">
        <a href="${site.url}" target="_blank" class="btn-visit">Visit Site</a>
        <button class="btn-preview" onclick="previewWebsite('${site.url}')">Preview</button>
      </div>
    </div>
  `;
  
  return div;
}

function searchWebsites() {
  const query = document.getElementById('searchBar').value.toLowerCase();
  const cards = document.querySelectorAll('.website-card');
  
  cards.forEach(card => {
    const name = card.querySelector('.website-name').textContent.toLowerCase();
    const desc = card.querySelector('.website-description').textContent.toLowerCase();
    
    if (name.includes(query) || desc.includes(query)) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
}

function filterWebsites(category) {
  const cards = document.querySelectorAll('.website-card');
  
  cards.forEach(card => {
    if (category === 'all' || card.dataset.category === category) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
}

function previewWebsite(url) {
  alert('Preview for: ' + url + '\n(In production, this would open a modal with the website)');
}
