import { api } from './api';

export const requestService = {
  // Raise Request (Employee)
  raiseRequest: async (requestData) => {
    const response = await api.post('/hrm/request/raise', requestData);
    return response.data;
  },

  // Get My Requests (Employee)
  getMyRequests: async () => {
    const response = await api.get('/hrm/request/my');
    return response.data;
  },

  // Get All Requests (HR/Admin)
  getAllRequests: async () => {
    const response = await api.get('/hrm/request/all');
    return response;
  },

  // Update Request Status (HR/Admin/Manager)
  updateRequestStatus: async (requestId, status, comment) => {
    const response = await api.put(`/hrm/request/update/${requestId}`, { 
      status, 
      comment 
    });
    return response.data;
  }
};
