export interface Company {
    name: string;
    description: string;
    primaryIndustry: string;
    size: string;
    type: string;
    location: string;
    country: string;
    url: string;
}

export interface CompanyFilters {
    industries: string[];
    excludedIndustries: string[];
    companySizes: string[];
    includeKeywords: string[];
    excludeKeywords: string[];
    countries: string[];
    includeCityState: string[];
    excludeCityState: string[];
    smartSearchQuery: string;
}