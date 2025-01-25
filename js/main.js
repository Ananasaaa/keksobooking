import { initFormLogic } from './formHandler.js';
import { initMap } from './map.js';
import { fetchOffers, sendFormData } from './api.js';

//task9
const initApp = async () => {
  try {
    const mockData = await fetchOffers();
    initMap(mockData); 
  } catch (error) {
    console.error('Failed to load data for the map:', error);
    alert('Failed to load data. Please try again later.');
  }
  
  initFormLogic(sendFormData); 
};
  
initApp();