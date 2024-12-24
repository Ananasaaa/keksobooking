import { generateMockData } from './data.js';
import { renderOfferCard } from './offerCard.js';


console.log('FFFFFFFFFFFF', generateMockData()); 

const mockData = generateMockData();
const mapCanvas = document.querySelector('#map-canvas');

renderOfferCard(mockData[0], mapCanvas); 

/*mockData.forEach(offer => {
  renderOfferCard(offer, mapCanvas)
});*/


