import { api } from './api';

export const attendanceService = {
  // Punch In
  punchIn: async () => {
    const response = await api.post('/hrm/attendance/punch-in');
    return response;
  },

  // Punch Out
  punchOut: async () => {
    const response = await api.post('/hrm/attendance/punch-out');
    return response;
  },

  // Get Attendance Records (if needed for future)
  getAttendance: async (params = {}) => {
    const response = await api.get('/hrm/attendance', { params });
    return response.data;
  },

  // Get Today's Attendance
  getTodayAttendance: async () => {
    const response = await api.get('/hrm/attendance/today');
    return response.data;
  }
};
