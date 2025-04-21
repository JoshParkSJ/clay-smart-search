'use client';

import React, { useState } from 'react';
import styles from '../styles/CompanySearch.module.css';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Autocomplete,
  Chip,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Company, CompanyFilters } from "@clay-smart-search/shared";
import { searchCompanies } from "../utils/search";

const CompanySearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [previewResults, setPreviewResults] = useState<Company[]>([]);
  const [companyFilters, setCompanyFilters] = useState<CompanyFilters>({
    industries: [],
    excludedIndustries: [],
    companySizes: [],
    companyTypes: [],
    includeKeywords: [],
    excludeKeywords: [],
    countries: [],
    includeCityState: [],
    excludeCityState: [],
    smartSearchQuery: '',
  });

  // Sample data for dropdowns - you can replace these with your actual data
  const industryOptions = ['Software Development', 'Healthcare', 'Finance', 'Retail'];
  const companySizeOptions = ['1-10', '11-50', '51-200', '201-500', '501+'];
  const companyTypeOptions = ['Privately Held', 'Public', 'Non-profit', 'Government'];
  const companyCountryOptions = ["United States"];
  const companyCityOptions = ["New York", "San Francisco", "Seattle"];
  const companyCityExcludeOptions = ["New York", "San Francisco", "Seattle"];

  const handleFilterChange = (field: keyof CompanyFilters, value: string | string[]) => {
    setCompanyFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePreviewCompanies = async () => {
    setIsLoading(true);
    try {
      const result = await searchCompanies(companyFilters)

      setPreviewResults(result);
    } catch (error) {
      console.error('Error fetching preview:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const RightColumnContent = () => {
    if (isLoading) {
      return (
        <div className={styles['loading-container']} style={{ textAlign: 'center', padding: '2rem' }}>
          <CircularProgress />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Generating your preview. This may take a few moments...
          </Typography>
        </div>
      );
    }

    if (previewResults.length > 0) {
      return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="preview results">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Primary Industry</TableCell>
                <TableCell>Size</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>LinkedIn URL</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {previewResults.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.primaryIndustry}</TableCell>
                  <TableCell>{row.size}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{row.location}</TableCell>
                  <TableCell>{row.country}</TableCell>
                  <TableCell>
                    <a href={row.url} target="_blank" rel="noopener noreferrer">
                      {row.url}
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    }

    return (
      <div className={styles['instructions-panel']}>
        <h2>Create a list of companies</h2>
        <ol>
          <li>Construct your search! Start with company size or location</li>
          <li>Preview company profiles that match your search</li>
          <li>Once satisfied, import full list into a Clay table!</li>
        </ol>
      </div>
    );
  };

  return (
    <div className={styles['company-search-container']}>
      <div className={styles['search-filters']}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="company-content"
            id="company-header"
          >
            <div className={styles['accordion-header']}>
              <span className={styles['filter-icon']}>🏢</span>
              <Typography>Company</Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <div>
                <Typography variant="body2" sx={{ mb: 0.5 }}>Select one or more industries</Typography>
                <Autocomplete
                  multiple
                  options={industryOptions}
                  value={companyFilters.industries}
                  onChange={(_, newValue) => handleFilterChange('industries', newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="e.g. Software Development"
                      size="small"
                    />
                  )}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip label={option} {...getTagProps({ index })} />
                    ))
                  }
                />
              </div>

              <div>
                <Typography variant="body2" sx={{ mb: 0.5 }}>Exclude one or more industries</Typography>
                <Autocomplete
                  multiple
                  options={industryOptions}
                  value={companyFilters.excludedIndustries}
                  onChange={(_, newValue) => handleFilterChange('excludedIndustries', newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="e.g. Advertising Services"
                      size="small"
                    />
                  )}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip label={option} {...getTagProps({ index })} />
                    ))
                  }
                />
              </div>

              <div>
                <Typography variant="body2" sx={{ mb: 0.5 }}>Select one or more company sizes</Typography>
                <Autocomplete
                  multiple
                  options={companySizeOptions}
                  value={companyFilters.companySizes}
                  onChange={(_, newValue) => handleFilterChange('companySizes', newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="e.g. 11-50 employees"
                      size="small"
                    />
                  )}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip label={option} {...getTagProps({ index })} />
                    ))
                  }
                />
              </div>

              <div>
                <Typography variant="body2" sx={{ mb: 0.5 }}>Select one or more company types</Typography>
                <Autocomplete
                  multiple
                  options={companyTypeOptions}
                  value={companyFilters.companyTypes}
                  onChange={(_, newValue) => handleFilterChange('companyTypes', newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="e.g. Privately Held"
                      size="small"
                    />
                  )}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip label={option} {...getTagProps({ index })} />
                    ))
                  }
                />
              </div>

              <div>
                <Typography variant="body2" sx={{ mb: 0.5 }}>Include description keywords</Typography>
                <Autocomplete
                  multiple
                  freeSolo
                  options={[]}
                  value={companyFilters.includeKeywords}
                  onChange={(_, newValue) => handleFilterChange('includeKeywords', newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="e.g. sales, data, outbound"
                      size="small"
                    />
                  )}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip label={option} {...getTagProps({ index })} />
                    ))
                  }
                />
              </div>

              <div>
                <Typography variant="body2" sx={{ mb: 0.5 }}>Exclude description keywords</Typography>
                <Autocomplete
                  multiple
                  freeSolo
                  options={[]}
                  value={companyFilters.excludeKeywords}
                  onChange={(_, newValue) => handleFilterChange('excludeKeywords', newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="e.g. agency, marketing"
                      size="small"
                    />
                  )}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip label={option} {...getTagProps({ index })} />
                    ))
                  }
                />

              </div>

            </Box>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="location-content"
            id="location-header"
          >
            <div className={styles['accordion-header']}>
              <span className={styles['filter-icon']}>📍</span>
              <Typography>Location</Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <div>
                <Typography variant="body2" sx={{ mb: 0.5 }}>Select one or more countries</Typography>
                <Autocomplete
                  multiple
                  options={companyCountryOptions}
                  value={companyFilters.countries}
                  onChange={(_, newValue) => handleFilterChange('countries', newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="e.g. United States"
                      size="small"
                    />
                  )}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip label={option} {...getTagProps({ index })} />
                    ))
                  }
                />
              </div>

              <div>
                <Typography variant="body2" sx={{ mb: 0.5 }}>Include city or state</Typography>
                <Autocomplete
                  multiple
                  options={companyCityOptions}
                  value={companyFilters.includeCityState}
                  onChange={(_, newValue) => handleFilterChange('includeCityState', newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="e.g. New York"
                      size="small"
                    />
                  )}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip label={option} {...getTagProps({ index })} />
                    ))
                  }
                />
              </div>

              <div>
                <Typography variant="body2" sx={{ mb: 0.5 }}>Exclude city or state</Typography>
                <Autocomplete
                  multiple
                  options={companyCityExcludeOptions}
                  value={companyFilters.excludeCityState}
                  onChange={(_, newValue) => handleFilterChange('excludeCityState', newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="e.g. San Francisco"
                      size="small"
                    />
                  )}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip label={option} {...getTagProps({ index })} />
                    ))
                  }
                />
              </div>
            </Box>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="limit-results-content"
            id="limit-results-header"
          >
            <div className={styles['accordion-header']}>
              <span className={styles['filter-icon']}>📊</span>
              <Typography>Smart Search</Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              <Typography variant="body2" sx={{ mb: 0.5 }}>Semantic query</Typography>
              <TextField
                fullWidth
                placeholder="e.g. AI ambient scribes in healthcare"
                type="string"
                value={companyFilters.smartSearchQuery}
                onChange={(e) => handleFilterChange('smartSearchQuery', e.target.value as string)}
                size="small"
              />
            </div>
          </AccordionDetails>
        </Accordion>

        <button className={styles['preview-button']} onClick={handlePreviewCompanies}>
          Preview companies
        </button>
      </div>

      <div className={styles['right-column']}>
        <RightColumnContent />
      </div>
    </div>
  );
};

export default CompanySearch;