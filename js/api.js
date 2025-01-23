const url = 'http://localhost:3004';

export const fetchOffers = () => {
  return fetch(`${url}/offers`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Ошибка загрузки данных: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error('Ошибка загрузки данных:', error);
      throw error;
    });
};

export const sendFormData = (formData) => {
  const formObject = Object.fromEntries(formData);
  const jsonData = JSON.stringify(formObject);
  return fetch(`${url}/offer`, {
    method: 'POST',
    body: jsonData,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Ошибка отправки данных: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error('Ошибка отправки данных:', error);
      throw error;
    })
};