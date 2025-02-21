import axiosInstance from './axiosInstance.js';

export const fetchReports = async () => {
  try {
    const response = await axiosInstance.get(`/reports`);
    console.log(response.data);
    return response.data; 
    
  } catch (error) {
    console.error('Error fetching reports:', error);
    throw new Error('Could not load reports');
  }
};