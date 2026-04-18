import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const generateLogAPI = async (data) => {
  const response = await axios.post(`${API_URL}/generate-log`, data);
  return response.data;
};

export const humanizeLogAPI = async (text, role) => {
  const response = await axios.post(`${API_URL}/humanize`, { text, role });
  return response.data;
};

export const getAiScoreAPI = async (text) => {
  const response = await axios.post(`${API_URL}/ai-score`, { text });
  return response.data;
};
