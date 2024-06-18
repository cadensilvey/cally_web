// src/apiService.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/calculate';

export const calculateCallawayScore = async (scores, name) => {
  try {
    const response = await axios.post(API_URL, { scores, name });
    return response.data;
  } catch (error) {
    console.error('Error calculating Callaway score', error);
    throw error;
  }
};
