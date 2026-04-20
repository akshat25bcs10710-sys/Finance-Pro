import React from 'react';
import { FiFilter } from 'react-icons/fi';
import './Filters.css';

const CATEGORIES = [
  'All', 'Food', 'Travel', 'Rent', 'Shopping', 'Entertainment', 'Health', 'Utilities', 'Subscriptions', 'Salary', 'Freelance', 'Other'
];

const Filters = ({ filterType, setFilterType, filterCategory, setFilterCategory, sortBy, setSortBy }) => {
  return (
    <div className="filters-container glass-panel">
      <div className="filter-group">
        <label className="filter-label"><FiFilter /> Type</label>
        <select 
          className="form-select filter-select" 
          value={filterType} 
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      <div className="filter-group">
        <label className="filter-label">Category</label>
        <select 
          className="form-select filter-select" 
          value={filterCategory} 
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label className="filter-label">Sort By</label>
        <select 
          className="form-select filter-select" 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="date-desc">Newest First</option>
          <option value="date-asc">Oldest First</option>
          <option value="amount-desc">Amount (High to Low)</option>
          <option value="amount-asc">Amount (Low to High)</option>
          <option value="category">Category</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
