#!/usr/bin/env python3
"""Smooth the hand-drawn lines in src/data/logo-art.ts (ridge, dune, lotus petals, stem).

The traced lines had small wobbles and tiny hooks at the tips. This re-draws each one as a clean
curve: resample evenly, soften with a Gaussian (stronger along the stem, where the line climbs from the
N up to the lotus), then rebuild as smooth cubic Beziers. The stem is cut from the smoothed ridge so
the two never drift apart. Run:  python3 scripts/smooth-logo-art.py   (idempotent on the source of truth
kept next to it in scripts/logo-art.original.json)
"""
import json, math, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
TS = os.path.join(HERE, '..', 'src', 'data', 'logo-art.ts')
ORIG = os.path.join(HERE, 'logo-art.original.json')

src = open(TS).read()
m = re.search(r'export const art = (\{.*?\}) as const;', src, re.S)
if not os.path.exists(ORIG):          # keep the traced originals so this script can be re-run
    open(ORIG, 'w').write(m.group(1))
art = json.loads(open(ORIG).read())

def parse(d):
    n = [float(v) for v in re.findall(r'-?\d+\.?\d*', d)]
    cur = (n[0], n[1]); i = 2; segs = []
    while i + 5 < len(n) + 0:
        c1, c2, p = (n[i], n[i+1]), (n[i+2], n[i+3]), (n[i+4], n[i+5]); segs.append((cur, c1, c2, p)); cur = p; i += 6
    return segs

def dense(segs, k=40):
    pts = []
    for p0, c1, c2, p3 in segs:
        for s in range(k):
            t = s / k; u = 1 - t
            pts.append((u**3*p0[0] + 3*u*u*t*c1[0] + 3*u*t*t*c2[0] + t**3*p3[0], u**3*p0[1] + 3*u*u*t*c1[1] + 3*u*t*t*c2[1] + t**3*p3[1]))
    pts.append(segs[-1][3]); return pts

def resample(pts, h):
    cum = [0.0]
    for a, b in zip(pts, pts[1:]): cum.append(cum[-1] + math.dist(a, b))
    n = max(2, int(cum[-1] / h)); out = []; j = 0
    for i in range(n + 1):
        s = cum[-1] * i / n
        while j < len(cum) - 2 and cum[j + 1] < s: j += 1
        f = (s - cum[j]) / ((cum[j + 1] - cum[j]) or 1)
        out.append((pts[j][0] + f * (pts[j + 1][0] - pts[j][0]), pts[j][1] + f * (pts[j + 1][1] - pts[j][1])))
    return out, cum[-1] / n

def smooth(pts, h, sigma):
    n = len(pts); out = []
    def at(k):
        if k < 0: return (2*pts[0][0] - pts[-k][0], 2*pts[0][1] - pts[-k][1])
        if k > n - 1: j = 2*(n - 1) - k; return (2*pts[-1][0] - pts[j][0], 2*pts[-1][1] - pts[j][1])
        return pts[k]
    for i in range(n):
        s = sigma(pts[i]); r = max(1, int(3 * s / h)); sx = sy = sw = 0.0
        for d in range(-r, r + 1):
            w = math.exp(-0.5 * (d * h / s) ** 2); q = at(i + d); sx += w * q[0]; sy += w * q[1]; sw += w
        out.append((sx / sw, sy / sw))
    out[0], out[-1] = pts[0], pts[-1]
    return out

def bezier(pts, every):
    idx = list(range(0, len(pts), every))
    if idx[-1] != len(pts) - 1: idx.append(len(pts) - 1)
    P = [pts[i] for i in idx]; f = lambda v: f'{v:.1f}'.rstrip('0').rstrip('.')
    d = f'M{f(P[0][0])} {f(P[0][1])}'
    for i in range(len(P) - 1):
        p0 = P[max(0, i - 1)]; p1 = P[i]; p2 = P[i + 1]; p3 = P[min(len(P) - 1, i + 2)]
        d += f'C{f(p1[0] + (p2[0] - p0[0]) / 6)} {f(p1[1] + (p2[1] - p0[1]) / 6)} {f(p2[0] - (p3[0] - p1[0]) / 6)} {f(p2[1] - (p3[1] - p1[1]) / 6)} {f(p2[0])} {f(p2[1])}'
    return d

def ss(a, b, v):
    t = min(1, max(0, (v - a) / (b - a))); return t * t * (3 - 2 * t)

H = 2.0
def sigma_default(p): return 8.0
# the climb from the top of the N up to the lotus: much gentler, so no elbow shows
def sigma_stem(p): return 8.0 + 110.0 * ss(1780, 1700, p[1]) * ss(1496, 1600, p[1])
def sigma_petal(p): return 7.0

new = dict(art)
res = {}
for k in ['ridge', 'dune', 'p1', 'p2', 'p3', 'p4']:
    pts, h = resample(dense(parse(art[k])), H)
    res[k] = (pts, h)
    sg = sigma_stem if k == 'ridge' else (sigma_petal if k.startswith('p') else sigma_default)
    sm = smooth(pts, h, sg)
    res[k] = (sm, h)
    new[k] = bezier(sm, 7)

# the stem is the end of the smoothed ridge (lotus base down past the top of the N)
rp, rh = res['ridge']
base = tuple(art['base'])
end = (1637.3, 1880.5)
ie = min(range(len(rp)), key=lambda i: math.dist(rp[i], end))
stem = list(reversed(rp[ie:])); stem[0] = base
new['stem'] = bezier(stem, 7)

# stemRail: the same stem, but it eases into a straight vertical at x=1637.3 so it merges tangent
# with the straight rail it grows from (home page timeline) instead of meeting it at an angle.
RX = 1637.3
cut = max(i for i, q in enumerate(stem) if q[1] <= 1690)
P0 = stem[cut]; Pm = stem[max(0, cut - 6)]
L = math.hypot(P0[0] - Pm[0], P0[1] - Pm[1]) or 1
t = ((P0[0] - Pm[0]) / L, (P0[1] - Pm[1]) / L)
Q = (RX, 1980.0); c1 = (P0[0] + t[0] * 70, P0[1] + t[1] * 70); c2 = (RX, Q[1] - 150)
curve = []
for i in range(1, 61):
    u = i / 60; v = 1 - u
    curve.append((v**3 * P0[0] + 3 * v * v * u * c1[0] + 3 * v * u * u * c2[0] + u**3 * Q[0],
                  v**3 * P0[1] + 3 * v * v * u * c1[1] + 3 * v * u * u * c2[1] + u**3 * Q[1]))
new['stemRail'] = bezier(stem[:cut + 1] + curve, 7)

# pieces for the standalone dune (src/data/dune.ts)
def run(k, x0, cut=None):
    pts = res[k][0]
    i0 = min(range(len(pts)), key=lambda i: abs(pts[i][0] - x0) + (0 if pts[i][1] > 2100 else 9999))
    i1 = len(pts) - 1 if cut is None else min(range(len(pts)), key=lambda i: math.dist(pts[i], cut))
    return bezier(pts[i0:i1 + 1], 7)
new['duneRun'] = run('ridge', 688, (1500.2, 2056.5))
new['duneFoldRun'] = run('dune', 690)

new_json = json.dumps(new, ensure_ascii=False)
open(TS, 'w').write(src[:m.start(1)] + new_json + src[m.end(1):])
print('ok', {k: len(new[k]) for k in ['ridge', 'dune', 'p1', 'p2', 'p3', 'p4', 'stem', 'duneRun', 'duneFoldRun']})
