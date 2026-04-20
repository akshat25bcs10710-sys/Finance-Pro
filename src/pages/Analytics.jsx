import React, { useMemo } from 'react';
import { useTransactions } from '../hooks/useTransactions';
import { ExpensePieChart, IncomeExpenseBarChart } from '../components/Charts';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, parseISO } from 'date-fns';
import './Analytics.css';

const Analytics = () => {
  const { transactions, expensesByCategory, totalIncome, totalExpense } = useTransactions();

  const monthlyTrendData = useMemo(() => {
    const trend = {};

    transactions.forEach(t => {
      const date = parseISO(t.date);
      const monthYear = format(date, 'MMM yyyy');
      
      if (!trend[monthYear]) {
        trend[monthYear] = { name: monthYear, income: 0, expense: 0 };
      }

      if (t.type === 'income') {
        trend[monthYear].income += Number(t.amount);
      } else {
        trend[monthYear].expense += Number(t.amount);
      }
    });

    return Object.values(trend).sort((a, b) => {
      return new Date(a.name) - new Date(b.name);
    });
  }, [transactions]);

  return (
    <div className="analytics-page animate-fade-in">
      <header className="page-header">
        <div>
          <h1 className="text-gradient">Financial Analytics</h1>
          <p className="text-muted">Deep dive into your spending and earning patterns.</p>
        </div>
      </header>

      <div className="analytics-grid">
        <div className="analytics-card glass-panel wide">
          <h3>Monthly Trend</h3>
          <div className="chart-container">
            {monthlyTrendData.length > 0 ? (
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={monthlyTrendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                  <XAxis dataKey="name" stroke="var(--text-secondary)" />
                  <YAxis stroke="var(--text-secondary)" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-color)', borderRadius: '8px' }}
                  />
                  <Line type="monotone" dataKey="income" stroke="var(--success)" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="expense" stroke="var(--danger)" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-muted text-center py-4">Not enough data for monthly trends.</p>
            )}
          </div>
        </div>

        <div className="analytics-card glass-panel">
          <h3>Expense Distribution</h3>
          <div className="chart-container">
            <ExpensePieChart data={expensesByCategory} />
          </div>
        </div>

        <div className="analytics-card glass-panel">
          <h3>Income vs Expense</h3>
          <div className="chart-container">
            <IncomeExpenseBarChart totalIncome={totalIncome} totalExpense={totalExpense} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
