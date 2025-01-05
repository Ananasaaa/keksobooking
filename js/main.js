import { generateMockData } from './data.js';
import { renderOfferCard } from './offerCard.js';
import { initFormLogic } from './formHandler.js';
import { initMap } from './map.js';

const mockData = generateMockData();
const mapCanvas = document.querySelector('#map-canvas');

renderOfferCard(mockData[0], mapCanvas);  

/*mockData.forEach(offer => {
  renderOfferCard(offer, mapCanvas)
});*/
initFormLogic();

initMap(mockData);
