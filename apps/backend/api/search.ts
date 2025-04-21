import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Company } from '@clay-smart-search/shared';

const companies: Company[] = require('../data/companies.json');

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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
}