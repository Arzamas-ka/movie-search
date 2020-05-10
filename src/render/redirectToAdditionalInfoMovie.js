import { STATIC_IMDB_URL, IMDB_HELPER_PARAM } from '../constants/constants';
import { findElement } from '../helpers/helperDOM';

export const redirectToAdditionalInfoMovie = () => {
  const cardsListContainer = findElement('.swiper-wrapper');
  cardsListContainer.addEventListener('click', () => {
    const cardsItems = [...document.querySelectorAll('.swiper__link')];
    cardsItems.forEach((item) => {
      item.setAttribute(
        'href',
        `${STATIC_IMDB_URL}${item.id}${IMDB_HELPER_PARAM}`
      );
    });
  });
};
