import React from 'react';
import { Link } from 'react-router-dom';
import { useTransactions } from '../hooks/useTransactions';
import { useCurrency } from '../hooks/useCurrency';
import { ExpensePieChart, IncomeExpenseBarChart } from '../components/Charts';
import { FiTrendingUp, FiTrendingDown, FiDollarSign, FiStar, FiGlobe } from 'react-icons/fi';
import { fetchExchangeRates } from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const { totalIncome, totalExpense, netBalance, topCategory, expensesByCategory } = useTransactions();
  const { format } = useCurrency();
  const [exchangeRate, setExchangeRate] = React.useState(null);

  React.useEffect(() => {
    fetchExchangeRates('USD')
      .then(data => {
        if (data && data.rates && data.rates.INR) {
          setExchangeRate(data.rates.INR);
        }
      })
      .catch(err => console.error(err));
  }, []);

  const statCards = [
    { title: 'Total Income', amount: totalIncome, icon: <FiTrendingUp />, color: 'success' },
    { title: 'Total Expenses', amount: totalExpense, icon: <FiTrendingDown />, color: 'danger' },
    { title: 'Net Balance', amount: netBalance, icon: <FiDollarSign />, color: 'info' },
  ];

  return (
    <div className="dashboard-page animate-fade-in">
      <header className="page-header">
        <div>
          <h1 className="text-gradient">Financial Overview</h1>
          <p className="text-muted">Welcome back! Here's your financial summary.</p>
        </div>
        <Link to="/transactions/new" className="btn btn-primary">
          + Add Transaction
        </Link>
      </header>

      <div className="stats-grid">
        {statCards.map((stat, idx) => (
          <div key={idx} className="stat-card glass-panel">
            <div className={`stat-icon ${stat.color}`}>
              {stat.icon}
            </div>
            <div className="stat-info">
              <h3 className="stat-title">{stat.title}</h3>
              <p className={`stat-amount ${stat.color}`}>{format(stat.amount)}</p>
            </div>
          </div>
        ))}
        <div className="stat-card glass-panel">
          <div className="stat-icon warning">
            <FiStar />
          </div>
          <div className="stat-info">
            <h3 className="stat-title">Top Category</h3>
            <p className="stat-amount">{topCategory || 'N/A'}</p>
          </div>
        </div>
        {exchangeRate && (
          <div className="stat-card glass-panel">
            <div className="stat-icon" style={{ color: '#06b6d4', background: 'rgba(6, 182, 212, 0.1)' }}>
              <FiGlobe />
            </div>
            <div className="stat-info">
              <h3 className="stat-title">USD to INR</h3>
              <p className="stat-amount">₹{exchangeRate.toFixed(2)}</p>
            </div>
          </div>
        )}
      </div>

      <div className="charts-grid">
        <div className="chart-card glass-panel">
          <h3>Expenses by Category</h3>
          <ExpensePieChart data={expensesByCategory} />
        </div>
        <div className="chart-card glass-panel">
          <h3>Income vs Expense</h3>
          <IncomeExpenseBarChart totalIncome={totalIncome} totalExpense={totalExpense} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
