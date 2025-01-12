const disablePage = () => {
  const adForm = document.querySelector('.ad-form');
  const mapFilters = document.querySelector('.map__filters');

  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');

  const disableFields = (fields) => {
    fields.forEach((field) => {
      field.disabled = true;
    });
  };

  disableFields(adForm.querySelectorAll('input, select, textarea, button'));
  disableFields(mapFilters.querySelectorAll('input, select'));
};

const enablePage = () => {
  const adForm = document.querySelector('.ad-form');
  const mapFilters = document.querySelector('.map__filters');

  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');

  const enableFields = (fields) => {
    fields.forEach((field) => {
      field.disabled = false;
    });
  };

  enableFields(adForm.querySelectorAll('input, select, textarea, button'));
  enableFields(mapFilters.querySelectorAll('input, select'));
};

export const initMap = (data) => {
 
  disablePage();
  const map = L.map('map-canvas').setView([35.6895, 139.6917], 10);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  const mainIcon = L.icon({
    iconUrl: 'img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  const mainMarker = L.marker([35.6895, 139.6917], {
    draggable: true,
    icon: mainIcon,
  });

  mainMarker.addTo(map);

  const addressField = document.querySelector('#address');

  const mainMarkerPosition = mainMarker.getLatLng();
  const initialLat = mainMarkerPosition.lat.toFixed(5);
  const initialLng = mainMarkerPosition.lng.toFixed(5);
  addressField.value = `${initialLat}, ${initialLng}`; 

  mainMarker.on('moveend', function (event) {
    const position = event.target.getLatLng();
    const lat = position.lat.toFixed(5);
    const lng = position.lng.toFixed(5);
    addressField.value = `${lat}, ${lng}`;
  });

  addressField.readOnly = true;

  const adIcon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  data.slice(0, 10).forEach(function(ad) {
    const adMarker = L.marker([ad.location.x, ad.location.y], { icon: adIcon })
    adMarker.addTo(map)
      .bindPopup(`
      <img src="${ad.author.avatar}">
      <strong>${ad.offer.title}</strong>
      <br>${ad.offer.address}<br>
      <em>${ad.offer.price} ₽/ночь</em>
      <p>Тип жилья: ${ad.offer.type} </p>
      <p>Количество комнат: ${ad.offer.rooms}</p> 
      <p>Количество гостей: ${ad.offer.guests}</p>  
      <p>Время заезда: ${ad.offer.checkin}</p> 
      <p>Время выезда: ${ad.offer.checkout}</p> 
      <p>Удобства: 
          <ul style="list-style: none; padding: 0;">
      ${ad.offer.features.map(feature => `<li class="popup__feature popup__feature--${feature}"></li>`).join(' ')}
    </ul>
      </p> 
      <p>${ad.offer.description}</p> 
          ${ad.offer.photos.map(photo => `<img src="${photo}" alt="Фото жилья" width="50" height="40">`).join(' ')}
      `)
  }); 
  map.whenReady(enablePage);
 
  const housingType = document.querySelector('#housing-type');
  const mapFilters = document.querySelector('.map__filters');

  const filterOffers = () => {
    const selectedType = housingType.value;
    const selectedPrice = document.querySelector('#housing-price').value;
    const selectedRooms = document.querySelector('#housing-rooms').value;
    const selectedGuests = document.querySelector('#housing-guests').value;

    const selectedFeatures = Array.from(
      document.querySelectorAll('#housing-features input:checked'),
    ).map((feature) => feature.value);

    const filteredData = data.filter((ad) => {
      if (selectedType !== 'any' && ad.offer.type !== selectedType) return false;

      if (selectedPrice === 'low' && ad.offer.price >= 10000) return false;
      if (selectedPrice === 'middle' && (ad.offer.price < 10000 || ad.offer.price > 50000)) return false;
      if (selectedPrice === 'high' && ad.offer.price <= 50000) return false;

      if (selectedRooms !== 'any' && ad.offer.rooms !== Number(selectedRooms)) return false;
      if (selectedGuests !== 'any' && ad.offer.guests !== Number(selectedGuests)) return false;

      return selectedFeatures.every((feature) => ad.offer.features.includes(feature));
    });

    map.eachLayer((layer) => {
      if (layer instanceof L.Marker && layer !== mainMarker) {
        map.removeLayer(layer);
      }
    });

    filteredData.slice(0, 10).forEach((ad) => {
      L.marker([ad.location.x, ad.location.y], { icon: adIcon })
        .addTo(map)
        .bindPopup(`
          <img src="${ad.author.avatar}">
      <strong>${ad.offer.title}</strong>
      <br>${ad.offer.address}<br>
      <em>${ad.offer.price} ₽/ночь</em>
      <p>Тип жилья: ${ad.offer.type} </p>
      <p>Количество комнат: ${ad.offer.rooms}</p> 
      <p>Количество гостей: ${ad.offer.guests}</p>  
      <p>Время заезда: ${ad.offer.checkin}</p> 
      <p>Время выезда: ${ad.offer.checkout}</p> 
      <p>Удобства: 
          <ul style="list-style: none; padding: 0;">
      ${ad.offer.features.map(feature => `<li class="popup__feature popup__feature--${feature}"></li>`).join(' ')}
    </ul>
      </p> 
      <p>${ad.offer.description}</p> 
          ${ad.offer.photos.map(photo => `<img src="${photo}" alt="Фото жилья" width="50" height="40">`).join(' ')}
          `);
    });
  };

  mapFilters.addEventListener('change', filterOffers);

};




