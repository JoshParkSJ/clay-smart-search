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
    <div className={styles.excelContainer}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.clayLogo}>
            <Image src={clayLogo} alt="Clay Logo" width={24} height={24} style={{ marginTop: '5px' }} />
          </div>
          <div className={styles.workbookTitle}>Workspace / My workbook</div>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.userProfile}>My Workspace</div>
        </div>
      </div>

      {/* Left Sidebar */}
      <div className={styles.sidebar}>
        <div className={styles.section}>
          <div className={styles.sectionTitle}><strong>Add a source</strong></div>
          <button className={styles.sourceButton} onClick={() => setIsModalOpen(true)}>
            <span className={styles.icon}>
                <Image src={companiesImage} alt="Find companies" width={24} height={24} />
            </span>
            <strong>Find companies</strong>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className={styles.mainContent}>
        <div className={styles.emptyState}>
          <div className={styles.emptyStateGraphics}>
            <Image 
              src={emptyStateImage} 
              alt="Empty state illustration" 
              width={270}
              height={270}
              style={{ width: '100%', height: 'auto' }}
              className={styles.emptyStateImage} 
            />
          </div>
          <h2>This workbook does not contain any data</h2>
          <p>Add a source or create a table to get started</p>
        </div>
      </div>

      {/* Bottom Sheet Navigation */}
      <div className={styles.sheetNavigation}>
        <div className={styles.sheetTabs}>
          <button
            className={`${styles.sheetTab} ${activeSheet === 'overview' ? styles.active : ''}`}
            onClick={() => setActiveSheet('overview')}
          >
            <span className={styles.overviewIcon}>📊</span>
            Overview
          </button>
          <button className={styles.addSheetButton} onClick={() => setIsModalOpen(true)}>
            + Add
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>💼 Find Companies</h2>
              <button className={styles.closeButton} onClick={() => setIsModalOpen(false)}>
                ×
              </button>
            </div>
            <div className={styles.modalContent}>
                <CompanySearch />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExcelUI; 