// RSVP rules in one place: find a household by code, remember its last answer, add one row per reply.
import { practiceMode, getRange, appendRow } from './sheets';

export const CODE_RE = /^[2346789BCDFGHJKMNPQRTVWXYZ]{4}$/;
export const normalizeCode = (s: unknown) => String(s ?? '').toUpperCase().replace(/[^A-Z0-9]/g, '');

export type Household = { id: string; name: string; max: number; attending?: 'yes' | 'no'; count?: number; email?: string };

// Made-up households for practice mode (no key configured): nothing is read from or saved to the real sheet.
const PRACTICE: Record<string, Household> = {
  '2346': { id: 'P1', name: 'The Practice Family', max: 4 },
  '7777': { id: 'P2', name: 'Alex & Sam', max: 2 },
};

type Found = Household & { latest: string[] | null };
async function find(code: string): Promise<Found | null> {
  if (practiceMode()) { const h = PRACTICE[code]; return h ? { ...h, latest: null } : null; }
  const log = await getRange("'Invite code log'!A2:B");
  const hid = log.find((r) => (r[0] || '').trim().toUpperCase() === code)?.[1]?.trim();
  if (!hid) return null;
  const list = await getRange("'Invite List'!B5:I");           // B name, C people, D kids ... I household id
  const row = list.find((r) => (r[7] || '').trim() === hid);
  if (!row) return null;
  const people = parseInt(row[1] || '0', 10);
  const responses = await getRange("'Form responses'!A2:I");
  const latest = [...responses].reverse().find((r) => (r[1] || '').trim() === hid) || null;
  const said = (latest?.[6] || '').toLowerCase();
  return {
    id: hid, name: (row[0] || '').trim(), max: Math.min(Math.max(people || 1, 1), 12), latest,
    attending: said.startsWith('y') ? 'yes' : said.startsWith('n') ? 'no' : undefined,
    count: latest?.[7] ? parseInt(latest[7], 10) : undefined, email: latest?.[4] || undefined,
  };
}

/** What a guest may see: their household's name, how many seats, and their own earlier answer. Never addresses. */
export async function lookup(code: string) {
  const f = await find(code);
  if (!f) return null;
  return { name: f.name, max: f.max, attending: f.attending, count: f.count, email: f.email };
}

const EMAIL = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,}$/;
export async function submit(code: string, input: { attending?: unknown; count?: unknown; email?: unknown }) {
  const f = await find(code);
  if (!f) return { ok: false as const, error: 'code' };
  const yes = input.attending === 'yes';
  if (!yes && input.attending !== 'no') return { ok: false as const, error: 'attending' };
  const count = yes ? Number(input.count) : 0;
  if (yes && (!Number.isInteger(count) || count < 1 || count > f.max)) return { ok: false as const, error: 'count' };
  const email = String(input.email ?? '').trim();
  if (email && !EMAIL.test(email)) return { ok: false as const, error: 'email' };
  if (!practiceMode()) {
    // The Addresses tab reads the LAST row for a household. So each reply row carries forward the address,
    // email and save-the-date answer from the previous row, and only the RSVP columns change.
    const p = f.latest || [];
    await appendRow("'Form responses'!A:I", [new Date().toISOString(), f.id, p[2] || '', p[3] || '', email || p[4] || '', p[5] || '', yes ? 'Yes' : 'No', yes ? count : 0, code]);
  }
  return { ok: true as const, practice: practiceMode() };
}

// Wrong-code limits (best effort per server instance): slows after 5 misses, locks for an hour after 10.
const misses = new Map<string, { n: number; first: number; lockUntil: number }>();
const HOUR = 3_600_000;
export function throttle(ip: string): { locked: boolean; delayMs: number } {
  const m = misses.get(ip);
  const now = Date.now();
  if (!m) return { locked: false, delayMs: 0 };
  if (m.lockUntil > now) return { locked: true, delayMs: 0 };
  if (now - m.first > HOUR) { misses.delete(ip); return { locked: false, delayMs: 0 }; }
  return { locked: false, delayMs: m.n >= 5 ? Math.min((m.n - 4) * 1200, 6000) : 0 };
}
export function miss(ip: string) {
  const now = Date.now();
  const m = misses.get(ip) ?? { n: 0, first: now, lockUntil: 0 };
  m.n += 1;
  if (m.n >= 10) m.lockUntil = now + HOUR;
  misses.set(ip, m);
}
export function hit(ip: string) { misses.delete(ip); }
