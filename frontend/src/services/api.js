import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001/api',
});

// Add a request interceptor to attach the token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
};

export const dashboardAPI = {
  getMetrics: () => api.get('/dashboard'),
};

export const leadsAPI = {
  getLeads: (params) => api.get('/leads', { params }),
  getLeadById: (id) => api.get(`/leads/${id}`),
  createLead: (data) => api.post('/leads', data),
  updateLead: (id, data) => api.put(`/leads/${id}`, data),
  deleteLead: (id) => api.delete(`/leads/${id}`),
  updateStatus: (id, status) => api.put(`/leads/${id}`, { status }),
  
  // Notes
  getNotes: (leadId) => api.get(`/leads/${leadId}/notes`),
  createNote: (leadId, content) => api.post(`/leads/${leadId}/notes`, { content }),

  // CSV
  exportCSV: () => api.get('/leads/export', { responseType: 'blob' }),
  importCSV: (formData) => api.post('/leads/import', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
};

export default api;
