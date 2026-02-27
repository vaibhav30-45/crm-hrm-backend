import { api } from './api';

export const leaveService = {
  // Apply Leave
  applyLeave: async (leaveData) => {
    const response = await api.post('/hrm/leaves/apply', leaveData);
    return response.data;
  },

  // Get My Leaves (Employee)
  getMyLeaves: async () => {
    const response = await api.get('/hrm/leaves/my');
    return response.data;
  },

  // Get All Leaves (Admin/HR)
  getAllLeaves: async () => {
    const response = await api.get('/hrm/leaves/all');
    return response;
  },

  // Update Leave Status (Admin/HR)
  updateLeaveStatus: async (leaveId, status) => {
    const response = await api.put(`/hrm/leaves/update/${leaveId}`, { status });
    return response.data;
  }
};
