import { generateMockData } from './data.js';
import { renderOfferCard } from './offerCard.js';
import { initFormLogic } from './formHandler.js';

console.log('FFFFFFFFFFFF', generateMockData()); 

const mockData = generateMockData();
const mapCanvas = document.querySelector('#map-canvas');

renderOfferCard(mockData[0], mapCanvas); 

/*mockData.forEach(offer => {
  renderOfferCard(offer, mapCanvas)
});*/

document.addEventListener('DOMContentLoaded', () => {
  const typeSelect = document.querySelector('#type');
  const priceInput = document.querySelector('#price');
  const timeInSelect = document.querySelector('#timein');
  const timeOutSelect = document.querySelector('#timeout');
  const roomSelect = document.querySelector('#room_number');
  const capacitySelect = document.querySelector('#capacity');
  
  initFormLogic({ typeSelect, priceInput, timeInSelect, timeOutSelect,  roomSelect, capacitySelect  });
});

