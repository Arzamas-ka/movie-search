let searchText = '';
let page = 1;
let moviesData = {};
let movies = [];

export const setSearchText = (currentSearchText) => {
  if (currentSearchText !== searchText) {
    page = 1;
  } else {
    page += 1;
  }

  searchText = currentSearchText;
  return searchText;
};

export const getState = () => {
  return { searchText, page, moviesData, movies };
};

export const setMoviesData = (data) => {
  moviesData = data;
  return moviesData;
};

export const setMovies = (moviesData) => {
  movies = moviesData.Search;
  return movies;
};

export const getMovies = () => movies;

export const addMovies = (moviesData) => {
  if (!moviesData || !moviesData.Search) {
    return movies;
  }

  movies = [...movies, ...moviesData.Search];
  return movies;
};
