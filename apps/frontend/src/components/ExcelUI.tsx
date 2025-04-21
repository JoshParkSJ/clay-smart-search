'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from '../styles/Excel.module.css';
import clayLogo from '../assets/clay-logo.png';
import emptyStateImage from '../assets/empty.png';
import companiesImage from '../assets/companies.png';
import CompanySearch from './CompanySearch';

const ExcelUI = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSheet, setActiveSheet] = useState('overview');

  return (
    <div className={styles['excel-container']}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles['header-left']}>
          <div className={styles['clay-logo']}>
            <Image src={clayLogo} alt="Clay Logo" width={24} height={24} style={{ marginTop: '5px' }} />
          </div>
          <div className={styles['workbook-title']}>Workspace / My workbook</div>
        </div>
        <div className={styles['header-right']}>
          <div className={styles['user-profile']}>My Workspace</div>
        </div>
      </div>

      {/* Left Sidebar */}
      <div className={styles.sidebar}>
        <div className={styles.section}>
          <div className={styles['section-title']}><strong>Add a source</strong></div>
          <button className={styles['source-button']} onClick={() => setIsModalOpen(true)}>
            <span className={styles.icon}>
                <Image src={companiesImage} alt="Find companies" width={24} height={24} />
            </span>
            <strong>Find companies</strong>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className={styles['main-content']}>
        <div className={styles['empty-state']}>
          <div className={styles['empty-state-graphics']}>
            <Image 
              src={emptyStateImage} 
              alt="Empty state illustration" 
              width={270}
              height={270}
              style={{ width: '100%', height: 'auto' }}
              className={styles['empty-state-image']} 
            />
          </div>
          <h2>This workbook does not contain any data</h2>
          <p>Add a source or create a table to get started</p>
        </div>
      </div>

      {/* Bottom Sheet Navigation */}
      <div className={styles['sheet-navigation']}>
        <div className={styles['sheet-tabs']}>
          <button
            className={`${styles['sheet-tab']} ${activeSheet === 'overview' ? styles.active : ''}`}
            onClick={() => setActiveSheet('overview')}
          >
            <span className={styles['overview-icon']}>📊</span>
            Overview
          </button>
          <button className={styles['add-sheet-button']} onClick={() => setIsModalOpen(true)}>
            + Add
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className={styles['modal-overlay']} onClick={() => setIsModalOpen(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles['modal-header']}>
              <h2>💼 Find Companies</h2>
              <button className={styles['close-button']} onClick={() => setIsModalOpen(false)}>
                ×
              </button>
            </div>
            <div className={styles['modal-content']}>
                <CompanySearch />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExcelUI; 