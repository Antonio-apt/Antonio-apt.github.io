const CLOSE_DELAY_MS = 500;

export default function initBurger() {
  const burger = document.getElementById('burger');
  const nav = document.getElementById('main-nav');

  if (!burger || !nav) return;

  function toggleMenu(restoreFocusToBurger) {
    const isOpen = burger.classList.toggle('is-open');
    nav.classList.toggle('is-open');

    burger.setAttribute('aria-expanded', isOpen);
    burger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');

    if (isOpen) {
      nav.style.height = '100vh';
      const firstLink = nav.querySelector('a');
      if (firstLink) firstLink.focus();
    } else {
      setTimeout(() => {
        nav.style.height = '';
        if (restoreFocusToBurger !== false) burger.focus();
      }, CLOSE_DELAY_MS);
    }
  }

  burger.addEventListener('click', toggleMenu);

  nav.querySelectorAll('a').forEach((item) => {
    item.addEventListener('click', () => {
      if (burger.classList.contains('is-open')) toggleMenu(false);
    });
  });
}
