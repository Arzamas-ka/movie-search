import { setSearchText, getState, addMovies, setMovies } from './index';

describe('setSearchText', () => {
  test('should change search text', () => {
    const searchMovieName = 'Harry Potter';

    expect(getState()).toEqual({
      searchText: '',
      page: 1,
      moviesData: {},
      movies: [],
    });

    expect(setSearchText('Harry Potter')).toBe(searchMovieName);
    expect(setSearchText('Aladin')).not.toBe(searchMovieName);
  });

  test('should increment page number', () => {
    const searchMovieName = 'Harry Potter';

    setSearchText(searchMovieName);
    setSearchText(searchMovieName);

    expect(getState()).toEqual({
      searchText: 'Harry Potter',
      page: 2,
      moviesData: {},
      movies: [],
    });
  });
});

describe('addMovies', () => {
  test('should add new movies', () => {
    const movies = { Search: ['Aladin', 'Harry Potter'] };
    const movies2 = { Search: ['King Lion', 'Good Will Hunting'] };

    expect(addMovies(movies)).toEqual(['Aladin', 'Harry Potter']);
    expect(addMovies(movies2)).toEqual([
      'Aladin',
      'Harry Potter',
      'King Lion',
      'Good Will Hunting',
    ]);
    expect(addMovies({})).toEqual([
      'Aladin',
      'Harry Potter',
      'King Lion',
      'Good Will Hunting',
    ]);
  });
});

describe('setMovies', () => {
  test('should set new movies', () => {
    const movies = { Search: ['Aladin', 'Harry Potter'] };
    const movies2 = { Search: ['King Lion', 'Good Will Hunting'] };

    expect(setMovies(movies)).toEqual(['Aladin', 'Harry Potter']);
    expect(setMovies(movies2)).toEqual([
      'King Lion',
      'Good Will Hunting',
    ]);
  });
});
