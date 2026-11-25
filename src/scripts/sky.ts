// Scroll engine for the day-into-night home page.
// It only sets CSS variables (--open, --draw, header tone, foil shift). All drawing is CSS.
const clamp = (n: number, a = 0, b = 1) => Math.min(b, Math.max(a, n));

let raf = 0;
let sections: HTMLElement[] = [];
let blooms: HTMLElement[] = [];
let draws: HTMLElement[] = [];
let foils: SVGLinearGradientElement[] = [];

function collect() {
  sections = [...document.querySelectorAll<HTMLElement>('[data-tone]')];
  blooms = [...document.querySelectorAll<HTMLElement>('[data-open-to]')];
  draws = [...document.querySelectorAll<HTMLElement>('[data-draw]')];
  foils = [...document.querySelectorAll<SVGLinearGradientElement>('[data-foil]')];
}

function frame() {
  raf = 0;
  const vh = window.innerHeight;
  // header follows the sky: whichever section sits under it decides light or dark
  let tone = 'light';
  for (const s of sections) {
    const r = s.getBoundingClientRect();
    if (r.top <= 40 && r.bottom > 40) tone = s.dataset.tone || 'light';
  }
  document.documentElement.dataset.tone = tone;

  for (const el of blooms) {
    const r = el.getBoundingClientRect();
    const from = parseFloat(el.dataset.openFrom || '0');
    const to = parseFloat(el.dataset.openTo || '1');
    const t = clamp((vh * 0.92 - r.top) / (vh * 0.55));
    el.style.setProperty('--open', (from + (to - from) * t).toFixed(3));
  }
  for (const el of draws) {
    const r = el.getBoundingClientRect();
    el.style.setProperty('--draw', clamp((vh * 0.9 - r.top) / (vh * 0.75)).toFixed(3));
  }
  // foil highlight travels along every line as you scroll
  const shift = (window.scrollY / 900) % 1;
  for (const g of foils) {
    const w = parseFloat(g.dataset.w || '400');
    g.setAttribute('gradientTransform', `translate(${(shift * w).toFixed(1)} 0)`);
  }
}

function queue() { if (!raf) raf = requestAnimationFrame(frame); }

function init() {
  collect();
  if (!sections.length) document.documentElement.dataset.tone = 'light';
  frame();
}

if (!(window as any).__skyBound) {
  (window as any).__skyBound = true;
  window.addEventListener('scroll', queue, { passive: true });
  window.addEventListener('resize', queue);
}
document.addEventListener('astro:page-load', init);
