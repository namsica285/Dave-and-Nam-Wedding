// Scroll engine for the day-into-night home page.
// It only sets CSS variables (--open, --draw, header tone, foil shift). All drawing is CSS.
const clamp = (n: number, a = 0, b = 1) => Math.min(b, Math.max(a, n));

import { ridgePath } from '../lib/ridge';

let raf = 0;
let ridges: { svg: SVGSVGElement; drawn: SVGPathElement; head: SVGGElement; len: number }[] = [];
let sections: HTMLElement[] = [];
let blooms: HTMLElement[] = [];
let draws: HTMLElement[] = [];
let foils: { g: SVGLinearGradientElement; svg: SVGSVGElement; dx: number; dy: number }[] = [];

function collect() {
  sections = [...document.querySelectorAll<HTMLElement>('[data-tone]')];
  blooms = [...document.querySelectorAll<HTMLElement>('[data-open-to]')];
  draws = [...document.querySelectorAll<HTMLElement>('[data-draw]')];
  foils = [...document.querySelectorAll<SVGLinearGradientElement>('[data-foil]')].map((g) => ({
    g, svg: g.ownerSVGElement!, dx: parseFloat(g.getAttribute('x2') || '0') - parseFloat(g.getAttribute('x1') || '0'),
    dy: parseFloat(g.getAttribute('y2') || '0') - parseFloat(g.getAttribute('y1') || '0'),
  }));
}

function buildRidges() {
  ridges = [...document.querySelectorAll<SVGSVGElement>('svg[data-ridge]')].map((svg) => {
    const W = svg.clientWidth || 360, H = svg.clientHeight || 36;
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    const d = ridgePath(W, H);
    const base = svg.querySelector<SVGPathElement>('.rbase')!;
    const drawn = svg.querySelector<SVGPathElement>('.rdrawn')!;
    base.setAttribute('d', d); drawn.setAttribute('d', d);
    return { svg, drawn, head: svg.querySelector<SVGGElement>('.rhead')!, len: drawn.getTotalLength() };
  });
  document.documentElement.toggleAttribute('data-ridge-on', ridges.length > 0);
}
function updateRidges() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const p = clamp(max > 0 ? window.scrollY / max : 0);
  for (const r of ridges) {
    r.drawn.style.strokeDashoffset = String(1 - p);
    const pt = r.drawn.getPointAtLength(p * r.len);
    r.head.setAttribute('transform', `translate(${pt.x.toFixed(1)} ${pt.y.toFixed(1)})`);
  }
}

function frame() {
  raf = 0;
  const vh = window.innerHeight;
  // header follows the sky: whichever section sits under it decides light or dark
  let tone = document.documentElement.dataset.toneDefault || 'light';
  for (const s of sections) {
    const r = s.getBoundingClientRect();
    if (r.top <= 40 && r.bottom > 40) {
      const t = s.dataset.tone || 'light';
      // "split:0.55" = light above that fraction of the section, dark below (the sunset band)
      if (t.startsWith('split:')) tone = (40 - r.top) / r.height > parseFloat(t.slice(6)) ? 'dark' : 'light';
      else tone = t;
    }
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
    // starts as the line enters the screen and is complete once it reaches 62% down the viewport,
    // well before the text beneath it gets to the middle of the screen
    const mid = r.top + r.height / 2;
    el.style.setProperty('--draw', clamp((vh * 1.0 - mid) / (vh * 0.38)).toFixed(3));
  }
  updateRidges();
  shine();
}

// foil glint: follows scroll, and drifts slowly on its own so the metal always feels alive
const still = window.matchMedia('(prefers-reduced-motion: reduce)');
function shine(now = performance.now()) {
  const drift = still.matches ? 0 : now / 14000;
  const shift = (window.scrollY / 1100 + drift) % 1;
  const vh = window.innerHeight;
  for (const f of foils) {
    // skip lines that are off screen: less repainting, smoother glint
    const r = f.svg.getBoundingClientRect();
    if (r.bottom < -50 || r.top > vh + 50) continue;
    // move exactly along the gradient's own direction; one full period = seamless loop, no jump
    f.g.setAttribute('gradientTransform', `translate(${(shift * f.dx).toFixed(2)} ${(shift * f.dy).toFixed(2)})`);
  }
}
let loop = 0;
function tick(now: number) {
  loop = 0;
  if (!foils.length || still.matches || document.hidden) return;
  shine(now);
  loop = requestAnimationFrame(tick);
}
function startLoop() { if (!loop) loop = requestAnimationFrame(tick); }

function queue() { if (!raf) raf = requestAnimationFrame(frame); }

function init() {
  collect();
  buildRidges();
  if (!sections.length) document.documentElement.dataset.tone = 'light';
  frame();
  startLoop();
}

if (!(window as any).__skyBound) {
  (window as any).__skyBound = true;
  window.addEventListener('scroll', queue, { passive: true });
  window.addEventListener('resize', () => { buildRidges(); queue(); });
  document.addEventListener('visibilitychange', startLoop);
}
document.addEventListener('astro:page-load', init);
