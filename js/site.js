/**
 * Loads site content from site-config.json and renders the homepage.
 * Edit site-config.json to update your bio, photo, and blog posts.
 */

(function () {
  function formatDate(dateStr) {
    if (!dateStr || String(dateStr).toLowerCase() === 'coming soon') return 'Coming soon';
    const date = new Date(dateStr + 'T12:00:00');
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  function isComingSoon(dateStr) {
    return !dateStr || String(dateStr).toLowerCase() === 'coming soon';
  }

  function getYouTubeVideoId(url) {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s?]+)/);
    return match ? match[1] : null;
  }

  function getPreviewImage(item) {
    const type = (item.type || 'blog').toLowerCase();
    const url = item.url || '';

    if (item.image) return item.image;
    if (type === 'youtube') {
      const videoId = getYouTubeVideoId(url);
      return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;
    }
    return null;
  }

  function renderSwipeSlide(item, index) {
    const type = (item.type || 'blog').toLowerCase();
    const title = item.title || 'View';
    const url = item.url || '#';
    const previewSrc = getPreviewImage(item);

    const typeLabels = { youtube: 'YouTube', x: 'X', instagram: 'Instagram', blog: 'Article', podcast: 'Podcast' };
    const label = typeLabels[type] || 'Link';

    return `
      <div class="carousel-slide swipe-tile" data-index="${index}">
        <a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer" class="swipe-tile-link">
          <div class="swipe-tile-preview">
            ${previewSrc
              ? `<img src="${escapeHtml(previewSrc)}" alt="" loading="lazy" onerror="this.style.display='none';this.nextElementSibling?.classList.remove('hidden')">`
              : ''}
            <div class="swipe-tile-placeholder ${previewSrc ? 'hidden' : ''}">
              <span class="swipe-tile-icon">${type === 'youtube' ? '▶' : type === 'x' ? '𝕏' : type === 'instagram' ? '📷' : type === 'podcast' ? '🎙' : '📄'}</span>
            </div>
          </div>
          <div class="swipe-tile-info">
            <span class="swipe-tile-title">${escapeHtml(title)}</span>
            <span class="swipe-tile-label">${label}</span>
          </div>
        </a>
      </div>
    `;
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  const TILES_PER_VIEW = 3;

  function initSwipeFileCarousel(items) {
    const track = document.getElementById('carousel-track');
    const dotsContainer = document.getElementById('carousel-dots');
    if (!track || !dotsContainer) return;

    const duplicatedItems = [...items, ...items];
    track.innerHTML = duplicatedItems.map((item, i) => renderSwipeSlide(item, i)).join('');
    track.classList.add('carousel-track--continuous');

    dotsContainer.style.display = 'none';
  }

  function renderSwipeFileListItem(item) {
    const type = (item.type || 'blog').toLowerCase();
    const title = item.title || 'Untitled';
    const url = item.url;
    const text = item.text || item.quote;

    const typeLabels = { youtube: 'YouTube', x: 'X', instagram: 'Instagram', blog: 'Article', podcast: 'Podcast', quote: 'Quote', highlight: 'Highlight' };
    const label = typeLabels[type] || 'Link';

    if (text && (type === 'quote' || type === 'highlight')) {
      return `
        <div class="swipe-file-list-item swipe-file-list-item--text">
          <span class="swipe-file-list-label">${escapeHtml(label)}</span>
          <blockquote class="swipe-file-list-quote">${escapeHtml(text)}</blockquote>
          ${url ? `<a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer" class="swipe-file-list-source">Source</a>` : ''}
        </div>
      `;
    }

    if (url) {
      return `
        <div class="swipe-file-list-item">
          <a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer" class="swipe-file-list-link">
            <span class="swipe-file-list-title">${escapeHtml(title)}</span>
            <span class="swipe-file-list-label">${escapeHtml(label)}</span>
          </a>
        </div>
      `;
    }

    return `
      <div class="swipe-file-list-item">
        <span class="swipe-file-list-title">${escapeHtml(title)}</span>
        <span class="swipe-file-list-label">${escapeHtml(label)}</span>
      </div>
    `;
  }

  function initViewAllSwipeFile(items, viewAllLabel, hideLabel) {
    const btn = document.getElementById('view-all-swipe-btn');
    const listEl = document.getElementById('swipe-file-full-list');
    if (!btn || !listEl) return;

    viewAllLabel = viewAllLabel || 'View all';
    hideLabel = hideLabel || 'Hide';

    listEl.innerHTML = items.map((item) => renderSwipeFileListItem(item)).join('');
    btn.textContent = viewAllLabel;

    btn.addEventListener('click', () => {
      const isExpanded = !listEl.classList.contains('hidden');
      listEl.classList.toggle('hidden', isExpanded);
      listEl.setAttribute('aria-hidden', isExpanded);
      btn.textContent = isExpanded ? viewAllLabel : hideLabel;
    });
  }

  function renderPostList(items, basePath, listEl) {
    // Sort by date: real dates newest first, then "coming soon" at the end
    const sorted = [...items].sort((a, b) => {
      const aSoon = isComingSoon(a.date);
      const bSoon = isComingSoon(b.date);
      if (aSoon && bSoon) return 0;
      if (aSoon) return 1;
      if (bSoon) return -1;
      return new Date(b.date) - new Date(a.date);
    });

    listEl.innerHTML = sorted
      .map(
        (item) => {
          const soon = isComingSoon(item.date);
          return `<li${soon ? ' class="post-coming-soon"' : ''}>
            <a href="${basePath}/${item.slug}.html">${escapeHtml(item.title)}</a>
            <time datetime="${soon ? '' : item.date}" class="post-date">${formatDate(item.date)}</time>
          </li>`;
        }
      )
      .join('');
  }

  function init() {
    fetch('site-config.json?v=' + Date.now())
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load config');
        return res.json();
      })
      .then((config) => {
        const s = config.sections || {};
        const defaults = {
          siteName: 'Bryan Hadeli',
          pageTitle: 'Bryan Hadeli',
          bio: '',
          profileImage: 'images/profile.png',
          lifePrinciples: { title: 'Life Principles', blurb: '', posts: [] },
          workAndBusiness: { title: 'Work and business', blurb: '', posts: [] },
          swipeFile: { title: 'My Swipe File', blurb: '', viewAllLabel: 'View all', hideLabel: 'Hide', items: [] }
        };

        const life = { ...defaults.lifePrinciples, ...s.lifePrinciples };
        const work = { ...defaults.workAndBusiness, ...s.workAndBusiness };
        const swipe = { ...defaults.swipeFile, ...s.swipeFile };

        document.title = config.pageTitle || config.siteName || defaults.pageTitle;
        const nameEl = document.getElementById('name');
        if (nameEl) nameEl.textContent = config.name || '';
        const bioEl = document.getElementById('bio');
        if (bioEl) bioEl.textContent = config.bio || '';
        const introNoteEl = document.getElementById('intro-note');
        const introNote2El = document.getElementById('intro-note-2');
        const introBlurbEl = document.querySelector('.intro-blurb');
        if (introNoteEl && (config.introNote1 || config.introNote)) {
          introNoteEl.innerHTML = (config.introNote1 || config.introNote || '').replace(/bryanjamesgunawan@gmail\.com/g, '<a href="mailto:bryanjamesgunawan@gmail.com">bryanjamesgunawan@gmail.com</a>');
        }
        if (introNote2El && (config.introNote2 || config.introNote)) {
          introNote2El.innerHTML = (config.introNote2 || config.introNote || '').replace(/bryanjamesgunawan@gmail\.com/g, '<a href="mailto:bryanjamesgunawan@gmail.com">bryanjamesgunawan@gmail.com</a>');
        }
        if (introBlurbEl) {
          introBlurbEl.style.display = (config.introNote1 || config.introNote2 || config.introNote) ? '' : 'none';
        }

        const imgEl = document.getElementById('profile-image');
        if (imgEl) {
          imgEl.src = (config.profileImage || defaults.profileImage) + '?t=' + Date.now();
          imgEl.onerror = function () {
            this.onerror = null;
            this.src = 'images/placeholder.svg';
          };
        }

        const lifeTitle = document.getElementById('life-principles-title');
        if (lifeTitle) lifeTitle.textContent = life.title;
        const lifeBlurb = document.getElementById('life-principles-blurb');
        if (lifeBlurb) lifeBlurb.textContent = life.blurb || '';
        const lifeList = document.getElementById('life-principles-list');
        if (lifeList) renderPostList(life.posts, 'life-principles', lifeList);

        const workTitle = document.getElementById('work-business-title');
        if (workTitle) workTitle.textContent = work.title;
        const workBlurb = document.getElementById('work-business-blurb');
        if (workBlurb) workBlurb.textContent = work.blurb || '';
        const workList = document.getElementById('work-business-list');
        if (workList) renderPostList(work.posts, 'work-and-business', workList);

        const swipeTitle = document.getElementById('swipe-file-title');
        if (swipeTitle) swipeTitle.textContent = swipe.title;
        const swipeBlurb = document.getElementById('swipe-file-blurb');
        if (swipeBlurb) swipeBlurb.textContent = swipe.blurb || '';

        if (swipe.items && swipe.items.length > 0) {
          document.querySelector('.swipe-file-section')?.classList.remove('hidden');
          const urlItems = swipe.items.filter((i) => i.url);
          if (urlItems.length > 0) {
            initSwipeFileCarousel(urlItems);
          } else {
            document.querySelector('.swipe-file-section .carousel')?.classList.add('hidden');
          }
          initViewAllSwipeFile(swipe.items, swipe.viewAllLabel, swipe.hideLabel);
        } else {
          document.querySelector('.swipe-file-section')?.classList.add('hidden');
        }
      })
      .catch((err) => {
        console.error(err);
        document.getElementById('bio').textContent =
          'Could not load config. Edit site-config.json and ensure you view the site via a web server (e.g. python -m http.server).';
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
