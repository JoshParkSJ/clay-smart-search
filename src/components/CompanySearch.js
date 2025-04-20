import React, { useState } from 'react';
import './CompanySearch.css';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CompanySearch = () => {
  const [searchParams, setSearchParams] = useState({
    company: '',
    location: '',
    limitResults: ''
  });

  const handlePreviewCompanies = () => {
    // Handle preview logic here
    console.log('Preview companies with params:', searchParams);
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
            <Typography>
              Company filter content goes here
            </Typography>
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
            <Typography>
              Location filter content goes here
            </Typography>
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
              <Typography>Limit Results</Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Limit results filter content goes here
            </Typography>
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
              <Typography>Limit Results</Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Limit results filter content goes here
            </Typography>
          </AccordionDetails>
        </Accordion>

        <button className="preview-button" onClick={handlePreviewCompanies}>
          Preview companies
        </button>
      </div>

      <div className="right-column">
        <div className="instructions-panel">
          <h2>Create a list of companies</h2>
          <ol>
            <li>Construct your search! Start with company size or location</li>
            <li>Preview company profiles that match your search</li>
            <li>Once satisfied, import full list into a Clay table!</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default CompanySearch; 