import { useContext } from 'react';
import { FinanceContext } from '../context/FinanceContext';

export const useTransactions = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useTransactions must be used within a FinanceProvider');
  }

  const { transactions, addTransaction, deleteTransaction, updateTransaction } = context;

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const netBalance = totalIncome - totalExpense;

  const expensesByCategory = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + Number(t.amount);
      return acc;
    }, {});

  const topCategory = Object.keys(expensesByCategory).reduce((a, b) =>
    expensesByCategory[a] > expensesByCategory[b] ? a : b
  , '');

  return {
    transactions,
    addTransaction,
    deleteTransaction,
    updateTransaction,
    totalIncome,
    totalExpense,
    netBalance,
    topCategory,
    expensesByCategory
  };
};
