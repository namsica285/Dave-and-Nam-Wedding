import type { APIRoute } from 'astro';
import { CODE_RE, normalizeCode, lookup, submit, throttle, miss, hit } from '../../lib/rsvp';
import { practiceMode } from '../../lib/sheets';

export const prerender = false;
const json = (b: unknown, status = 200) => new Response(JSON.stringify(b), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || clientAddress || 'unknown';
  let body: any;
  try { body = await request.json(); } catch { return json({ error: 'bad' }, 400); }
  const t = throttle(ip);
  if (t.locked) return json({ error: 'locked' }, 429);
  if (t.delayMs) await new Promise((r) => setTimeout(r, t.delayMs));
  const code = normalizeCode(body.code);
  try {
    if (!CODE_RE.test(code)) { miss(ip); return json({ error: 'code' }, 404); }
    if (body.action === 'submit') {
      const r = await submit(code, body);
      if (!r.ok) { if (r.error === 'code') miss(ip); return json({ error: r.error }, r.error === 'code' ? 404 : 400); }
      hit(ip);
      return json({ ok: true, practice: r.practice });
    }
    const h = await lookup(code);
    if (!h) { miss(ip); return json({ error: 'code' }, 404); }
    hit(ip);
    return json({ ...h, code, practice: practiceMode() });
  } catch (e) {
    console.error('rsvp', (e as Error).message);
    return json({ error: 'server' }, 500);
  }
};
