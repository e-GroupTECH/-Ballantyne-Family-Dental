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

// If a video can't load or play in this environment, fall back to its
// poster image instead of leaving a blank box.
function handleVideoFallback(video) {
  video.addEventListener('error', () => video.classList.add('video-fallback'), true);
  video.addEventListener('stalled', () => {
    if (video.readyState < 2) video.classList.add('video-fallback');
  });
}
const heroVideo = document.getElementById('heroVideo');
if (heroVideo) handleVideoFallback(heroVideo);

// Showcase video play button
const showcaseVideo = document.getElementById('showcaseVideo');
const playBtn = document.getElementById('playBtn');
if (showcaseVideo && playBtn) {
  handleVideoFallback(showcaseVideo);
  playBtn.addEventListener('click', () => {
    showcaseVideo.play().catch(() => showcaseVideo.classList.add('video-fallback'));
    showcaseVideo.setAttribute('controls', '');
    playBtn.classList.add('is-playing');
  });
  showcaseVideo.addEventListener('pause', () => playBtn.classList.remove('is-playing'));
}

// Patient video testimonial carousel
const vcTrack = document.getElementById('vcTrack');
if (vcTrack) {
  const vcSlides = Array.from(vcTrack.querySelectorAll('.vc-slide'));
  const vcPrev = document.getElementById('vcPrev');
  const vcNext = document.getElementById('vcNext');
  const vcDotsWrap = document.getElementById('vcDots');
  const vcCounter = document.getElementById('vcCounter');
  let vcIndex = 0;

  vcSlides.forEach((slide, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', 'Go to video ' + (i + 1));
    dot.addEventListener('click', () => goTo(i));
    vcDotsWrap.appendChild(dot);

    const playBtn = slide.querySelector('.vc-play');
    playBtn.addEventListener('click', () => {
      const ytId = slide.getAttribute('data-yt');
      const iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube.com/embed/' + ytId + '?autoplay=1&rel=0';
      iframe.title = 'Patient testimonial video';
      iframe.allow = 'accelerate-encryption; autoplay; encrypted-media; picture-in-picture';
      iframe.allowFullscreen = true;
      slide.innerHTML = '';
      slide.appendChild(iframe);
    });
  });

  const vcDots = Array.from(vcDotsWrap.children);

  function render() {
    vcTrack.style.transform = 'translateX(-' + (vcIndex * 100) + '%)';
    vcDots.forEach((d, i) => d.classList.toggle('is-active', i === vcIndex));
    vcCounter.textContent = 'Slide ' + (vcIndex + 1) + ' of ' + vcSlides.length;
    vcPrev.disabled = vcIndex === 0;
    vcNext.disabled = vcIndex === vcSlides.length - 1;
  }
  function goTo(i) { vcIndex = Math.max(0, Math.min(vcSlides.length - 1, i)); render(); }

  vcPrev.addEventListener('click', () => goTo(vcIndex - 1));
  vcNext.addEventListener('click', () => goTo(vcIndex + 1));
  render();
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
