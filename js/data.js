import { 
  getRandomFloat, getRandomInt, 
  getRandomElement, getRandomUniqueArray 
} from './utils.js';
  
import {
  MIN_X, MAX_X, MIN_Y, MAX_Y,
  MIN_PRICE, MAX_PRICE,
  MIN_ROOMS, MAX_ROOMS,
  MIN_GUESTS, MAX_GUESTS,
  MAX_CARDS,
  TYPES, CHECK_TIMES, FEATURES, PHOTOS, TITLES, DESCRIPTIONS
} from './constants.js';
    
export const generateRandomDescriptions = () => {
  const randomLength = getRandomInt(1, DESCRIPTIONS.length);
  return getRandomUniqueArray(DESCRIPTIONS).slice(0, randomLength).join(' ');
}; //рандомное описание
      
export const generateMockData = () => {
  return Array.from({ length: MAX_CARDS }, () => {
    const location = {
      x: getRandomFloat(MIN_X, MAX_X),
      y: getRandomFloat(MIN_Y, MAX_Y),
    }; //генерация рандомной локации 

    const randomAvatarIndex = getRandomInt(1, 8); //рандомные аватарки

    return {
      author: {
        avatar: `img/avatars/user${String(randomAvatarIndex).padStart(2, '0')}.png`,
      },
      offer: {
        title: getRandomElement(TITLES),
        address: `${location.x}, ${location.y}`,
        price: getRandomInt(MIN_PRICE, MAX_PRICE),
        type: getRandomElement(TYPES),
        rooms: getRandomInt(MIN_ROOMS, MAX_ROOMS),
        guests: getRandomInt(MIN_GUESTS, MAX_GUESTS),
        checkin: getRandomElement(CHECK_TIMES),
        checkout: getRandomElement(CHECK_TIMES),
        features: getRandomUniqueArray(FEATURES),
        description: generateRandomDescriptions(),
        photos: getRandomUniqueArray(PHOTOS),
      },
      location,
    };
  });
};
  