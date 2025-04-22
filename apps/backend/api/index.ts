import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    res.status(200).json({ message: 'Clay Smart Search API is running!' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}