const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const revealElements = document.querySelectorAll('.reveal-up');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealElements.forEach((el) => revealObserver.observe(el));

const hero = document.querySelector('.hero');
const heroParallax = document.querySelector('[data-parallax]');

if (hero && heroParallax && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
  window.addEventListener(
    'scroll',
    () => {
      const rect = hero.getBoundingClientRect();
      const progress = Math.min(Math.max((window.innerHeight - rect.top) / (window.innerHeight + rect.height), 0), 1);
      const offset = (progress - 0.5) * 14;
      heroParallax.style.transform = `scale(1.03) translate3d(0, ${offset}px, 0)`;
    },
    { passive: true }
  );
}

const form = document.querySelector('.lead-form');
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    if (btn) {
      const original = btn.textContent;
      btn.textContent = 'Inquiry Received';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = original;
        btn.disabled = false;
        form.reset();
      }, 1800);
    }
  });
}
