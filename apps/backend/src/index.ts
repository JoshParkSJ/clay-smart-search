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
  const { filters } = req.body;
  let result = [...companies];

  // Filter by industries
  if (filters.industries?.length > 0) {
    result = result.filter(company => 
      filters.industries.includes(company.primaryIndustry)
    );
  }

  // Exclude industries
  if (filters.excludedIndustries?.length > 0) {
    result = result.filter(company => 
      !filters.excludedIndustries.includes(company.primaryIndustry)
    );
  }

  // Filter by company size
  if (filters.companySizes?.length > 0) {
    result = result.filter(company => 
      filters.companySizes.includes(company.size)
    );
  }

  // Filter by company type
  if (filters.companyTypes?.length > 0) {
    result = result.filter(company => 
      filters.companyTypes.includes(company.type)
    );
  }

  // Filter by keywords (in name and description)
  if (filters.includeKeywords?.length > 0) {
    result = result.filter(company => {
      const searchText = `${company.name} ${company.description}`.toLowerCase();
      return filters.includeKeywords.some((keyword: string) => 
        searchText.includes(keyword.toLowerCase())
      );
    });
  }

  // Exclude keywords
  if (filters.excludeKeywords?.length > 0) {
    result = result.filter(company => {
      const searchText = `${company.name} ${company.description}`.toLowerCase();
      return !filters.excludeKeywords.some((keyword: string) => 
        searchText.includes(keyword.toLowerCase())
      );
    });
  }

  // Filter by countries
  if (filters.countries?.length > 0) {
    result = result.filter(company => 
      filters.countries.includes(company.country)
    );
  }

  // Filter by city/state
  if (filters.includeCityState?.length > 0) {
    result = result.filter(company => 
      filters.includeCityState.some((location: string) => 
        company.location.includes(location)
      )
    );
  }

  // Exclude city/state
  if (filters.excludeCityState?.length > 0) {
    result = result.filter(company => 
      !filters.excludeCityState.some((location: string) => 
        company.location.includes(location)
      )
    );
  }

  res.json(result);
});

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});