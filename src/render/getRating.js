import { STATIC_API_URL, API_URL_TOKEN } from '../constants/constants';
import { createElement, findElement, errorShow } from '../helpers/helperDOM';

export const getRating = async (data) => {
  let myStatus;

  try {
    const moviesDataRequests = data.Search.map(
      (card) => `${STATIC_API_URL}${API_URL_TOKEN}&i=${card.imdbID}`
    ).map((url) => fetch(url));

    for (const req of moviesDataRequests) {
      const movieData = await req;
      const movie = await movieData.json();

      const li = createElement('li', 'swiper-slide');

      li.innerHTML = `
            <a class="swiper__link" id=${movie.imdbID} target="_blank">
              <h1 class="swiper__title">${movie.Title}</h1>
            </a>
            <img class="swiper__poster" src=${movie.Poster} alt=${movie.Title}>
            <span class="swiper__raiting"><strong>&#9733;</strong>${movie.imdbRating}</span>
            <span class="swiper__year">${movie.Year}</span>
          `;

      const swiperWrapper = findElement('.swiper-wrapper');
      swiperWrapper.append(li);
    }
  } catch (error) {
    errorShow(myStatus);
  }
};
