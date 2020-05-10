import { redirectToAdditionalInfoMovie } from './redirectToAdditionalInfoMovie';
import { spinnerHide, spinnerShow } from '../helpers/helperDOM';
import { createSwiper, swiper } from './swiper';
import { getSearchMovies } from '../actions/inputSearchMovies';
import { getState } from '../state';

export const getFirstDataOfMovies = async () => {
  spinnerShow();
  createSwiper();

  await getSearchMovies('happy');
  await redirectToAdditionalInfoMovie();

  spinnerHide();

  swiper.on('reachEnd', async () => {
    const { searchText, movies } = getState();

    if (movies.length < 10) {
      return;
    }

    await getSearchMovies(searchText);
  });
};
