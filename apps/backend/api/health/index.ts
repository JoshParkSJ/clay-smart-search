import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function healthHandler(req: VercelRequest, res: VercelResponse) {
  try {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
  } catch (error) {
    console.error('Health check error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
