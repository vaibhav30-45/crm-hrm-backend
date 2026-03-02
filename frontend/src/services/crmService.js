import { api } from './api';

export const crmService = {
  // Customer Management
  customers: {
    getAll: async (params = {}) => {
      const response = await api.get('/crm/customers', { params });
      return response;
    },
    
    getById: async (id) => {
      const response = await api.get(`/crm/customers/${id}`);
      return response;
    },
    
    create: async (customerData) => {
      const response = await api.post('/crm/customers', customerData);
      return response;
    },
    
    update: async (id, customerData) => {
      const response = await api.put(`/crm/customers/${id}`, customerData);
      return response;
    },
    
    delete: async (id) => {
      const response = await api.delete(`/crm/customers/${id}`);
      return response;
    },
  },

  // Lead Management
  leads: {
    getAll: async (params = {}) => {
      const response = await api.get('/crm/leads', { params });
      return response;
    },
    
    getById: async (id) => {
      const response = await api.get(`/crm/leads/${id}`);
      return response;
    },
    
    create: async (leadData) => {
      const response = await api.post('/crm/leads', leadData);
      return response;
    },
    
    update: async (id, leadData) => {
      const response = await api.put(`/crm/leads/${id}`, leadData);
      return response;
    },
    
    delete: async (id) => {
      const response = await api.delete(`/crm/leads/${id}`);
      return response;
    },
  },

  // Sales Activities
  activities: {
    getAll: async (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      return await api.get(`/crm/activities${queryString ? `?${queryString}` : ''}`);
    },
    
    getById: async (id) => {
      return await api.get(`/crm/activities/${id}`);
    },
    
    create: async (activityData) => {
      return await api.post('/crm/activities', activityData);
    },
    
    update: async (id, activityData) => {
      return await api.put(`/crm/activities/${id}`, activityData);
    },
    
    delete: async (id) => {
      return await api.delete(`/crm/activities/${id}`);
    },
  },
};
