import React, { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useDebounce } from '../hooks/useDebounce';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  return (
    <div className="search-bar">
      <FiSearch className="search-icon" />
      <input
        type="text"
        placeholder="Search by title or notes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="form-input search-input"
      />
    </div>
  );
};

export default SearchBar;
