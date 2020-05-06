import { STATIC_API_URL, API_URL_TOKEN } from '../constants/constants';
import { getAdditionalInfoMovie } from './getAdditionalInfoMovie';
import { getRating } from './getRating';
import { spinnerHide, removeChildren, errorShow } from '../helpers/helperDOM';
import { createSwiper } from './swiper';

export const getFirstDataOfMovies = async () => {
  let myStatus;

  try {
    const response = await fetch(`${STATIC_API_URL}${API_URL_TOKEN}&s=happy`);
    myStatus = response.status;

    const data = await response.json();

    const swiperCards = [...document.querySelectorAll('.swiper-slide')];
    if (swiperCards.length > 0) {
      removeChildren('.swiper-wrapper');
    }
    await getRating(data);
  } catch (error) {
    errorShow(myStatus);
  }

  createSwiper();
  await getAdditionalInfoMovie();

  spinnerHide();
};
