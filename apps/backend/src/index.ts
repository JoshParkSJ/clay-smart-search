import { Request, Response } from 'express';
import { Company } from '@clay-smart-search/shared';

const express = require('express');
const cors = require('cors');
const companies: Company[] = require('./data/companies.json');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

app.post('/api/search', (req: Request, res: Response) => {
  const result = companies;

  res.json(result);
});

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});