import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTransactions } from '../hooks/useTransactions';
import TransactionCard from '../components/TransactionCard';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import './Transactions.css';
import { toast } from 'react-toastify';

const Transactions = () => {
  const { transactions, deleteTransaction } = useTransactions();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('All');
  const [sortBy, setSortBy] = useState('date-desc');

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id);
      toast.success('Transaction deleted');
    }
  };

  const handleEdit = (transaction) => {
    navigate('/transactions/new', { state: { editData: transaction } });
  };

  const filteredAndSortedTransactions = useMemo(() => {
    let result = [...transactions];

    // Search
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(
        t => t.title.toLowerCase().includes(lowerQuery) || 
             (t.notes && t.notes.toLowerCase().includes(lowerQuery))
      );
    }

    // Filter by Type
    if (filterType !== 'all') {
      result = result.filter(t => t.type === filterType);
    }

    // Filter by Category
    if (filterCategory !== 'All') {
      result = result.filter(t => t.category === filterCategory);
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'date-desc') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'date-asc') return new Date(a.date) - new Date(b.date);
      if (sortBy === 'amount-desc') return b.amount - a.amount;
      if (sortBy === 'amount-asc') return a.amount - b.amount;
      if (sortBy === 'category') return a.category.localeCompare(b.category);
      return 0;
    });

    return result;
  }, [transactions, searchQuery, filterType, filterCategory, sortBy]);

  return (
    <div className="transactions-page animate-fade-in">
      <header className="page-header">
        <div>
          <h1 className="text-gradient">Transactions</h1>
          <p className="text-muted">Manage your income and expenses.</p>
        </div>
      </header>

      <div className="controls-section">
        <SearchBar onSearch={setSearchQuery} />
        <Filters 
          filterType={filterType} setFilterType={setFilterType}
          filterCategory={filterCategory} setFilterCategory={setFilterCategory}
          sortBy={sortBy} setSortBy={setSortBy}
        />
      </div>

      <div className="transactions-list">
        {filteredAndSortedTransactions.length > 0 ? (
          filteredAndSortedTransactions.map(transaction => (
            <TransactionCard 
              key={transaction.id} 
              transaction={transaction} 
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))
        ) : (
          <div className="empty-state glass-panel">
            <p>No transactions found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Transactions;
