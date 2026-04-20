import { useContext } from 'react';
import { FinanceContext } from '../context/FinanceContext';
import { useTransactions } from './useTransactions';

export const useBudget = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useBudget must be used within a FinanceProvider');
  }

  const { budget, updateBudget } = context;
  const { totalExpense } = useTransactions();

  const remainingBudget = budget.monthlyBudget - totalExpense;
  const percentageUsed = budget.monthlyBudget > 0 
    ? Math.min((totalExpense / budget.monthlyBudget) * 100, 100)
    : 0;

  return {
    budget: budget.monthlyBudget,
    updateBudget,
    remainingBudget,
    percentageUsed,
    totalExpense
  };
};
