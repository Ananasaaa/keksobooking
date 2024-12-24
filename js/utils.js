export const getRandomFloat = (min, max, decimals = 5) => {
  const random = Math.random() * (max - min) + min;
  return parseFloat(random.toFixed(decimals));
}; //для генерации случайных чисел локации
    
export const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}; // для генерации рандомно обьектов
  
export const getRandomElement = (array) => {
  const index = getRandomInt(0, array.length - 1);
  return array[index];
}; //выбор рандомных значений для обьектов
    
export const getRandomUniqueArray = (array) => {
  const shuffled = array.slice().sort(() => 0.5 - Math.random());
  const randomLength = getRandomInt(1, array.length);
  return shuffled.slice(0, randomLength);
}; //генерация массива случайной длины без повторений features, photos