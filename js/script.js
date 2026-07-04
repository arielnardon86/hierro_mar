(function () {
  const WHATSAPP_NUMBER = '5492236930134';

  // Year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    nav.querySelectorAll('.nav__link').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Header background intensifies on scroll
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.style.boxShadow = window.scrollY > 10 ? '0 8px 24px -12px rgba(0,0,0,.5)' : 'none';
    });
  }

  // Reveal product cards on scroll
  const cards = document.querySelectorAll('.card');
  if ('IntersectionObserver' in window && cards.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    cards.forEach((card, i) => {
      card.style.transitionDelay = `${(i % 9) * 40}ms`;
      observer.observe(card);
    });
  } else {
    cards.forEach((card) => card.classList.add('is-visible'));
  }

  // Per-product "Consultar precio" buttons open WhatsApp with context
  document.querySelectorAll('.card__link[data-producto]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const producto = btn.getAttribute('data-producto');
      const text = `Hola Hierromar, quiero consultar precio y disponibilidad de: ${producto}.`;
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    });
  });

  // Quote form -> WhatsApp message
  const quoteForm = document.getElementById('quoteForm');
  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('qName').value.trim();
      const phone = document.getElementById('qPhone').value.trim();
      const product = document.getElementById('qProduct').value;
      const detail = document.getElementById('qDetail').value.trim();

      let message = `Hola Hierromar, quiero solicitar un presupuesto.\n`;
      message += `Nombre: ${name}\n`;
      if (phone) message += `Teléfono: ${phone}\n`;
      message += `Producto: ${product}\n`;
      if (detail) message += `Detalle: ${detail}`;

      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
    });
  }
})();
