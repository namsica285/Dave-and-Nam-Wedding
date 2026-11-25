// Smooth, band-free gradients: colors are mixed in OKLab and eased with smootherstep,
// so a sky moves from one color to the next with no visible seam.
type RGB = [number, number, number];
const hex = (h: string): RGB => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255) as RGB;
const lin = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const gam = (c: number) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);
function toLab([r, g, b]: RGB): RGB {
  [r, g, b] = [lin(r), lin(g), lin(b)];
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s, 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s, 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s];
}
function fromLab([L, a, b]: RGB): string {
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  const rgb = [4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s, -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s, -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s];
  return '#' + rgb.map((c) => Math.round(Math.min(1, Math.max(0, gam(c))) * 255).toString(16).padStart(2, '0')).join('');
}
const ease = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);

/** stops: [color, position 0..1][]  ->  "#.. 0%, #.. 3.1%, ..." */
export function smoothStops(stops: [string, number][], steps = 12): string {
  const out: string[] = [];
  for (let i = 0; i < stops.length - 1; i++) {
    const [c1, p1] = stops[i]; const [c2, p2] = stops[i + 1];
    const a = toLab(hex(c1)); const b = toLab(hex(c2));
    for (let k = 0; k < steps; k++) {
      const t = k / steps; const e = ease(t);
      out.push(`${fromLab([0, 1, 2].map((j) => a[j] + (b[j] - a[j]) * e) as RGB)} ${((p1 + (p2 - p1) * t) * 100).toFixed(2)}%`);
    }
  }
  const [cl, pl] = stops[stops.length - 1];
  out.push(`${cl} ${(pl * 100).toFixed(2)}%`);
  return out.join(', ');
}
