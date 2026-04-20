import React from 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
  LineChart, Line
} from 'recharts';

const COLORS = ['#B85042', '#A7BEAE', '#d96453', '#e28e6e', '#e5b05c', '#859c8d', '#c4a77d', '#8c6a5e'];

export const ExpensePieChart = ({ data }) => {
  const chartData = Object.keys(data).map(key => ({
    name: key,
    value: data[key]
  }));

  if (chartData.length === 0) {
    return <div className="empty-chart">No expense data available.</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-color)', borderRadius: '8px' }}
          itemStyle={{ color: 'var(--text-primary)' }}
        />
        <Legend wrapperStyle={{ paddingTop: '20px' }} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export const IncomeExpenseBarChart = ({ totalIncome, totalExpense }) => {
  const data = [
    { name: 'Income', amount: totalIncome, fill: 'var(--success)' },
    { name: 'Expense', amount: totalExpense, fill: 'var(--danger)' }
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
        <XAxis dataKey="name" stroke="var(--text-secondary)" />
        <YAxis stroke="var(--text-secondary)" />
        <Tooltip 
          cursor={{ fill: 'var(--bg-tertiary)', opacity: 0.4 }}
          contentStyle={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-color)', borderRadius: '8px' }}
        />
        <Bar dataKey="amount" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};
