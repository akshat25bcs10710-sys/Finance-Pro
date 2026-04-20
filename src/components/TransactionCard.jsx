import React from 'react';
import { format } from 'date-fns';
import { FiTrash2, FiEdit2, FiRepeat } from 'react-icons/fi';
import { useCurrency } from '../hooks/useCurrency';
import './TransactionCard.css';

const TransactionCard = ({ transaction, onDelete, onEdit }) => {
  const { format: formatCurr } = useCurrency();
  const isIncome = transaction.type === 'income';

  return (
    <div className="transaction-card glass-panel">
      <div className="tc-icon" data-type={transaction.type}>
        {transaction.category.charAt(0).toUpperCase()}
      </div>
      <div className="tc-details">
        <div className="tc-header">
          <h4>{transaction.title}</h4>
          {transaction.recurring && (
            <span className="recurring-badge" title="Recurring Transaction">
              <FiRepeat />
            </span>
          )}
        </div>
        <p className="tc-category-date">
          {transaction.category} • {format(new Date(transaction.date), 'dd MMM yyyy')}
        </p>
        {transaction.notes && <p className="tc-notes">{transaction.notes}</p>}
      </div>
      <div className="tc-actions-amount">
        <div className={`tc-amount ${isIncome ? 'income' : 'expense'}`}>
          {isIncome ? '+' : '-'}{formatCurr(transaction.amount)}
        </div>
        <div className="tc-actions">
          <button className="icon-btn edit-btn" onClick={() => onEdit(transaction)}>
            <FiEdit2 />
          </button>
          <button className="icon-btn delete-btn" onClick={() => onDelete(transaction.id)}>
            <FiTrash2 />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
