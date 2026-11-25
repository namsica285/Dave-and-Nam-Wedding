// Minimal Google Sheets client for the RSVP page. Server-only: never imported by client code.
// It signs in as a "service account" (a robot login that only this website uses) with a private key
// that lives in Vercel's private settings, never in the repo.
import { createSign } from 'node:crypto';

export const SHEET_ID = process.env.RSVP_SHEET_ID || '1qj194QQtXA8ZMIRQdeVqFmrqWU-j2gzZnpnuFQyiuzM';

type Creds = { client_email: string; private_key: string };
function creds(): Creds | null {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!raw) return null;
  try {
    const j = JSON.parse(raw);
    return j.client_email && j.private_key ? { client_email: j.client_email, private_key: String(j.private_key).replace(/\\n/g, '\n') } : null;
  } catch { return null; }
}
/** True when no key is configured: the page runs on made-up practice households and saves nothing. */
export const practiceMode = () => !creds();

const b64 = (b: Buffer | string) => Buffer.from(b).toString('base64url');
let token: { v: string; exp: number } | null = null;
async function accessToken(): Promise<string> {
  const c = creds();
  if (!c) throw new Error('no credentials');
  if (token && token.exp > Date.now() + 60_000) return token.v;
  const now = Math.floor(Date.now() / 1000);
  const head = b64(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const body = b64(JSON.stringify({ iss: c.client_email, scope: 'https://www.googleapis.com/auth/spreadsheets', aud: 'https://oauth2.googleapis.com/token', iat: now, exp: now + 3600 }));
  const sig = createSign('RSA-SHA256').update(`${head}.${body}`).sign(c.private_key, 'base64url');
  const r = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: `${head}.${body}.${sig}` }),
  });
  if (!r.ok) throw new Error(`token ${r.status}`);
  const j = await r.json();
  token = { v: j.access_token, exp: Date.now() + (j.expires_in ?? 3600) * 1000 };
  return token.v;
}

const base = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}`;
export async function getRange(range: string): Promise<string[][]> {
  const r = await fetch(`${base}/values/${encodeURIComponent(range)}?valueRenderOption=FORMATTED_VALUE`, { headers: { authorization: `Bearer ${await accessToken()}` } });
  if (!r.ok) throw new Error(`read ${r.status}`);
  return (await r.json()).values ?? [];
}
/** Adds ONE row in the first empty row at the bottom. RAW means nothing a guest types can ever run as a formula.
 *  OVERWRITE (not INSERT_ROWS) fills an empty row instead of inserting one, so formulas elsewhere in the
 *  Command Center that point at "Form responses" row 2 onward never get shifted. */
export async function appendRow(range: string, row: (string | number)[]): Promise<void> {
  const r = await fetch(`${base}/values/${encodeURIComponent(range)}:append?valueInputOption=RAW&insertDataOption=OVERWRITE`, {
    method: 'POST', headers: { authorization: `Bearer ${await accessToken()}`, 'content-type': 'application/json' }, body: JSON.stringify({ values: [row] }),
  });
  if (!r.ok) throw new Error(`append ${r.status}`);
}
