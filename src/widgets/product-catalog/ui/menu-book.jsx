'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import { products } from '@/entities/product';
import { useMotion } from '@/shared/lib/motion';
import { Arrow } from '@/shared/ui';
import { BookSpread, lastSpread } from './book-pages';
import { bindBookSnap } from './book-snap';
import s from './menu-book.module.css';

function spreadTitle(number) {
  if (number === 0) return 'Обложка';
  if (number === lastSpread) return 'От нашей семьи';
  return products[number - 1].name;
}

export function MenuBook({ order }) {
  const track = useRef(null);
  const stage = useRef(null);
  const stack = useRef(null);
  const controls = useRef(null);
  const layout = useRef({ pinned: false, top: 0, step: 0, overflow: 0 });
  const [view, setView] = useState({ pinned: false, active: 0 });
  const { motionPaused } = useMotion();
  const count = order.length;

  useLayoutEffect(() => {
    const sheets = [...stack.current.children];
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let measureNeeded = true;
    let drawn;
    let readingOffset = 0;
    let previousFrame = 0;
    let visiblePair = -1;

    function update(time = performance.now()) {
      frame = 0;
      if (measureNeeded) {
        measureNeeded = false;
        const top = parseFloat(getComputedStyle(stage.current).top) || 0;
        const height = Math.max(...sheets.map(sheet => sheet.offsetHeight));
        const pinned = height > 0 && count > 1;
        const overflow = Math.max(0, height + controls.current.offsetHeight + top + 12 - window.innerHeight);
        const step = overflow + Math.round(Math.max(280, Math.min(620, window.innerHeight * .65)));
        layout.current = { pinned, top, step, overflow };
        track.current.style.setProperty('--travel', `${(count - 1) * step}px`);
      }

      const { pinned, top, step, overflow } = layout.current;
      const still = motionPaused || reduce?.matches;
      let base = 0;
      let active = 0;
      let turn = 0;
      if (pinned) {
        const distance = top - track.current.getBoundingClientRect().top;
        const nearest = Math.round(distance / step);
        const position = Math.abs(distance - nearest * step) < 1 ? nearest : distance / step;
        const progress = Math.max(0, Math.min(count - 1, position));
        base = Math.floor(progress);
        // On a short screen, scroll the whole spread into view before turning the leaf.
        const withinSpread = (progress - base) * step;
        const afterReading = (withinSpread - overflow) / (step - overflow);
        const target = base + Math.max(0, afterReading);
        const readOffset = Math.min(overflow, withinSpread);
        const targetOffset = readOffset * (1 - Math.max(0, afterReading));
        const elapsed = Math.max(1, Math.min(64, time - previousFrame));
        const follow = still || drawn === undefined || Math.abs(target - drawn) > 1.3
          ? 1 : 1 - Math.exp(-elapsed / 55);
        drawn = follow === 1 || Math.abs(target - drawn) < .0008 ? target : drawn + (target - drawn) * follow;
        readingOffset = Math.abs(targetOffset - readingOffset) < .25
          ? targetOffset : readingOffset + (targetOffset - readingOffset) * follow;
        previousFrame = time;
        if (drawn !== target || readingOffset !== targetOffset) schedule();
        active = Math.round(drawn);
        base = still ? active : Math.floor(drawn);
        turn = still ? 0 : drawn - base;
        stage.current.style.setProperty('--reading-offset', `${-readingOffset}px`);
      } else {
        stage.current.style.removeProperty('--reading-offset');
        const readingLine = top + (window.innerHeight - top) * .45;
        const next = sheets.findIndex(sheet => sheet.getBoundingClientRect().top > readingLine);
        active = next === -1 ? count - 1 : Math.max(0, next - 1);
        base = active;
      }

      // Change the visible faces and the fold in the same paint. React only
      // owns the controls and accessibility state, never the in-flight sheet.
      const pair = pinned ? base : -1;
      if (pair !== visiblePair) {
        for (const sheet of sheets) sheet.removeAttribute('data-phase');
        if (pinned) {
          sheets[base].dataset.phase = 'out';
          if (sheets[base + 1]) sheets[base + 1].dataset.phase = 'in';
        }
        visiblePair = pair;
      }
      stack.current.style.setProperty('--turn-angle', `${-180 * turn}deg`);
      stack.current.style.setProperty('--curl', String(Math.sin(Math.PI * turn)));
      setView(old => old.pinned === pinned && old.active === active ? old : { pinned, active });
    }

    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    function measure() {
      measureNeeded = true;
      schedule();
    }
    update();
    const unbindSnap = bindBookSnap(track.current, layout, count, () => motionPaused || reduce?.matches);
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure);
    for (const element of [...sheets, controls.current]) observer?.observe(element);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', measure);
    reduce?.addEventListener('change', schedule);
    return () => {
      for (const sheet of sheets) sheet.removeAttribute('data-phase');
      unbindSnap();
      cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', measure);
      reduce?.removeEventListener('change', schedule);
    };
  }, [count, motionPaused]);

  function jump(index) {
    if (index < 0 || index >= count) return;
    const { pinned, top, step } = layout.current;
    const offset = pinned
      ? track.current.getBoundingClientRect().top + index * step
      : stack.current.children[index].getBoundingClientRect().top;
    const adjacent = pinned && Math.abs(index - view.active) === 1;
    const smooth = adjacent && !motionPaused && !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: window.scrollY + offset - top, behavior: smooth ? 'smooth' : 'instant' });
    if (stack.current.contains(document.activeElement)) stage.current.focus({ preventScroll: true });
  }

  function onKeyDown(event) {
    if (event.target.tagName === 'SELECT' || event.altKey || event.metaKey || event.ctrlKey || event.shiftKey) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      jump(view.active + (event.key === 'ArrowLeft' ? -1 : 1));
    }
  }

  return (
    <div ref={track} className={s.track} data-layout={view.pinned ? 'pinned' : 'flow'}>
      <div ref={stage} className={s.stage} role="region" aria-label="Книжка-меню" tabIndex={-1} onKeyDown={onKeyDown}>
        <div ref={stack} className={s.stack}>
          {order.map((number, index) => (
            <BookSpread key={number} index={number} onTurn={jump} inactive={view.pinned && index !== view.active} />
          ))}
        </div>
        <nav ref={controls} className={s.controls} aria-label="Перелистывание книжки">
          <button className={s.prev} disabled={view.active === 0} onClick={() => jump(view.active - 1)}><Arrow /> Назад</button>
          <select aria-label="Перейти к развороту" value={view.active} onChange={event => jump(Number(event.target.value))}>
            {order.map((number, index) => <option key={number} value={index}>{spreadTitle(number)}</option>)}
          </select>
          <button disabled={view.active === count - 1} onClick={() => jump(view.active + 1)}>Далее <Arrow /></button>
        </nav>
      </div>
    </div>
  );
}
