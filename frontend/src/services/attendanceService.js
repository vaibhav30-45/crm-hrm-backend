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

  // Get All Employees Attendance (HR/Admin only)
  getAllAttendance: async (params = {}) => {
    const response = await api.get('/hrm/attendance/all', { params });
    return response;
  },

  // Get My Attendance (Employee only)
  // getMyAttendance: async (params = {}) => {
  //   const response = await api.get('/hrm/attendance/my-attendance', { params });
  //   return response.data;
  // },

  // Get Attendance Records (if needed for future)
 
  getMyAttendance: async () => {
  const response = await api.get("/hrm/attendance/my");
  return response.data; // 👈 pura object return karo
}
  
};
