import { api } from './api';

export const userService = {
 
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return await api.get(`/users${queryString ? `?${queryString}` : ''}`);
  },
  
  // Get employee profile by ID
  getProfile: async (id) => {
    const response = await api.get(`/hrm/profile/${id}`);
    return response;
  },
  
  create: async (userData) => {
    return await api.post('/users', userData);
  },
  
  // Update employee profile
  updateProfile: async (id, userData) => {
    const response = await api.put(`/hrm/profile/${id}`, userData);
    return response.data;
  },
  
  // Delete employee
  delete: async (id) => {
    const response = await api.delete(`/hrm/profile/${id}`);
    return response.data;
  },
};
