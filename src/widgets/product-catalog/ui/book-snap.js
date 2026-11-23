// Only complete a turn that the reader started inside the book. Native touch
// momentum and wheel scrolling run first, including the exits at either end.
export function bindBookSnap(track, layout, count, reduced) {
  let timeout;
  let armed = false;
  let touching = false;
  let direction = 0;
  let lastY = window.scrollY;

  function cancel() {
    clearTimeout(timeout);
    armed = false;
    direction = 0;
  }

  function arm() {
    const { pinned, top, step } = layout.current;
    const distance = top - track.getBoundingClientRect().top;
    if (!pinned || distance < -1 || distance > step * (count - 1) + 1) {
      cancel();
      return;
    }
    clearTimeout(timeout);
    armed = true;
  }

  function settle() {
    const { top, step, overflow } = layout.current;
    const distance = top - track.getBoundingClientRect().top;
    const base = Math.floor(distance / step);
    const within = distance - base * step;
    const next = direction > 0 ? base + 1 : base;
    cancel();
    if (base < 0 || base >= count - 1 || within <= overflow + 1 || step - within <= 1) return;
    window.scrollTo({ top: window.scrollY - distance + next * step, behavior: reduced() ? 'instant' : 'smooth' });
  }

  function onScroll() {
    const delta = window.scrollY - lastY;
    lastY = window.scrollY;
    if (!armed) return;
    if (delta) direction = Math.sign(delta);
    clearTimeout(timeout);
    if (!touching && direction) timeout = setTimeout(settle, 125);
  }
  function wheel(event) {
    if (event.ctrlKey || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
    arm();
    if (armed) {
      // A compositor scroll can already have happened when a passive wheel
      // listener runs. Keep the gesture direction even on a single wheel tick.
      direction = Math.sign(event.deltaY);
      timeout = setTimeout(settle, 125);
    }
  }
  function touchStart(event) {
    cancel();
    touching = event.touches.length === 1;
    if (touching) arm();
  }
  function touchEnd(event) {
    if (event.touches.length) return;
    touching = false;
    onScroll();
  }
  function touchCancel() {
    touching = false;
    cancel();
  }
  function key(event) {
    cancel();
    if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', ' '].includes(event.key) &&
        !event.target.closest?.('input,select,textarea,button,[contenteditable="true"]')) arm();
  }

  const listeners = [
    ['wheel', wheel], ['touchstart', touchStart], ['touchend', touchEnd],
    ['touchcancel', touchCancel], ['scroll', onScroll], ['keydown', key],
    ['pointerdown', cancel], ['resize', cancel], ['blur', cancel],
  ];
  for (const [type, listener] of listeners) window.addEventListener(type, listener, { passive: true });
  return () => {
    cancel();
    for (const [type, listener] of listeners) window.removeEventListener(type, listener);
  };
}
