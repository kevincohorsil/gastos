import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
});

export const getBankAccounts = () => api.get('/bank-accounts');
export const getBankAccountById = (id) => api.get(`/bank-accounts/${id}`);
export const createBankAccount = (data) => api.post('/bank-accounts', data);
export const updateBankAccount = (id, data) => api.put(`/bank-accounts/${id}`, data);
export const deleteBankAccount = (id) => api.delete(`/bank-accounts/${id}`);
export const getBankBalances = () => api.get('/bank-accounts/balances');
