// A Sonoran Desert skyline drawn as ONE continuous line: low Tucson Mountains with saguaros,
// the high jagged Santa Catalinas, then a few more saguaros. Built in pixels at the width it is shown,
// so saguaros keep their proportions on a phone and on a wide desktop screen.
const terrain: [number, number][] = [
  [0, .16], [.05, .26], [.1, .2], [.16, .3], [.22, .24], [.28, .17], [.34, .22],
  [.4, .4], [.45, .6], [.5, .46], [.55, .8], [.59, .64], [.64, 1], [.68, .78], [.72, .92], [.77, .55],
  [.82, .7], [.87, .36], [.92, .26], [.97, .2], [1, .16],
];
// where saguaros stand (fraction of width) and how tall (fraction of strip height)
const saguaros: [number, number][] = [[.075, .92], [.115, .6], [.27, .7], [.935, .88], [.97, .55]];

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

// Outline of a saguaro with its base at (0,0), y up. One closed trace, left foot to right foot.
function saguaro(h: number) {
  const w = Math.max(2.4, h * 0.085), aw = w * 1.7, r = h * 0.3, r2 = h * 0.26;
  const e1 = h * 0.3, t1 = h * 0.64, e2 = h * 0.44, t2 = h * 0.74, c = aw / 2;
  const f = (n: number) => +n.toFixed(2);
  const pts: string[] = [
    `L${f(-w)} 0`, `L${f(-w)} ${f(e1)}`,
    `L${f(-w - r + c)} ${f(e1)}`, `Q${f(-w - r)} ${f(e1)} ${f(-w - r)} ${f(e1 + c)}`,
    `L${f(-w - r)} ${f(t1)}`, `A${f(c)} ${f(c)} 0 0 1 ${f(-w - r + aw)} ${f(t1)}`,
    `L${f(-w - r + aw)} ${f(e1 + aw)}`, `L${f(-w)} ${f(e1 + aw)}`,
    `L${f(-w)} ${f(h - w)}`, `A${f(w)} ${f(w)} 0 0 1 ${f(w)} ${f(h - w)}`,
    `L${f(w)} ${f(e2 + aw)}`, `L${f(w + r2 - aw)} ${f(e2 + aw)}`,
    `L${f(w + r2 - aw)} ${f(t2)}`, `A${f(c)} ${f(c)} 0 0 1 ${f(w + r2)} ${f(t2)}`,
    `L${f(w + r2)} ${f(e2 + c)}`, `Q${f(w + r2)} ${f(e2)} ${f(w + r2 - c)} ${f(e2)}`,
    `L${f(w)} ${f(e2)}`, `L${f(w)} 0`,
  ];
  return { w, pts, reach: Math.max(r, r2) + w };
}

export function ridgePath(W: number, H: number) {
  const base = H - 2;
  const top = H * 0.8; // terrain uses the lower 80% of the strip; saguaros stand on the low hills
  const pts = spline(W, top);
  const at = (x: number) => { let b = pts[0]; for (const p of pts) { if (Math.abs(p[0] - x) < Math.abs(b[0] - x)) b = p; } return b[1]; };
  const gs = saguaros.map(([fx, fh]) => ({ x: fx * W, h: fh * H * 0.5 }));
  let d = `M${pts[0][0].toFixed(1)} ${(base - pts[0][1]).toFixed(1)}`;
  let gi = 0;
  for (let i = 1; i < pts.length; i++) {
    const [x, y] = pts[i];
    const g = gs[gi];
    if (g && x >= g.x) {
      const gy = base - at(g.x) + 1;
      const s = saguaro(g.h);
      d += ` L${(g.x - s.w).toFixed(1)} ${gy.toFixed(1)}`;
      // draw outline by translating local coords (y up) into the strip
      const tr = s.pts.map((seg) => seg.replace(/([LQA])([^LQA]*)/g, (_m, cmd: string, rest: string) => {
        const n = rest.trim().split(/\s+/).map(Number);
        if (cmd === 'A') return `A${n[0]} ${n[1]} 0 ${n[3]} ${n[4]} ${(g.x + n[5]).toFixed(1)} ${(gy - n[6]).toFixed(1)}`;
        const out: string[] = [];
        for (let k = 0; k < n.length; k += 2) out.push(`${(g.x + n[k]).toFixed(1)} ${(gy - n[k + 1]).toFixed(1)}`);
        return cmd + out.join(' ');
      }));
      d += ' ' + tr.join(' ');
      gi++;
      continue;
    }
    // skip samples under the saguaro just drawn
    const prev = gs[gi - 1];
    if (prev && x < prev.x + saguaro(prev.h).reach) continue;
    d += ` L${x.toFixed(1)} ${(base - y).toFixed(1)}`;
  }
  return d;
}
