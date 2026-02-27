import { api } from './api';

export const crmService = {
  // Customer Management
  customers: {
    getAll: async (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      return await api.get(`/crm/customers${queryString ? `?${queryString}` : ''}`);
    },
    
    getById: async (id) => {
      return await api.get(`/crm/customers/${id}`);
    },
    
    create: async (customerData) => {
      return await api.post('/crm/customers', customerData);
    },
    
    update: async (id, customerData) => {
      return await api.put(`/crm/customers/${id}`, customerData);
    },
    
    delete: async (id) => {
      return await api.delete(`/crm/customers/${id}`);
    },
  },

  // Lead Management
  leads: {
    getAll: async (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      return await api.get(`/crm/leads${queryString ? `?${queryString}` : ''}`);
    },
    
    getById: async (id) => {
      return await api.get(`/crm/leads/${id}`);
    },
    
    create: async (leadData) => {
      return await api.post('/crm/leads', leadData);
    },
    
    update: async (id, leadData) => {
      return await api.put(`/crm/leads/${id}`, leadData);
    },
    
    delete: async (id) => {
      return await api.delete(`/crm/leads/${id}`);
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
