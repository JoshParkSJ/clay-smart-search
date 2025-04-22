import type { VercelRequest, VercelResponse } from '@vercel/node';

// This is the serverless function that Vercel will execute
export default async function apiHandler(req: VercelRequest, res: VercelResponse) {
  try {
    // Set proper headers
    res.setHeader('Content-Type', 'application/json');
    
    // Send response
    res.status(200).json({ 
      message: 'Clay Smart Search API is running!',
      timestamp: new Date().toISOString() 
    });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}