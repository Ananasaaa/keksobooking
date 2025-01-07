const typeMinPrice = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

const roomCapacityMapping = {
  1: ['1'],    
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};

const updatePriceField = (typeSelect, priceInput) => {
  const chosenType = typeSelect.value;
  const minPrice = typeMinPrice[chosenType];
  priceInput.min = minPrice;
  priceInput.placeholder = minPrice;
};

const validatePrice = (priceInput) => {
  const currentValue = Number(priceInput.value);
  const minValue = Number(priceInput.min);

  if (currentValue < minValue) {
    priceInput.setCustomValidity(`Минимальная цена для этого типа жилья — ${minValue} ₽`);
  } else {
    priceInput.setCustomValidity('');
  }

  priceInput.reportValidity();
};

const syncTimeFields = (source, target) => {
  target.value = source.value;
};

const updateCapacityOptions = (roomSelect, capacitySelect) => {
  const selectedRooms = roomSelect.value;

  [...capacitySelect.options].forEach(option => {
    option.disabled = true;
  });

  const validOptions = roomCapacityMapping[selectedRooms];
  validOptions.forEach(value => {
    const option = capacitySelect.querySelector(`option[value="${value}"]`);
    if (option) {
      option.disabled = false
    }
  });

  if (!validOptions.includes(capacitySelect.value)) {
    capacitySelect.value = validOptions[0];
  }
};

export const initFormLogic = () => {
  const typeSelect = document.querySelector('#type');
  const priceInput = document.querySelector('#price');
  const timeInSelect = document.querySelector('#timein');
  const timeOutSelect = document.querySelector('#timeout');
  const roomSelect = document.querySelector('#room_number');
  const capacitySelect = document.querySelector('#capacity');
  const form = document.querySelector('.ad-form');
  const titleInput = document.querySelector('#title');
  const addressInput = document.querySelector('#address');


  titleInput.required = true;
  priceInput.required = true;
  roomSelect.required = true;
  capacitySelect.required = true;
  addressInput.required = true;

  typeSelect.addEventListener('change', () => updatePriceField(typeSelect, priceInput));
  priceInput.addEventListener('input', () => validatePrice(priceInput));
  timeInSelect.addEventListener('change', () => syncTimeFields(timeInSelect, timeOutSelect));
  timeOutSelect.addEventListener('change', () => syncTimeFields(timeOutSelect, timeInSelect));
  roomSelect.addEventListener('change', () => updateCapacityOptions(roomSelect, capacitySelect));
  titleInput.addEventListener('input', () => {
    const invalidCharacters = /[^a-zA-Zа-яА-ЯёЁ\s]/g; 
    if (invalidCharacters.test(titleInput.value)) {
      titleInput.setCustomValidity('Пожалуйста, используйте только буквы и пробелы.');
    } else {
      titleInput.setCustomValidity('');
    }
    titleInput.reportValidity();
  });

  updatePriceField(typeSelect, priceInput);
  updateCapacityOptions(roomSelect, capacitySelect);

  //отправка формы
  form.addEventListener('submit', (event) => {
    event.preventDefault(); 
  
    const formData = new FormData(form);
  
    console.log('Собранные данные:', Object.fromEntries(formData));


    fetch('https://example.com/endpoint', {
      method: 'POST',
      body: formData,
      mode: 'no-cors',
    })
      .then(() => {
        console.log('Запрос отправлен'); 
      })
      .catch((error) => {
        console.error('Ошибка при отправке:', error); 
      });
  });
};

