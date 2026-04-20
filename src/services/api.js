import axios from 'axios';

// Using a free mock API or real API if provided.
// exchangerate-api.com has a public endpoint for basic rates.
const API_URL = 'https://open.er-api.com/v6/latest';

export const fetchExchangeRates = async (baseCurrency = 'INR') => {
  try {
    const response = await axios.get(`${API_URL}/${baseCurrency}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    throw error;
  }
};
