import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req, res) {
  res.json({ status: 'ok' });
}
