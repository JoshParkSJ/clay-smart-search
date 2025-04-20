import React, { useState } from 'react';
import './CompanySearch.css';
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

const CompanySearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [previewResults, setPreviewResults] = useState([]);
  const [companyFilters, setCompanyFilters] = useState({
    industries: [],
    excludedIndustries: [],
    companySizes: [],
    companyTypes: [],
    includeKeywords: '',
    excludeKeywords: '',
    minFollowers: '',
    countries: [],
    includeCityState: [],
    excludeCityState: [],
    smartSearchQuery: '',
  });

  // Sample data for dropdowns - you can replace these with your actual data
  const industryOptions = ['Software Development', 'Healthcare', 'Finance', 'Retail'];
  const companySizeOptions = ['1-10', '11-50', '51-200', '201-500', '501+'];
  const companyTypeOptions = ['Privately Held', 'Public', 'Non-profit', 'Government'];

  const handleFilterChange = (field, value) => {
    setCompanyFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePreviewCompanies = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulated delay
      // Sample data - replace with actual API response
      setPreviewResults([
        {
          name: 'Example Corp',
          description: 'A technology company focused on AI solutions',
          primaryIndustry: 'Software Development',
          size: '51-200',
          type: 'Privately Held',
          location: 'San Francisco, CA',
          country: 'United States',
          linkedinUrl: 'https://linkedin.com/company/example-corp'
        },
        // Add more sample data as needed
      ]);
    } catch (error) {
      console.error('Error fetching preview:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const RightColumnContent = () => {
    if (isLoading) {
      return (
        <div className="loading-container" style={{ textAlign: 'center', padding: '2rem' }}>
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
                    <a href={row.linkedinUrl} target="_blank" rel="noopener noreferrer">
                      {row.linkedinUrl}
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
      <div className="instructions-panel">
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
    <div className="company-search-container">
      <div className="search-filters">
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="company-content"
            id="company-header"
          >
            <div className="accordion-header">
              <span className="filter-icon">🏢</span>
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
                <TextField
                  fullWidth
                  placeholder="e.g. sales, data, outbound"
                  value={companyFilters.includeKeywords}
                  onChange={(e) => handleFilterChange('includeKeywords', e.target.value)}
                  size="small"
                />
              </div>

              <div>
                <Typography variant="body2" sx={{ mb: 0.5 }}>Exclude description keywords</Typography>
                <TextField
                  fullWidth
                  placeholder="e.g. agency, marketing"
                  value={companyFilters.excludeKeywords}
                  onChange={(e) => handleFilterChange('excludeKeywords', e.target.value)}
                  size="small"
                />
              </div>

              <div>
                <Typography variant="body2" sx={{ mb: 0.5 }}>Minimum follower count</Typography>
                <TextField
                  fullWidth
                  placeholder="e.g. 10"
                  type="number"
                  value={companyFilters.minFollowers}
                  onChange={(e) => handleFilterChange('minFollowers', e.target.value)}
                  size="small"
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
            <div className="accordion-header">
              <span className="filter-icon">📍</span>
              <Typography>Location</Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <div>
                <Typography variant="body2" sx={{ mb: 0.5 }}>Select one or more countries</Typography>
                <Autocomplete
                  multiple
                  options={["United States"]} // You can add country options here
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
                  options={["New York", "San Francisco", "Seattle"]} // You can add city/state options here
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
                  options={[]} // You can add city/state options here
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
            <div className="accordion-header">
              <span className="filter-icon">📊</span>
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
                onChange={(e) => handleFilterChange('smartSearchQuery', e.target.value)}
                size="small"
              />
            </div>
          </AccordionDetails>
        </Accordion>

        <button className="preview-button" onClick={handlePreviewCompanies}>
          Preview companies
        </button>
      </div>

      <div className="right-column">
        <RightColumnContent />
      </div>
    </div>
  );
};

export default CompanySearch;