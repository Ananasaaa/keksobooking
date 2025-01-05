const offerTypeMapping = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
};
  
export const renderOfferCard = (offerData/*, container*/) => {
  const template = document.querySelector('#card').content.querySelector('.popup');
  const card = template.cloneNode(true);

  const title = card.querySelector('.popup__title');
  title.textContent = offerData.offer.title;

  const address = card.querySelector('.popup__text--address');
  address.textContent = offerData.offer.address;

  const price = card.querySelector('.popup__text--price');
  price.textContent = `${offerData.offer.price} ₽/ночь`;

  const type = card.querySelector('.popup__type');
  type.textContent = offerTypeMapping[offerData.offer.type];

  const capacity = card.querySelector('.popup__text--capacity');
  capacity.textContent =`${offerData.offer.rooms} комнаты для ${offerData.offer.guests} гостей`;

  const time = card.querySelector('.popup__text--time');
  time.textContent = `Заезд после ${offerData.offer.checkin}, выезд до ${offerData.offer.checkout}`;

  const featuresList = card.querySelector('.popup__features');
  if (offerData.offer.features && offerData.offer.features.length > 0) {
    featuresList.innerHTML = '';
    offerData.offer.features.forEach((feature) => {
      const featureItem = document.createElement('li');
      featureItem.classList.add('popup__feature', `popup__feature--${feature}`);
      featuresList.appendChild(featureItem);
    });
  } else {
    featuresList.remove();
  }

  const description = card.querySelector('.popup__description');
  description.textContent = offerData.offer.description;
 
  const photosContainer = card.querySelector('.popup__photos');
  const photoTemplate = photosContainer.querySelector('.popup__photo');
  photosContainer.innerHTML = '';
  if (offerData.offer.photos && offerData.offer.photos.length > 0) {
    offerData.offer.photos.forEach((photoSrc) => {
      const photo = photoTemplate.cloneNode(true);
      photo.src = photoSrc;
      photosContainer.appendChild(photo);
    });
  } else {
    photosContainer.remove();
  }

  const avatar = card.querySelector('.popup__avatar');
  avatar.src = offerData.author.avatar;

  //container.appendChild(card);
  return card
};

