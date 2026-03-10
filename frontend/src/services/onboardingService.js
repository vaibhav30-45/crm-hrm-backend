import { api } from './api';

export const onboardingService = {
  // Start onboarding process
  startOnboarding: async (onboardingData) => {
    try {
      const response = await api.post('/hrm/onboarding/start', onboardingData);
      return response;
    } catch (error) {
      console.error('Onboarding Service - Start onboarding error:', error);
      throw error;
    }
  },

  // Get all onboarding records
  getOnboarding: async () => {
    try {
      const response = await api.get('/hrm/onboarding');
      return response;
    } catch (error) {
      console.error('Onboarding Service - Get onboarding error:', error);
      throw error;
    }
  },

  // Get onboarding by ID (if needed)
  getOnboardingById: async (id) => {
    try {
      const response = await api.get(`/hrm/onboarding/${id}`);
      return response;
    } catch (error) {
      console.error('Onboarding Service - Get onboarding by ID error:', error);
      throw error;
    }
  },

  // Update onboarding status (if needed)
  updateOnboarding: async (id, updateData) => {
    try {
      const response = await api.put(`/hrm/onboarding/${id}`, updateData);
      return response;
    } catch (error) {
      console.error('Onboarding Service - Update onboarding error:', error);
      throw error;
    }
  },

  // Delete onboarding record (if needed)
  deleteOnboarding: async (id) => {
    try {
      const response = await api.delete(`/hrm/onboarding/${id}`);
      return response;
    } catch (error) {
      console.error('Onboarding Service - Delete onboarding error:', error);
      throw error;
    }
  },
};
