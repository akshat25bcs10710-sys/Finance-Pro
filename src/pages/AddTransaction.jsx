import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTransactions } from '../hooks/useTransactions';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import './AddTransaction.css';

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  amount: yup.number().positive('Amount must be positive').required('Amount is required'),
  category: yup.string().required('Category is required'),
  date: yup.date().required('Date is required'),
  type: yup.string().oneOf(['income', 'expense']).required('Type is required'),
  notes: yup.string(),
  recurring: yup.boolean()
});

const CATEGORIES = [
  'Food', 'Travel', 'Rent', 'Shopping', 'Entertainment', 'Health', 'Utilities', 'Subscriptions', 'Salary', 'Freelance', 'Other'
];

const AddTransaction = () => {
  const { addTransaction, updateTransaction } = useTransactions();
  const navigate = useNavigate();
  const location = useLocation();
  const editData = location.state?.editData;

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      type: 'expense',
      date: new Date().toISOString().split('T')[0],
      recurring: false
    }
  });

  useEffect(() => {
    if (editData) {
      setValue('title', editData.title);
      setValue('amount', editData.amount);
      setValue('category', editData.category);
      setValue('date', new Date(editData.date).toISOString().split('T')[0]);
      setValue('type', editData.type);
      setValue('notes', editData.notes || '');
      setValue('recurring', editData.recurring || false);
    }
  }, [editData, setValue]);

  const onSubmit = (data) => {
    if (editData) {
      updateTransaction(editData.id, { ...data, date: new Date(data.date).toISOString() });
      toast.success('Transaction updated successfully');
    } else {
      addTransaction({
        ...data,
        id: uuidv4(),
        date: new Date(data.date).toISOString()
      });
      toast.success('Transaction added successfully');
    }
    navigate('/transactions');
  };

  return (
    <div className="add-transaction-page animate-fade-in">
      <header className="page-header">
        <div>
          <h1 className="text-gradient">{editData ? 'Edit Transaction' : 'Add Transaction'}</h1>
          <p className="text-muted">Record a new financial activity.</p>
        </div>
      </header>

      <div className="form-container glass-panel">
        <form onSubmit={handleSubmit(onSubmit)} className="transaction-form">
          <div className="form-row">
            <div className="form-group half">
              <label className="form-label">Type</label>
              <select className="form-select" {...register('type')}>
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
              {errors.type && <span className="form-error">{errors.type.message}</span>}
            </div>
            <div className="form-group half">
              <label className="form-label">Amount</label>
              <input type="number" step="0.01" className="form-input" {...register('amount')} />
              {errors.amount && <span className="form-error">{errors.amount.message}</span>}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Title</label>
            <input type="text" className="form-input" placeholder="e.g. Monthly Groceries" {...register('title')} />
            {errors.title && <span className="form-error">{errors.title.message}</span>}
          </div>

          <div className="form-row">
            <div className="form-group half">
              <label className="form-label">Category</label>
              <select className="form-select" {...register('category')}>
                <option value="">Select Category...</option>
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.category && <span className="form-error">{errors.category.message}</span>}
            </div>
            <div className="form-group half">
              <label className="form-label">Date</label>
              <input type="date" className="form-input" {...register('date')} />
              {errors.date && <span className="form-error">{errors.date.message}</span>}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Notes (Optional)</label>
            <textarea className="form-textarea" rows="3" {...register('notes')}></textarea>
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input type="checkbox" {...register('recurring')} />
              <span>Mark as recurring transaction (e.g. subscriptions, rent)</span>
            </label>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
            <button type="submit" className="btn btn-primary">
              {editData ? 'Update Transaction' : 'Save Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;
