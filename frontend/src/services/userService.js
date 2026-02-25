import { api } from './api';

export const userService = {
 
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return await api.get(`/users${queryString ? `?${queryString}` : ''}`);
  },
  
  getById: async (id) => {
    return await api.get(`/users/${id}`);
  },
  
  create: async (userData) => {
    return await api.post('/users', userData);
  },
  
  update: async (id, userData) => {
    return await api.put(`/users/${id}`, userData);
  },
  
  delete: async (id) => {
    return await api.delete(`/users/${id}`);
  },
};
