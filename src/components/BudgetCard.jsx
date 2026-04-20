import React from 'react';
import { useCurrency } from '../hooks/useCurrency';
import './BudgetCard.css';

const BudgetCard = ({ title, amount, used, percentage }) => {
  const { format } = useCurrency();
  
  let statusClass = 'good';
  if (percentage > 80) statusClass = 'warning';
  if (percentage > 95) statusClass = 'danger';

  return (
    <div className="budget-card glass-panel">
      <div className="bc-header">
        <h3>{title}</h3>
        <span className="bc-total">{format(amount)}</span>
      </div>
      <div className="bc-progress-container">
        <div className="bc-progress-bar">
          <div 
            className={`bc-progress-fill ${statusClass}`} 
            style={{ width: `${Math.min(percentage, 100)}%` }}
          ></div>
        </div>
      </div>
      <div className="bc-footer">
        <span>{format(used)} spent</span>
        <span>{percentage.toFixed(1)}% used</span>
      </div>
    </div>
  );
};

export default BudgetCard;
