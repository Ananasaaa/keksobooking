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

  data.forEach(function(ad) {
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

















