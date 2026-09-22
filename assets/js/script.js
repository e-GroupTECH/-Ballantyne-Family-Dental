document.getElementById('year').textContent = new Date().getFullYear();

// Sticky header shadow on scroll
const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  header.classList.toggle('is-scrolled', window.scrollY > 10);
});

// Mobile nav
const navToggle = document.getElementById('navToggle');
const mobileNav = document.getElementById('mobileNav');
const mobileNavClose = document.getElementById('mobileNavClose');

function openMobileNav() { mobileNav.classList.add('is-open'); document.body.style.overflow = 'hidden'; }
function closeMobileNav() { mobileNav.classList.remove('is-open'); document.body.style.overflow = ''; }

navToggle && navToggle.addEventListener('click', openMobileNav);
mobileNavClose && mobileNavClose.addEventListener('click', closeMobileNav);
mobileNav && mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobileNav));

// Scroll reveal (with safety net so content never stays hidden for
// tools/users that don't trigger a normal scroll, e.g. full-page capture)
const revealEls = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -5% 0px' });
  revealEls.forEach(el => revealObserver.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('is-visible'));
}
window.setTimeout(() => {
  revealEls.forEach(el => el.classList.add('is-visible'));
}, 2500);

// Showcase video play button
const showcaseVideo = document.getElementById('showcaseVideo');
const playBtn = document.getElementById('playBtn');
if (showcaseVideo && playBtn) {
  playBtn.addEventListener('click', () => {
    showcaseVideo.play();
    showcaseVideo.setAttribute('controls', '');
    playBtn.classList.add('is-playing');
  });
  showcaseVideo.addEventListener('pause', () => playBtn.classList.remove('is-playing'));
}

// Demo appointment form
const apptForm = document.getElementById('apptForm');
if (apptForm) {
  apptForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = apptForm.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Request Sent ✓';
    btn.disabled = true;
    setTimeout(() => { btn.textContent = original; btn.disabled = false; apptForm.reset(); }, 2600);
  });
}
