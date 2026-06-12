import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
});

export const getPartners = () => api.get('/partners');
export const getPartnerById = (id) => api.get(`/partners/${id}`);
export const createPartner = (data) => api.post('/partners', data);
export const updatePartner = (id, data) => api.put(`/partners/${id}`, data);
export const deletePartner = (id) => api.delete(`/partners/${id}`);
export const getPartnerContributions = () => api.get('/partners/contributions');
