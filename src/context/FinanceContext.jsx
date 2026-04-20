import React, { createContext, useState, useEffect } from 'react';

export const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const localData = localStorage.getItem('finance_transactions');
    return localData ? JSON.parse(localData) : [];
  });

  const [budget, setBudget] = useState(() => {
    const localData = localStorage.getItem('finance_budget');
    return localData ? JSON.parse(localData) : { monthlyBudget: 50000 };
  });

  useEffect(() => {
    localStorage.setItem('finance_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('finance_budget', JSON.stringify(budget));
  }, [budget]);

  const addTransaction = (transaction) => {
    setTransactions((prev) => [transaction, ...prev]);
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const updateTransaction = (id, updatedData) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updatedData } : t))
    );
  };

  const updateBudget = (newBudget) => {
    setBudget({ monthlyBudget: newBudget });
  };

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        budget,
        addTransaction,
        deleteTransaction,
        updateTransaction,
        updateBudget,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};
