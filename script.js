// EDIT BUSINESS DETAILS HERE
const BUSINESS = {
  name: "Reddy’s Meals & Curry Point",
  primaryPhone: "7032920843",
  secondaryPhone: "9908365217",
  whatsappPhone: "917032920843",
  whatsappMessage: "Hello Reddy’s Meals & Curry Point, I would like to place an order.",
  address: "3/152, Santhi Nagar, Uppal, Hyderabad, Telangana 500039",
  googleMapsUrl: "https://maps.google.com/?cid=10273575392348699832",
  appleMapsUrl: "https://maps.apple.com/place?address=3/152,%20Santhi%20Nagar,%20Uppal,%20Hyderabad,%20500039,%20Telangana,%20India&coordinate=17.400473,78.570505&name=Reddy%20Meals%20%26%20Curries%20Point&place-id=I8BC856D1BE8C68D4&map=explore"
};

// ONLY THESE TWO MOBILE NUMBERS ARE AUTHORIZED TO LOG IN AS ADMIN
const AUTHORIZED_ADMIN_PHONES = [
  "7032920843",
  "9908365217"
];

// DEFAULT MASTER MENU
const DEFAULT_MENU = [
  {id:"veg-meals",name:"Veg Meals",category:"meals",type:"veg",description:"Fresh and wholesome vegetarian meals prepared with authentic Indian flavors.",price:100,image:"assets/veg-meals.jpg",emoji:"🍛",availability:true},
  {id:"non-veg-meals",name:"Non-Veg Meals",category:"meals",type:"non-veg",description:"Delicious non-vegetarian meals with flavorful curry and rice.",price:120,image:"assets/curry-spread.jpg",emoji:"🍗",availability:true},
  {id:"chicken-meals",name:"Chicken Meals",category:"meals",type:"non-veg",description:"Tender chicken curry served with rice and accompaniments.",price:120,image:"assets/chicken-curry.jpg",emoji:"🍗",availability:true},
  {id:"fish-meals",name:"Fish Meals",category:"meals",type:"non-veg",description:"Fresh fish curry served with rice and accompaniments.",price:120,image:"assets/fish-curry.jpg",emoji:"🐟",availability:true},
  {id:"boti-meals",name:"Boti Meals",category:"meals",type:"non-veg",description:"Flavorful boti curry served with rice and accompaniments.",price:120,image:"assets/boti-curry.jpg",emoji:"🍢",availability:true},
  {id:"egg-meals",name:"Egg Meals",category:"meals",type:"non-veg",description:"Tasty egg curry served with rice and accompaniments.",price:120,image:"assets/egg-curry.jpg",emoji:"🥚",availability:true},
  {id:"veg-curry",name:"Veg Currys",category:"veg",type:"veg",description:"Freshly prepared vegetarian curry with authentic Indian spices and flavors.",price:30,image:"assets/potato-curry.jpg",emoji:"🥘",availability:true},
  {id:"chicken-biryani",name:"Chicken Biryani",category:"biryani",type:"non-veg",description:"Aromatic chicken biryani prepared with flavorful spices and rice.",price:120,image:"assets/chicken-biryani.jpg",emoji:"🍗",availability:true}
];

// MENU PERSISTENCE IN LOCALSTORAGE
const STORAGE_KEY   = 'reddys_menu_items';
const VERSION_KEY   = 'reddys_menu_version';
const MENU_VERSION  = 'v4'; // bump this whenever DEFAULT_MENU images/items change

function getStoredMenu() {
  try {
    if (localStorage.getItem(VERSION_KEY) !== MENU_VERSION) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_MENU));
      localStorage.setItem(VERSION_KEY, MENU_VERSION);
      return DEFAULT_MENU;
    }
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_MENU));
      return DEFAULT_MENU;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
  } catch (e) {
    console.error("Failed to read menu from localStorage:", e);
  }
  return DEFAULT_MENU;
}

function saveStoredMenu(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event('reddysMenuUpdated'));
    return true;
  } catch (e) {
    console.error("Failed to save menu to localStorage:", e);
    return false;
  }
}

function resetMenuToDefault() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_MENU));
  window.dispatchEvent(new Event('reddysMenuUpdated'));
  return DEFAULT_MENU;
}

// ACTIVE MENU INSTANCE
let MENU = getStoredMenu();

const $ = (s, ctx = document) => ctx.querySelector(s);
const $$ = (s, ctx = document) => [...ctx.querySelectorAll(s)];
const money = n => (n == null ? "Price: Ask Us" : `₹${n}`);
const tel = n => `tel:+91${n}`;

function hydrateBusiness() {
  $$('[data-call="primary"]').forEach(el => el.href = tel(BUSINESS.primaryPhone));
  $$('[data-call="secondary"]').forEach(el => el.href = tel(BUSINESS.secondaryPhone));
  $$('[data-phone-text="primary"]').forEach(el => el.textContent = BUSINESS.primaryPhone);
  $$('[data-phone-text="secondary"]').forEach(el => el.textContent = BUSINESS.secondaryPhone);
}

function card(item, index = 0) {
  const isAvailable = item.availability !== false;
  const isVeg = item.type === "veg";
  const delay = (index * 0.07).toFixed(2);
  return `
    <article class="menu-card glass-card reveal ${isAvailable ? 'is-available' : 'is-unavailable'}" data-category="${item.category}" data-type="${item.type}" style="--d:${delay}s">
      <div class="menu-thumb">
        <img src="${item.image || 'assets/curry-spread.jpg'}" loading="lazy" width="480" height="300" alt="${item.name} at Reddy's Meals & Curry Point">
        <span class="food-emoji" aria-hidden="true">${item.emoji || (isVeg ? '🥗' : '🍗')}</span>
        <span class="stock-badge ${isAvailable ? 'badge-avail' : 'badge-sold'}">
          ${isAvailable ? '✓ Available Today' : '✕ Sold Out Today'}
        </span>
      </div>
      <div class="menu-body">
        <div class="menu-meta">
          <h3>${item.name}</h3>
          <span class="price">${money(item.price)}</span>
        </div>
        <p>${item.description || ''}</p>
        <div class="card-footer-action">
          ${isAvailable 
            ? `<span class="card-walkin">🚶 Visit our store to enjoy</span>`
            : `<span class="card-unavailable">Currently Not Available</span>`
          }
        </div>
      </div>
    </article>
  `;
}

function renderMenu(filter = "all") {
  const grid = $('#menu-grid');
  if (!grid) return;
  MENU = getStoredMenu();
  
  let items = MENU;
  if (filter === "today") {
    items = items.filter(i => i.availability);
  } else if (filter === "veg" || filter === "non-veg") {
    items = items.filter(i => i.type === filter);
  } else if (filter !== "all") {
    items = items.filter(i => i.category === filter);
  }
  
  if (items.length === 0) {
    grid.innerHTML = `<div class="empty-menu glass-card"><p>No items found in this category today.</p></div>`;
    return;
  }
  
  grid.innerHTML = items.map((item, idx) => card(item, idx)).join('');
  
  // Re-observe and initialize 3D tilt for newly injected cards
  setTimeout(() => {
    observeReveal();
    initGlassTilt();
  }, 30);
}

// ── SCROLL REVEAL OBSERVER ──────────────────────────────────
let revealObserver = null;
function initRevealObserver() {
  if (revealObserver) {
    revealObserver.disconnect();
  }
  revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
}

function observeReveal() {
  if (!revealObserver) initRevealObserver();
  $$('.reveal:not(.visible)').forEach(el => revealObserver.observe(el));
}

// ── 3D LITE LIQUID GLASS TILT INTERACTION ───────────────────
function initGlassTilt() {
  // Only apply interactive tilt on fine pointer (mouse/trackpad) devices
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const cards = $$('.glass-card, .menu-card, .price-row > div, .hero-img-wrap');
  cards.forEach(c => {
    if (c._hasTilt) return;
    c._hasTilt = true;

    c.addEventListener('mousemove', e => {
      const rect = c.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * -5;
      const rotY = ((x - cx) / cx) * 5;

      c.style.transform = `perspective(900px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-6px)`;
    });

    c.addEventListener('mouseleave', () => {
      c.style.transform = '';
    });
  });
}

// ── NUMBER COUNTER ANIMATION ────────────────────────────────
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  if (isNaN(target)) return;
  const duration = 1600;
  const startTime = performance.now();

  function updateCount(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Smooth easeOutExpo curve
    const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    const current = Math.floor(easeOut * target);
    el.textContent = current;

    if (progress < 1) {
      requestAnimationFrame(updateCount);
    } else {
      el.textContent = target;
    }
  }

  requestAnimationFrame(updateCount);
}

const counterObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(e.target);
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.4 });

// ── ACTIVE NAVIGATION HIGHLIGHTER ───────────────────────────
function initActiveNav() {
  const sections = $$('main > section[id]');
  const navLinks = $$('.nav-links a');

  function updateActive() {
    const scrollPos = window.scrollY + 140;
    let currentId = 'home';

    if (window.scrollY > 220) {
      sections.forEach(sec => {
        const top = sec.offsetTop;
        const height = sec.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          currentId = sec.getAttribute('id');
        }
      });
    }

    navLinks.forEach(link => {
      const href = link.getAttribute('href').replace('#', '');
      link.classList.toggle('active-nav', href === currentId);
    });
  }

  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();
}

// Smooth scroll to top for all Home and Brand links
$$('a[href="#home"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (history.pushState) {
      history.pushState(null, null, '#home');
    }
  });
});

// ── INITIALIZATION ──────────────────────────────────────────
hydrateBusiness();
initRevealObserver();
renderMenu();
observeReveal();
initGlassTilt();
initActiveNav();

$$('.stat-num').forEach(el => counterObserver.observe(el));

// ── EVENT LISTENERS ─────────────────────────────────────────
// Mobile menu toggle
const menuToggle = $('.menu-toggle');
if (menuToggle) {
  menuToggle.addEventListener('click', e => {
    e.stopPropagation();
    const navLinks = $('#nav-links');
    if (!navLinks) return;
    const open = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

$$('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    const navLinks = $('#nav-links');
    if (navLinks) navLinks.classList.remove('open');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
  });
});

document.addEventListener('click', e => {
  const navLinks = $('#nav-links');
  if (navLinks && navLinks.classList.contains('open')) {
    if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
      navLinks.classList.remove('open');
      if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
    }
  }
});

// Category filter tabs with smooth auto-scroll to center on phones
const filtersEl = $('.filters');
if (filtersEl) {
  filtersEl.addEventListener('click', e => {
    const b = e.target.closest('[data-filter]');
    if (!b) return;
    $$('.filters button').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    
    // Auto scroll the selected filter into center on mobile devices
    if (window.innerWidth <= 768) {
      b.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
    
    renderMenu(b.dataset.filter);
  });
}

// Scroll Progress Bar & Header Shadow & Back-To-Top Button
const prog = document.getElementById('scroll-progress');
const header = document.querySelector('.site-header');
const backToTopBtn = document.getElementById('backToTop');

if (backToTopBtn) {
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

window.addEventListener('scroll', () => {
  const doc = document.documentElement;
  const total = doc.scrollHeight - doc.clientHeight;
  const pct = total > 0 ? (doc.scrollTop / total) * 100 : 0;
  
  if (prog) {
    prog.style.width = pct + '%';
  }
  if (header) {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }
  if (backToTopBtn) {
    backToTopBtn.classList.toggle('show', window.scrollY > 380);
  }
}, { passive: true });

// Listen for updates from other tabs
window.addEventListener('storage', e => {
  if (e.key === STORAGE_KEY) {
    MENU = getStoredMenu();
    renderMenu();
  }
});

window.addEventListener('reddysMenuUpdated', () => {
  MENU = getStoredMenu();
  renderMenu();
});
