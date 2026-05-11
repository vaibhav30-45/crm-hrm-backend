const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';
const AI_SERVICE_ENABLED = process.env.AI_SERVICE_ENABLED === 'true';

class AiService {
  constructor() {
    this.client = axios.create({
      baseURL: AI_SERVICE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async checkHealth() {
    if (!AI_SERVICE_ENABLED) return { status: 'disabled' };
    try {
      const response = await this.client.get('/');
      return response.data;
    } catch (error) {
      console.error('AI Service Health Check Failed:', error.message);
      return { status: 'down', error: error.message };
    }
  }

  async predictLeadTemperature(leadData) {
    if (!AI_SERVICE_ENABLED) return null;
    try {
      const response = await this.client.post('/predict', leadData);
      return response.data;
    } catch (error) {
      console.error('AI Lead Prediction Failed:', error.message);
      return null;
    }
  }

  async predictConversionProbability(scoringData) {
    if (!AI_SERVICE_ENABLED) return null;
    try {
      const response = await this.client.post('/lead-scoring/conversion/predict', scoringData);
      return response.data;
    } catch (error) {
      console.error('AI Conversion Prediction Failed:', error.message);
      return null;
    }
  }

  async generateInsights(recordId, context = {}) {
    if (!AI_SERVICE_ENABLED) return null;
    try {
      const response = await this.client.post('/ai-insights/generate', {
        record_id: recordId,
        ...context
      });
      return response.data;
    } catch (error) {
      console.error('AI Insights Generation Failed:', error.message);
      return null;
    }
  }

  async generateEmail(emailContext) {
    if (!AI_SERVICE_ENABLED) return null;
    try {
      const response = await this.client.post('/email/generate-followup', emailContext);
      return response.data;
    } catch (error) {
      console.error('AI Email Generation Failed:', error.message);
      return null;
    }
  }
}

module.exports = new AiService();
