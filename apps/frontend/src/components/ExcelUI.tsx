'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import '../styles/Excel.module.css';
import clayLogo from '../assets/clay-logo.png';
import emptyStateImage from '../assets/empty.png';
import companiesImage from '../assets/companies.png';
import CompanySearch from './CompanySearch';

const ExcelUI = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSheet, setActiveSheet] = useState('overview');

  return (
    <div className="excel-container">
      {/* Header */}
      <div className="header">
        <div className="header-left">
          <div className="clay-logo">
            <Image src={clayLogo} alt="Clay Logo" width={24} height={24} style={{ marginTop: '5px' }} />
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
          <button className="source-button" onClick={() => setIsModalOpen(true)}>
            <span className="icon">
                <Image src={companiesImage} alt="Find companies" width={24} height={24} />
            </span>
            <strong>Find companies</strong>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        <div className="empty-state">
          <div className="empty-state-graphics">
            <Image 
              src={emptyStateImage} 
              alt="Empty state illustration" 
              width={270}
              height={270}
              style={{ width: '100%', height: 'auto' }}
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
              <h2>💼 Find Companies</h2>
              <button className="close-button" onClick={() => setIsModalOpen(false)}>
                ×
              </button>
            </div>
            <div className="modal-content">
                <CompanySearch />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExcelUI; 