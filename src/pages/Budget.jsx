import React, { useState } from 'react';
import { useBudget } from '../hooks/useBudget';
import BudgetCard from '../components/BudgetCard';
import { toast } from 'react-toastify';
import { useCurrency } from '../hooks/useCurrency';
import './Budget.css';

const Budget = () => {
  const { budget, updateBudget, remainingBudget, percentageUsed, totalExpense } = useBudget();
  const { format } = useCurrency();
  const [newBudget, setNewBudget] = useState(budget);

  const handleUpdateBudget = (e) => {
    e.preventDefault();
    if (newBudget > 0) {
      updateBudget(Number(newBudget));
      toast.success('Monthly budget updated!');
    }
  };

  return (
    <div className="budget-page animate-fade-in">
      <header className="page-header">
        <div>
          <h1 className="text-gradient">Budget Tracking</h1>
          <p className="text-muted">Monitor your monthly spending limits.</p>
        </div>
      </header>

      <div className="budget-content">
        <div className="budget-cards-section">
          <BudgetCard 
            title="Monthly Overview" 
            amount={budget} 
            used={totalExpense} 
            percentage={percentageUsed} 
          />
          
          <div className="remaining-card glass-panel">
            <h3>Remaining Budget</h3>
            <p className={`remaining-amount ${remainingBudget < 0 ? 'danger' : 'success'}`}>
              {remainingBudget < 0 ? '-' : '+'}{format(Math.abs(remainingBudget))}
            </p>
            {remainingBudget < 0 && (
              <p className="form-error">You have exceeded your monthly budget!</p>
            )}
          </div>
        </div>

        <div className="update-budget-section glass-panel">
          <h3>Update Monthly Budget</h3>
          <p className="text-muted mb-4">Set a realistic budget to build healthy financial habits.</p>
          
          <form onSubmit={handleUpdateBudget} className="update-budget-form">
            <div className="form-group">
              <label className="form-label">New Budget Amount</label>
              <input 
                type="number" 
                className="form-input" 
                value={newBudget}
                onChange={(e) => setNewBudget(e.target.value)}
                min="1"
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Save Budget</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Budget;
