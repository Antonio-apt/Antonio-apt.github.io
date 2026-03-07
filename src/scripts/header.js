const SCROLL_DOWN = 'down';
const SCROLL_UP = 'up';
const HIDE_THRESHOLD_PX = 52;

export default function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  let prevScroll = window.scrollY;
  let prevDirection = null;

  const toggleHeader = (direction, curScroll) => {
    if (direction === SCROLL_DOWN && curScroll > HIDE_THRESHOLD_PX) {
      header.classList.add('hide');
      prevDirection = direction;
    } else if (direction === SCROLL_UP) {
      header.classList.remove('hide');
      prevDirection = direction;
    }
  };

  const checkScroll = () => {
    const curScroll = window.scrollY;
    let direction = null;

    if (curScroll > prevScroll) direction = SCROLL_DOWN;
    else if (curScroll < prevScroll) direction = SCROLL_UP;

    if (direction && direction !== prevDirection) toggleHeader(direction, curScroll);
    prevScroll = curScroll;
  };

  window.addEventListener('scroll', checkScroll);
}
