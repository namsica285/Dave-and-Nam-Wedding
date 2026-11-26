// A Sonoran Desert skyline drawn as ONE continuous line: foothills with saguaros, ocotillo and prickly pear,
// then the high, jagged Santa Catalinas, then more desert. Built in pixels at the width it is shown, so the
// plants keep their proportions on a phone and on a wide desktop screen.
const terrain: [number, number][] = [
  [0, .1], [.03, .18], [.06, .12], [.1, .26], [.14, .2], [.18, .3], [.22, .22], [.26, .34], [.3, .26],
  [.35, .46], [.38, .38], [.42, .6], [.45, .5], [.49, .74], [.52, .62], [.56, 1], [.59, .82], [.62, .92],
  [.65, .66], [.69, .78], [.72, .56], [.76, .64], [.8, .42], [.84, .5], [.88, .3], [.92, .36], [.96, .2], [1, .12],
];

type Plant =
  | { kind: 'saguaro'; at: number; h: number; arms: 'two' | 'left' | 'right' | 'none' }
  | { kind: 'ocotillo'; at: number; h: number }
  | { kind: 'pear'; at: number; h: number };
// where plants stand (fraction of width) and how tall (fraction of the strip height)
const plants: Plant[] = [
  { kind: 'saguaro', at: .045, h: .95, arms: 'two' },
  { kind: 'pear', at: .082, h: .3 },
  { kind: 'saguaro', at: .125, h: .58, arms: 'right' },
  { kind: 'ocotillo', at: .21, h: .62 },
  { kind: 'saguaro', at: .285, h: .72, arms: 'left' },
  { kind: 'pear', at: .335, h: .26 },
  { kind: 'saguaro', at: .76, h: .5, arms: 'none' },
  { kind: 'ocotillo', at: .86, h: .55 },
  { kind: 'saguaro', at: .915, h: .88, arms: 'two' },
  { kind: 'saguaro', at: .955, h: .5, arms: 'right' },
  { kind: 'pear', at: .985, h: .24 },
];

function spline(W: number, top: number) {
  // Catmull-Rom through the terrain, sampled every 2px: smooth, no kinks
  const P = terrain.map(([x, h]) => [x * W, h * top] as [number, number]);
  const out: [number, number][] = [];
  for (let i = 0; i < P.length - 1; i++) {
    const p0 = P[Math.max(0, i - 1)], p1 = P[i], p2 = P[i + 1], p3 = P[Math.min(P.length - 1, i + 2)];
    const steps = Math.max(2, Math.round((p2[0] - p1[0]) / 2));
    for (let s = 0; s < steps; s++) {
      const t = s / steps, t2 = t * t, t3 = t2 * t;
      const f = (a: number, b: number, c: number, d: number) => 0.5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (-a + 3 * b - 3 * c + d) * t3);
      out.push([f(p0[0], p1[0], p2[0], p3[0]), f(p0[1], p1[1], p2[1], p3[1])]);
    }
  }
  out.push(P[P.length - 1]);
  return out;
}

const f = (n: number) => +n.toFixed(1);

// Saguaro outline, base at (0,0), y up. Arms leave the trunk in a smooth elbow, run out, then turn skyward.
function saguaro(h: number, arms: 'two' | 'left' | 'right' | 'none') {
  const w = Math.max(2.3, h * 0.085), aw = w * 1.55, c = aw / 2;
  const e1 = h * 0.3, t1 = h * 0.66, r1 = h * 0.3;   // left arm: elbow height, tip height, reach
  const e2 = h * 0.44, t2 = h * 0.76, r2 = h * 0.26; // right arm
  const L = arms === 'two' || arms === 'left', R = arms === 'two' || arms === 'right';
  const seg: string[] = [`L${f(-w)} 0`];
  if (L) {
    seg.push(
      `L${f(-w)} ${f(e1)}`,
      `C${f(-w - r1 * .55)} ${f(e1)} ${f(-w - r1)} ${f(e1 + aw * .3)} ${f(-w - r1)} ${f(e1 + aw * 1.5)}`,
      `L${f(-w - r1)} ${f(t1)}`,
      `A${f(c)} ${f(c)} 0 0 1 ${f(-w - r1 + aw)} ${f(t1)}`,
      `L${f(-w - r1 + aw)} ${f(e1 + aw * 1.7)}`,
      `C${f(-w - r1 + aw)} ${f(e1 + aw * 1.05)} ${f(-w - r1 * .45)} ${f(e1 + aw)} ${f(-w)} ${f(e1 + aw)}`,
    );
  }
  seg.push(`L${f(-w)} ${f(h - w)}`, `A${f(w)} ${f(w)} 0 0 1 ${f(w)} ${f(h - w)}`);
  if (R) {
    seg.push(
      `L${f(w)} ${f(e2 + aw)}`,
      `C${f(w + r2 * .45)} ${f(e2 + aw)} ${f(w + r2 - aw)} ${f(e2 + aw * 1.05)} ${f(w + r2 - aw)} ${f(e2 + aw * 1.7)}`,
      `L${f(w + r2 - aw)} ${f(t2)}`,
      `A${f(c)} ${f(c)} 0 0 1 ${f(w + r2)} ${f(t2)}`,
      `L${f(w + r2)} ${f(e2 + aw * 1.5)}`,
      `C${f(w + r2)} ${f(e2 + aw * .3)} ${f(w + r2 * .55)} ${f(e2)} ${f(w)} ${f(e2)}`,
    );
  }
  seg.push(`L${f(w)} 0`);
  return { seg, half: Math.max(w + (L ? r1 : 0), w + (R ? r2 : 0)) };
}

// Ocotillo: whips that fan out of the ground, each drawn out and back along the same curve
function ocotillo(h: number) {
  const stems: [number, number, number][] = [[-.55, .78, .55], [-.3, .92, .6], [-.08, 1, .5], [.14, .95, .55], [.36, .85, .6], [.58, .7, .5]];
  const seg: string[] = [];
  for (const [lean, len, bend] of stems) {
    const tx = lean * h * 0.55, ty = len * h;
    const cx = lean * h * 0.12, cy = ty * bend;
    seg.push(`Q${f(cx)} ${f(cy)} ${f(tx)} ${f(ty)}`, `Q${f(cx)} ${f(cy)} 0 0`);
  }
  return { seg, half: h * 0.35 };
}

// Prickly pear: a clump of round paddles, one scalloped outline
function pear(h: number) {
  const r = h * 0.42;
  const pts: [number, number, number][] = [[-1.55, .0, 0], [-1.45, 1.25, .78], [-.55, 2.05, .8], [.45, 2.35, .8], [1.35, 1.6, .78], [1.6, 0, .78]];
  const seg: string[] = [];
  for (let i = 0; i < pts.length; i++) {
    const [x, y, k] = pts[i];
    seg.push(i === 0 ? `L${f(x * r)} ${f(y * r)}` : `A${f(r * k)} ${f(r * k)} 0 0 1 ${f(x * r)} ${f(y * r)}`);
  }
  return { seg, half: r * 1.8 };
}

export function ridgePath(W: number, H: number) {
  const base = H - 2;
  const top = H * 0.8;
  const pts = spline(W, top);
  const at = (x: number) => { let b = pts[0]; for (const p of pts) { if (Math.abs(p[0] - x) < Math.abs(b[0] - x)) b = p; } return b[1]; };
  const items = plants.map((pl) => {
    const h = pl.h * H * 0.5;
    const o = pl.kind === 'saguaro' ? saguaro(h, pl.arms) : pl.kind === 'ocotillo' ? ocotillo(h) : pear(h);
    return { x: pl.at * W, o };
  });
  let d = `M${f(pts[0][0])} ${f(base - pts[0][1])}`;
  let gi = 0, resumeAfter = -1;
  for (let i = 1; i < pts.length; i++) {
    const [x, y] = pts[i];
    const g = items[gi];
    if (g && x >= g.x) {
      const gy = base - at(g.x) + 1;
      d += ` L${f(g.x - 2)} ${f(gy)}`;
      // translate local coords (y up) into the strip
      const tr = g.o.seg.map((s) => s.replace(/([LQCA])([^LQCA]*)/g, (_m, cmd: string, rest: string) => {
        const n = rest.trim().split(/\s+/).map(Number);
        if (cmd === 'A') return `A${n[0]} ${n[1]} 0 ${n[3]} ${n[4]} ${f(g.x + n[5])} ${f(gy - n[6])}`;
        const out: string[] = [];
        for (let k = 0; k < n.length; k += 2) out.push(`${f(g.x + n[k])} ${f(gy - n[k + 1])}`);
        return cmd + out.join(' ');
      }));
      d += ' ' + tr.join(' ');
      resumeAfter = g.x + g.o.half;
      gi++;
      continue;
    }
    if (x < resumeAfter) continue;
    d += ` L${f(x)} ${f(base - y)}`;
  }
  return d;
}
