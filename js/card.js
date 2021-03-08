'use strict';

/**
 * Map housing types on name
 * @type {Object}
 */
const HOUSING_TYPES_TITLES = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгало',
};

/**
 * ctor the card of housing
 * @param cardData the housing data
 * @constructor
 */
const Card = function (cardData) {
  const template = document.querySelector('#card').content.querySelector('.popup');

  /**
   * Render the popup with the card of housing
   * @returns {Node}
   */
  this.render = () => {
    const card = template.cloneNode(true);

    const featuresRender = (features) => {
      const listElement = card.querySelector('.popup__features');

      if (features && features.length) {
        const fragment = document.createDocumentFragment();

        features.forEach((feature) => {
          const el = document.createElement('li');
          el.classList.add('popup__feature');
          el.classList.add('popup__feature--' + feature);
          fragment.append(el);
        });

        listElement.innerHTML = '';
        listElement.append(fragment);
      } else {
        listElement.hidden = true;
      }
    };

    const photosRender = (photos) => {
      const containerElement = card.querySelector('.popup__photos');
      if (photos && photos.length) {
        const photoTemplate = containerElement.querySelector('.popup__photo');
        const fragment = document.createDocumentFragment();

        photos.forEach((photo) => {
          const el = photoTemplate.cloneNode();
          el.src = photo;
          fragment.append(el);
        });

        containerElement.innerHTML = '';
        containerElement.append(fragment);
      } else {
        containerElement.hidden = true;
      }
    };

    const fillField = (selector, value, isVisible) => {
      const field = card.querySelector(selector);

      field.innerText = value;
      field.hidden = !isVisible;
    };

    fillField('.popup__title', cardData.offer.title, cardData.offer.title);
    fillField('.popup__text--address', cardData.offer.address, cardData.offer.title);
    fillField('.popup__text--price', `${cardData.offer.price} ₽/ночь`, cardData.offer.title);
    fillField('.popup__type', HOUSING_TYPES_TITLES[cardData.offer.type], cardData.offer.type);
    fillField('.popup__description', cardData.offer.description, cardData.offer.description);
    fillField('.popup__avatar', cardData.offer.description, cardData.offer.description);

    fillField('.popup__text--capacity',
      `${cardData.offer.rooms} комнаты для ${cardData.offer.guests} гостей`,
      cardData.offer.rooms);

    fillField('.popup__text--time',
      `Заезд после ${cardData.offer.checkin}, выезд до ${cardData.offer.checkout}`,
      cardData.offer.checkin && cardData.offer.checkout);

    featuresRender(cardData.offer.features);

    photosRender(cardData.offer.photos);

    const avatar = card.querySelector('.popup__avatar');
    avatar.src = cardData.author.avatar;
    avatar.hidden = cardData.author.avatar;

    return card;
  };
}

export {Card};