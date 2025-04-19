import React, { useState } from 'react';
import '../App.css';
import clayLogo from '../assets/clay-logo.png';
import emptyStateImage from '../assets/empty.png';
import companiesImage from '../assets/companies.png';

const ExcelUI = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSheet, setActiveSheet] = useState('overview');

  return (
    <div className="excel-container">
      {/* Header */}
      <div className="header">
        <div className="header-left">
          <div className="clay-logo">
            <img src={clayLogo} alt="Clay Logo" style={{ height: '24px', width: 'auto', marginTop: '5px' }} />
          </div>
          <div className="workbook-title">Workspace / My workbook</div>
        </div>
        <div className="header-right">
          <div className="user-profile">My Workspace</div>
        </div>
      </div>

      {/* Left Sidebar */}
      <div className="sidebar">
        <div className="section">
          <div className="section-title"><strong>Add a source</strong></div>
          {/* <button className="source-button">
            <span className="icon">👤</span>
            Find people
          </button> */}
          <button className="source-button">
            <span className="icon">
                <img src={companiesImage} alt="Find companies" style={{ height: '24px', width: 'auto' }} />
            </span>
            Find companies
          </button>
          {/* <button className="source-button">
            <span className="icon">💼</span>
            Find jobs
          </button>
          <button className="source-button">
            <span className="icon">🏪</span>
            Find local businesses
          </button>
          <button className="source-button">
            <span className="icon">📄</span>
            Import from CSV
          </button>
          <button className="source-button">
            <span className="icon">➕</span>
            More sources...
          </button> */}
        </div>

        {/* <div className="section">
          <div className="section-title">Create a table</div>
          <button className="source-button">
            <span className="icon">📋</span>
            Blank table
          </button>
          <button className="source-button">
            <span className="icon">📑</span>
            Use a table template
          </button>
        </div> */}
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        <div className="empty-state">
          <div className="empty-state-graphics">
            <img 
              src={emptyStateImage} 
              alt="Empty state illustration" 
              style={{ maxWidth: '300px', width: '100%', height: 'auto' }} 
              className="empty-state-image" 
            />
          </div>
          <h2>This workbook does not contain any data</h2>
          <p>Add a source or create a table to get started</p>
        </div>
      </div>

      {/* Bottom Sheet Navigation */}
      <div className="sheet-navigation">
        <div className="sheet-tabs">
          <button 
            className={`sheet-tab ${activeSheet === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveSheet('overview')}
          >
            <span className="overview-icon">📊</span>
            Overview
          </button>
          <button className="add-sheet-button" onClick={() => setIsModalOpen(true)}>
            + Add
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add Sheet</h2>
              <button className="close-button" onClick={() => setIsModalOpen(false)}>
                ×
              </button>
            </div>
            <div className="modal-content">
              {/* Modal content will be added later */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExcelUI; 