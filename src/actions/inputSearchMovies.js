import { STATIC_API_URL, API_URL_TOKEN } from '../constants/constants';
import {
  findElement,
  removeChildren,
  spinnerShow,
  spinnerHide,
  errorShow,
} from '../helpers/helperDOM';
import { translateWord } from '../helpers/translateWord';
import { swiper } from '../render/swiper';
import { getAdditionalInfoMovie } from '../render/getAdditionalInfoMovie';
import { getRating } from '../render/getRating';

let prevSearchText = '';
let prevPage = 1;
let prevData = [];

export const inputSearchMovies = async () => {
  const searchButton = findElement('.search__btn');

  searchButton.addEventListener('click', async (event) => {
    event.preventDefault();
    let searchInputValue = findElement('.search__input').value;

    const wordTranslation = await translateWord(searchInputValue);

    const errorElem = findElement('.search__error');
    errorElem.textContent = `Showing results for "${wordTranslation.toUpperCase()}"`;
    errorElem.style.opacity = '1';
    errorElem.style.color = 'orange';

    await getSearchMovies(wordTranslation);
  });
};

export const getSearchMovies = async (searchInputValue) => {
  let myStatus;

  if (searchInputValue !== prevSearchText) {
    prevPage = 1;
  } else {
    prevPage += 1;
  }

  try {
    const totalPages = Math.ceil(prevData.totalResults / 10);

    if (totalPages && totalPages === prevPage) {
      return [];
    }

    spinnerShow();

    const response = await fetch(
      `${STATIC_API_URL}${API_URL_TOKEN}&s=${searchInputValue}&page=${prevPage}`
    );
    myStatus = response.status;

    const data = await response.json();

    const response2 = await fetch(
      `${STATIC_API_URL}${API_URL_TOKEN}&s=${searchInputValue}&page=${
        prevPage + 1
      }`
    );
    const data2 = await response2.json();

    prevData = data;

    if (data.Error) {
      const errorElem = findElement('.search__error');
      errorElem.style.opacity = '1';
      errorElem.style.color = 'red';
      errorElem.textContent = `${data.Error}`;
    }

    if (prevSearchText !== searchInputValue) {
      removeChildren('.swiper-wrapper');
    }

    await getRating(data);

    await getRating(data2);
  } catch (error) {
    errorShow(myStatus);
  }

  swiper.update();
  swiper.slideTo(0);
  await getAdditionalInfoMovie();

  spinnerHide();
};
