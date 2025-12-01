import axios from 'axios';

const API_BASE = 'http://127.0.0.1:8000';

export const getLatestTransaction = async () => {
  try {
    const response = await axios.get(`${API_BASE}/get-latest`);
    return response.data.transaction;
  } catch (error) {
    console.error('Error fetching latest transaction:', error);
    return null;
  }
};

export const healthCheck = async () => {
  try {
    await axios.get(`${API_BASE}/`);
    return true;
  } catch {
    return false;
  }
};