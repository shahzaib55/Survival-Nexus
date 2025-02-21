import axiosInstance from './axiosInstance';

export const createSurvivor = async (survivorData) => {
  console.log(survivorData);
  try {
    const response = await axiosInstance.post(`/survivors`, survivorData);
    return response.data;
  } catch (error) {
    console.error('Error creating survivor:', error);
    throw new Error('Could not create survivor');
  }
};

export const getSurvivors = async () => {
  try {
    const response = await axiosInstance.get(`/survivors`);
    return response.data; 
  } catch (error) {
    console.error('Error fetching survivors:', error);
    throw new Error('Could not load survivors');
  }
};

export const requestItem = async (requestData) => {
  try {
    const response = await axiosInstance.post(`/survivors/request-item`, requestData);
    return response.data;
  } catch (error) {
    console.error('Error requesting item:', error);
    throw new Error('Could not request item');
  }
};