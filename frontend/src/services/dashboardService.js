import { api } from './api';

export const dashboardService = {
  // Dashboard Data
  getDashboard: async () => {
    return await api.get('/dashboard');
  },
  
  getManagerDashboard: async () => {
    return await api.get('/manager/dashboard');
  },
};
