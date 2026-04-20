import { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/currencyFormatter';

export const useCurrency = (initialCurrency = 'INR') => {
  const [currency, setCurrency] = useState(initialCurrency);

  const format = (amount) => {
    return formatCurrency(amount, currency);
  };

  return { currency, setCurrency, format };
};
