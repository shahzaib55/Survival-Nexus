import axiosInstance from './axiosInstance';

export const getItems = async () => {
  try {
    const response = await axiosInstance.get(`/items`);
    return response.data; 
  } catch (error) {
    console.error('Error fetching items:', error);
    throw new Error('Could not load items');
  }
};

