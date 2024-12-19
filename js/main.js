import {
  MIN_X, MAX_X, MIN_Y, MAX_Y,
  MIN_PRICE, MAX_PRICE,
  MIN_ROOMS, MAX_ROOMS,
  MIN_GUESTS, MAX_GUESTS,
  TYPES, CHECK_TIMES, FEATURES, PHOTOS, TITLES, DESCRIPTIONS
} from './constants.js';

const getRandomFloat = (min, max, decimals = 5) => {
  const random = Math.random() * (max - min) + min;
  return parseFloat(random.toFixed(decimals));
}; //для генерации случайных чисел локации
  
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}; // для генерации рандомно обьектов

const getRandomElement = (array) => {
  const index = getRandomInt(0, array.length - 1);
  return array[index];
}; //выбор рандомных значений для обьектов
  
const getRandomUniqueArray = (array) => {
  const shuffled = array.slice().sort(() => 0.5 - Math.random());
  const randomLength = getRandomInt(1, array.length);
  return shuffled.slice(0, randomLength);
}; //генерация массива случайной длины без повторений features, photos

const generateRandomTitles = () => {
  return getRandomElement(TITLES);
};// рандомный заголовок

const generateRandomDescriptions = () => {
  const randomLength = getRandomInt(1, DESCRIPTIONS.length);
  return getRandomUniqueArray(DESCRIPTIONS).slice(0, randomLength).join(' ');
}; //рандомное описание
  
const generateMockData = () => {
  return Array.from({ length: 10 }, (_, index) => {
    const location = {
      x: getRandomFloat(MIN_X, MAX_X),
      y: getRandomFloat(MIN_Y, MAX_Y),
    }; //генерация рандомной локации
  
    return {
      author: {
        avatar: `img/avatars/user${String(index + 1).padStart(2, '0')}.png`,
      },
      offer: {
        title: generateRandomTitles(),
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
  

//const mockData = generateMockData();
console.log('FFFFFFFFFFFF', generateMockData()); //проверка




  