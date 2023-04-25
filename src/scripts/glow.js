const addGlow = (container, elementClassName) => {
  const containerEl = document.querySelector(container);

  containerEl.addEventListener("mousemove", handleMove);
  containerEl.addEventListener("touchmove", handleMove);

  function handleMove(e) {
    e.preventDefault();

    const position = e.touches ? e.touches[0] : e;
    const x = position.clientX;
    const y = position.clientY;

    for (const item of document.getElementsByClassName(elementClassName)) {
      const rect = item.getBoundingClientRect();

      const relX = x - rect.left;
      const relY = y - rect.top;

      item.style.setProperty("--mouse-x", `${relX}px`);
      item.style.setProperty("--mouse-y", `${relY}px`);
    }
  }
};

export default addGlow;
