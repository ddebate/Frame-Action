/* Frame Action — main.js */

document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const dropdownItems = document.querySelectorAll('.nav__item--dropdown');

  // Sticky nav shadow on scroll
  window.addEventListener('scroll', () => {
    nav.classList.toggle('nav--scrolled', window.scrollY > 8);
  }, { passive: true });

  // Mobile menu toggle
  navToggle?.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-open');
    navToggle.classList.toggle('is-active', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Mobile dropdown toggles
  dropdownItems.forEach(item => {
    item.querySelector('a')?.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        item.classList.toggle('is-open');
      }
    });
  });

  // Close menu on outside click
  document.addEventListener('click', (e) => {
    if (navMenu?.classList.contains('is-open') && !nav.contains(e.target)) {
      navMenu.classList.remove('is-open');
      navToggle?.classList.remove('is-active');
      navToggle?.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  // Close menu on resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navMenu?.classList.contains('is-open')) {
      navMenu.classList.remove('is-open');
      navToggle?.classList.remove('is-active');
      document.body.style.overflow = '';
    }
  });

  // Contact form submission (Formspree integration)
  const form = document.getElementById('contactForm');
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    const formData = new FormData(form);
    btn.textContent = 'Sending...';
    btn.disabled = true;

    try {
      // Replace YOUR_FORMSPREE_ID with your actual Formspree form ID
      const res = await fetch('https://formspree.io/f/YOUR_FORMSPREE_ID', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' }
      });

      if (res.ok) {
        form.innerHTML = `
          <div style="text-align:center;padding:2rem 0;">
            <div style="width:56px;height:56px;background:var(--accent-light);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 1rem;color:var(--accent);">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 13l4 4L19 7"/></svg>
            </div>
            <h3 style="margin-bottom:.5rem;">Message Sent!</h3>
            <p>We'll be in touch within one business day to schedule your free demo.</p>
          </div>`;
      } else {
        throw new Error('Form submission failed');
      }
    } catch {
      btn.textContent = 'Send Message';
      btn.disabled = false;
      alert('Something went wrong. Please try again or email us directly.');
    }
  });
});
