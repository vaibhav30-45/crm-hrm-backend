import { api } from './api';

export const performanceService = {
  // Create Review (HR/Admin)
  createReview: async (reviewData) => {
    try {
      const response = await api.post('/hrm/review/create', reviewData);
      return response;
    } catch (error) {
      console.error('Performance Service - Create review error:', error);
      throw error;
    }
  },

  // Get All Reviews (HR/Admin)
  getAllReviews: async () => {
    try {
      const response = await api.get('/hrm/review/all');
      return response;
    } catch (error) {
      console.error('Performance Service - Get reviews error:', error);
      throw error;
    }
  },

  // Get My Reviews (Employee)
  getMyReviews: async () => {
    try {
      const response = await api.get('/hrm/review/my');
      return response;
    } catch (error) {
      console.error('Performance Service - Get my reviews error:', error);
      throw error;
    }
  },

  // Get Single Review
  getReviewById: async (id) => {
    try {
      const response = await api.get(`/hrm/review/${id}`);
      return response;
    } catch (error) {
      console.error('Performance Service - Get review by ID error:', error);
      throw error;
    }
  },

  // Update Review
  updateReview: async (id, reviewData) => {
    try {
      const response = await api.put(`/hrm/review/${id}`, reviewData);
      return response;
    } catch (error) {
      console.error('Performance Service - Update review error:', error);
      throw error;
    }
  },

  // Delete Review
  deleteReview: async (id) => {
    try {
      const response = await api.delete(`/hrm/review/${id}`);
      return response;
    } catch (error) {
      console.error('Performance Service - Delete review error:', error);
      throw error;
    }
  }
};
