const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const navDropdownBtn = document.querySelector('.nav-btn');
const navItem = document.querySelector('.has-dropdown');

menuToggle?.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  siteNav?.classList.toggle('open');
});

navDropdownBtn?.addEventListener('click', () => {
  const expanded = navDropdownBtn.getAttribute('aria-expanded') === 'true';
  navDropdownBtn.setAttribute('aria-expanded', String(!expanded));
  navItem?.classList.toggle('open');
});

const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.tab-panel');
tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((t) => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    const key = tab.dataset.tab;
    panels.forEach((panel) => panel.classList.toggle('active', panel.dataset.panel === key));
  });
});

const counters = document.querySelectorAll('[data-count]');
const animateCounter = (el) => {
  const target = Number(el.dataset.count || 0);
  let current = 0;
  const step = Math.max(1, Math.floor(target / 40));
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = `${current}${target === 99 ? '%' : '+'}`;
  }, 30);
};

const metricsObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach((counter) => metricsObserver.observe(counter));

const resourceSearch = document.getElementById('resource-search');
const resourceFilter = document.getElementById('resource-filter');
const resources = [...document.querySelectorAll('.resource')];
const emptyState = document.getElementById('resource-empty');

function filterResources() {
  const query = (resourceSearch?.value || '').trim().toLowerCase();
  const type = resourceFilter?.value || 'all';
  let visibleCount = 0;

  resources.forEach((item) => {
    const matchesType = type === 'all' || item.dataset.type === type;
    const matchesQuery = item.dataset.title?.includes(query);
    const visible = Boolean(matchesType && matchesQuery);
    item.hidden = !visible;
    if (visible) visibleCount += 1;
  });

  if (emptyState) emptyState.hidden = visibleCount !== 0;
}

resourceSearch?.addEventListener('input', filterResources);
resourceFilter?.addEventListener('change', filterResources);

const testimonials = [
  {
    quote: 'The platform reduced manual disclosure prep by over 50% in our first reporting cycle.',
    author: 'Director, Global Compliance Operations'
  },
  {
    quote: 'We now manage grants and engagements through a single governance workflow across all regions.',
    author: 'VP, Medical Affairs'
  },
  {
    quote: 'Exception tracking and audit trails gave us faster internal and external audit readiness.',
    author: 'Head of Compliance Technology'
  }
];

let quoteIndex = 0;
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');

function renderQuote() {
  quoteText.textContent = `“${testimonials[quoteIndex].quote}”`;
  quoteAuthor.textContent = `— ${testimonials[quoteIndex].author}`;
}

document.getElementById('next-quote')?.addEventListener('click', () => {
  quoteIndex = (quoteIndex + 1) % testimonials.length;
  renderQuote();
});

document.getElementById('prev-quote')?.addEventListener('click', () => {
  quoteIndex = (quoteIndex - 1 + testimonials.length) % testimonials.length;
  renderQuote();
});

renderQuote();

const faqButtons = document.querySelectorAll('.faq-question');
faqButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const wrapper = btn.closest('.faq-item');
    const isOpen = wrapper?.classList.contains('open');
    wrapper?.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(!isOpen));
  });
});

const contactForm = document.getElementById('contact-form');
const formFeedback = document.getElementById('form-feedback');

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!(contactForm instanceof HTMLFormElement)) return;

  const formData = new FormData(contactForm);
  const values = Object.fromEntries(formData.entries());
  const required = ['firstName', 'lastName', 'company', 'email', 'message'];
  const missing = required.filter((name) => !String(values[name] || '').trim());
  const email = String(values.email || '').trim();
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  formFeedback?.classList.remove('error', 'success');

  if (missing.length || !emailValid) {
    formFeedback?.classList.add('error');
    formFeedback.textContent = 'Please complete all fields with a valid business email address.';
    return;
  }

  formFeedback?.classList.add('success');
  formFeedback.textContent = 'Thank you! Your request has been submitted.';
  contactForm.reset();
});

document.getElementById('year').textContent = String(new Date().getFullYear());

const cookieBanner = document.getElementById('cookie-banner');
const cookieAccepted = localStorage.getItem('cookieAccepted') === 'true';
if (!cookieAccepted) cookieBanner.hidden = false;

document.getElementById('accept-cookies')?.addEventListener('click', () => {
  localStorage.setItem('cookieAccepted', 'true');
  cookieBanner.hidden = true;
});

const modalTriggers = document.querySelectorAll('[data-open-modal]');
modalTriggers.forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const id = trigger.getAttribute('data-open-modal');
    const dialog = document.getElementById(id);
    if (dialog instanceof HTMLDialogElement) {
      dialog.showModal();
    }
  });
});
