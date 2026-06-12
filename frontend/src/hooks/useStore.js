import { create } from 'zustand';
import { getTransactions, getSummary, deleteTransaction } from '../api/transactions';
import { getActivities, deleteActivity } from '../api/activities';
import { getPartnerContributions } from '../api/partners';
import { getBankBalances } from '../api/bankAccounts';

const useStore = create((set, get) => ({
  transactions: [],
  pagination: { total: 0, page: 1, limit: 10, totalPages: 0 },
  activities: [],
  partners: [],
  bankAccounts: [],
  summary: { totalIngresos: 0, totalGastos: 0, totalAportaciones: 0, totalRetirosSocios: 0, balance: 0 },
  loading: false,
  error: null,
  
  fetchTransactions: async (params = {}) => {
    set({ loading: true });
    try {
      const res = await getTransactions(params);
      set({
        transactions: res.data.data.transactions,
        pagination: res.data.data.pagination,
        loading: false
      });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchActivities: async () => {
    try {
      const res = await getActivities();
      set({ activities: res.data.data });
    } catch (error) {
      console.error('Error fetching activities', error);
    }
  },

  fetchSummary: async () => {
    try {
      const res = await getSummary();
      set({ summary: res.data.data });
    } catch (error) {
      console.error('Error fetching summary', error);
    }
  },

  fetchPartners: async () => {
    try {
      const res = await getPartnerContributions();
      set({ partners: res.data.data });
    } catch (error) {
      console.error('Error fetching partners', error);
    }
  },

  fetchBankAccounts: async () => {
    try {
      const res = await getBankBalances();
      set({ bankAccounts: res.data.data });
    } catch (error) {
      console.error('Error fetching bank accounts', error);
    }
  },

  removeTransaction: async (id) => {
    try {
      await deleteTransaction(id);
      const state = get();
      // Re-fetch the current page to keep pagination consistent
      await state.fetchTransactions({
        page: state.pagination.page,
        limit: state.pagination.limit
      });
    } catch (error) {
      console.error('Error deleting transaction', error);
    }
  },

  removeActivity: async (id) => {
    try {
      await deleteActivity(id);
      set((state) => ({
        activities: state.activities.filter(a => a.id !== id)
      }));
    } catch (error) {
      console.error('Error deleting activity', error);
    }
  }
}));

export default useStore;
