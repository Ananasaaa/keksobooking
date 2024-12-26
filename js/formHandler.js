const typeMinPrice = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

export const initFormLogic = ({ typeSelect, priceInput, timeInSelect, timeOutSelect, roomSelect, capacitySelect }) => {
  const updatePriceField = () => {
    const chosenType = typeSelect.value;
    const minPrice = typeMinPrice[chosenType];
    priceInput.min = minPrice;
    priceInput.placeholder = minPrice;
  };

  const validatePrice = () => {
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

  const roomCapacityMapping = {
    1: ['1'],    
    2: ['1', '2'],
    3: ['1', '2', '3'],
    100: ['0'],
  };

  const updateCapacityOptions = () => {
    const selectedRooms = roomSelect.value;

    [...capacitySelect.options].forEach(option => {
      option.disabled = true;
    });

    const validOptions = roomCapacityMapping[selectedRooms];
    validOptions.forEach(value => {
      const option = capacitySelect.querySelector(`option[value="${value}"]`);
      if (option) {
        option.disabled = false;
      }
    });

    if (!validOptions.includes(capacitySelect.value)) {
      capacitySelect.value = validOptions[0];
    }
  };


  typeSelect.addEventListener('change', updatePriceField);
  priceInput.addEventListener('input', validatePrice);
  timeInSelect.addEventListener('change', () => syncTimeFields(timeInSelect, timeOutSelect));
  timeOutSelect.addEventListener('change', () => syncTimeFields(timeOutSelect, timeInSelect));
  roomSelect.addEventListener('change', updateCapacityOptions);
  
  updatePriceField();
  updateCapacityOptions();
};


