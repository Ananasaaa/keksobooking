import { CONSTANTS } from './constants.js';
const getRandomFloat = (min, max, decimals = 5) => {
  const random = Math.random() * (max - min) + min;
  return parseFloat(random.toFixed(decimals));
};
  
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomElement = (array) => {
  const index = getRandomInt(0, array.length - 1);
  return array[index];
};
  
const getRandomUniqueArray = (array) => {
  const shuffled = array.slice().sort(() => 0.5 - Math.random());
  const randomLength = getRandomInt(1, array.length);
  return shuffled.slice(0, randomLength);
};

const generateRandomTitles = () => {
  return getRandomElement(CONSTANTS.TITLES);
};

const generateRandomDescriptions = () => {
  const randomLength = getRandomInt(1, CONSTANTS.DESCRIPTIONS.length);
  return getRandomUniqueArray(CONSTANTS.DESCRIPTIONS).slice(0, randomLength).join(' ');
};
  
const generateMockData = () => {
  return Array.from({ length: 10 }, (_, index) => {
    const location = {
      x: getRandomFloat(CONSTANTS.COORDS.MIN_X, CONSTANTS.COORDS.MAX_X),
      y: getRandomFloat(CONSTANTS.COORDS.MIN_Y, CONSTANTS.COORDS.MAX_Y),
    };
  
    return {
      author: {
        avatar: `img/avatars/user${String(index + 1).padStart(2, '0')}.png`,
      },
      offer: {
        title: generateRandomTitles(),
        address: `${location.x}, ${location.y}`,
        price: getRandomInt(CONSTANTS.PRICE.MIN, CONSTANTS.PRICE.MAX),
        type: getRandomElement(CONSTANTS.TYPES),
        rooms: getRandomInt(CONSTANTS.ROOMS.MIN, CONSTANTS.ROOMS.MAX),
        guests: getRandomInt(CONSTANTS.GUESTS.MIN, CONSTANTS.GUESTS.MAX),
        checkin: getRandomElement(CONSTANTS.CHECK_TIMES),
        checkout: getRandomElement(CONSTANTS.CHECK_TIMES),
        features: getRandomUniqueArray(CONSTANTS.FEATURES),
        description: generateRandomDescriptions(),
        photos: getRandomUniqueArray(CONSTANTS.PHOTOS),
      },
      location,
    };
  });
};
  
(() => {
  const mockData = generateMockData();
})();



  