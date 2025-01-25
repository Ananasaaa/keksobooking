const url = 'http://localhost:3004';

export const fetchOffers = async () => {
  try {
    const response = await fetch(`${url}/offers`);
    if (!response.ok) {
      throw new Error(`Ошибка загрузки данных: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Ошибка загрузки данных:', error);
    throw error;
  }
};


export const sendFormData = async (formData) => {
  try {
    const formObject = Object.fromEntries(formData);
    const jsonData = JSON.stringify(formObject);

    const response = await fetch(`${url}/offer`, {
      method: 'POST',
      body: jsonData,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Ошибка отправки данных: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Ошибка отправки данных:', error);
    throw error;
  }
};
