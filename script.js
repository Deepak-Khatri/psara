// Smooth scroll for in-page navigation, closing the mobile menu on click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

// Scroll-reveal for elements marked .reveal
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach(el => observer.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('is-visible'));
}

// Contact form — builds a pre-filled WhatsApp message from the fields
const WHATSAPP_NUMBER = '918802251151'; // +91 88022 51151, country code included, no symbols

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', e => {
  e.preventDefault();

  const name = contactForm.name.value.trim();
  const agency = contactForm.agency.value.trim();
  const phone = contactForm.phone.value.trim();
  const service = contactForm.service.value;
  const message = contactForm.message.value.trim();

  if (!name || !phone) {
    formStatus.textContent = 'Please fill in your name and phone number.';
    return;
  }

  const lines = [
    `New PSARA consultation request`,
    `Name: ${name}`,
    agency ? `Agency: ${agency}` : null,
    `Phone: ${phone}`,
    `Service: ${service}`,
    message ? `Message: ${message}` : null
  ].filter(Boolean);

  const text = encodeURIComponent(lines.join('\n'));
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;

  window.open(waUrl, '_blank');
  formStatus.textContent = 'Opening WhatsApp with your details filled in…';
  contactForm.reset();
});
