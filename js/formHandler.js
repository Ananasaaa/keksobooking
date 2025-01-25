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
    priceInput.setCustomValidity(`The minimum price for this type of accommodation is — ${minValue} ₽`);
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

//task9

const initPhotoUpload = () => {
  const avatarInput = document.querySelector('#avatar');
  const avatarPreview = document.querySelector('.ad-form-header__preview img'); 
  const imagesInput = document.querySelector('#images');
  const photoContainer = document.querySelector('.ad-form__photo');

  avatarInput.addEventListener('change', () => {
    const file = avatarInput.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        avatarPreview.src = reader.result; 
      };
      reader.readAsDataURL(file);
    } else {
      alert('Выберите корректное изображение для аватара.');
    }
  });

  imagesInput.addEventListener('change', () => {
    const files = Array.from(imagesInput.files);
    photoContainer.innerHTML = ''; 

    files.forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          const img = document.createElement('img');
          img.src = reader.result;
          img.style.width = '70px';
          img.style.height = '70px';
          img.alt = 'Фото жилья';
          photoContainer.appendChild(img);
        };
        reader.readAsDataURL(file);
      } else {
        alert('Все файлы должны быть изображениями.');
      }
    });
  });
};
//
export const initFormLogic = (sendDataCb) => {
  const typeSelect = document.querySelector('#type');
  const priceInput = document.querySelector('#price');
  const timeInSelect = document.querySelector('#timein');
  const timeOutSelect = document.querySelector('#timeout');
  const roomSelect = document.querySelector('#room_number');
  const capacitySelect = document.querySelector('#capacity');
  const form = document.querySelector('.ad-form');
  const titleInput = document.querySelector('#title');
  const addressInput = document.querySelector('#address');
  const resetBtn = document.querySelector('.ad-form__reset');


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
      titleInput.setCustomValidity('Please use only letters and spaces.');
    } else {
      titleInput.setCustomValidity('');
    }
    titleInput.reportValidity();
  });

  updatePriceField(typeSelect, priceInput);
  updateCapacityOptions(roomSelect, capacitySelect);
  initPhotoUpload();
  

  //task9
 
  const resetForm = () => {
    form.reset();
    updatePriceField(typeSelect, priceInput);
    updateCapacityOptions(roomSelect, capacitySelect);
  };
  
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
  
    sendDataCb(formData)
      .then(() => {
        alert('Form submitted successfully');
        resetForm();
      })
      .catch(() => {
        alert('Error occurred while submitting the form');
      });
  });
  
  resetBtn.addEventListener('click', resetForm);
  
};