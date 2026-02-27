import { api } from './api';

export const payrollService = {
  // Run Payroll (Admin/HR)
  runPayroll: async (payrollData) => {
    const response = await api.post('/hrm/payroll/run', payrollData);
    return response;
  },

  // Mark Salary as Paid (Admin/HR)
  markPaid: async (payrollId) => {
    const response = await api.put(`/hrm/payroll/pay/${payrollId}`);
    return response;
  },

  // Get All Payroll Records (Admin/HR) - if needed
  getAllPayroll: async () => {
    const response = await api.get('/hrm/payroll/all');
    return response;
  },

  // Get My Payroll (Employee) - if needed
  getMyPayroll: async () => {
    const response = await api.get('/hrm/payroll/my');
    return response;
  }
};
