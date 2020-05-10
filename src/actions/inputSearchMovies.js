import { STATIC_API_URL, API_URL_TOKEN } from '../constants/constants';
import {
  findElement,
  removeChildren,
  spinnerShow,
  spinnerHide,
  errorShow,
} from '../helpers/helperDOM';
import { calculateTotalPages } from '../helpers/moviesHelper';
import { translateWord } from '../helpers/translateWord';
import { swiper } from '../render/swiper';
import { redirectToAdditionalInfoMovie } from '../render/redirectToAdditionalInfoMovie';
import { getRating } from '../render/getRating';
import {
  getState,
  setSearchText,
  setMoviesData,
  setMovies,
  getMovies,
  addMovies,
} from '../state';

export const inputSearchMovies = async () => {
  const searchButton = findElement('.search__btn');

  searchButton.addEventListener('click', async (event) => {
    event.preventDefault();

    const searchInputValue = findElement('.search__input').value;
    const wordTranslation = await translateWord(searchInputValue);

    const errorElem = findElement('.search__error');
    errorElem.textContent = `Showing results for "${wordTranslation.toUpperCase()}"`;
    errorElem.style.opacity = '1';
    errorElem.style.color = 'orange';

    await getSearchMovies(wordTranslation);
  });
};

export const getSearchMovies = async (searchInputValue) => {
  setSearchText(searchInputValue);
  const { page, moviesData } = getState();

  try {
    const totalPages = calculateTotalPages(moviesData);

    if (totalPages && totalPages === page) {
      return;
    }

    spinnerShow();

    const response = await fetch(
      `${STATIC_API_URL}${API_URL_TOKEN}&s=${searchInputValue}&page=${page}`
    );

    if (response.status > 400) {
      throw new Error(response.status);
    }

    const data = await response.json();
    setMoviesData(data);

    if (data.Error) {
      handleSearchError(data);
      return;
    }

    if (page === 1) {
      removeChildren('.swiper-wrapper');
      setMovies(data);
    } else {
      addMovies(data);
    }

    const movies = getMovies();
    await getRating(movies);
  } catch (errStatus) {
    errorShow(errStatus);
    return;
  }

  swiper.update();

  if (page === 1) {
    swiper.slideTo(0);
  }

  await redirectToAdditionalInfoMovie();

  spinnerHide();
};

const handleSearchError = (data) => {
  const errorElem = findElement('.search__error');
  errorElem.style.opacity = '1';
  errorElem.style.color = 'red';
  errorElem.textContent = `${data.Error}`;
  removeChildren('.swiper-wrapper');
  swiper.update();
  spinnerHide();
};
