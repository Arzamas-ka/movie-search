export const calculateTotalPages = (moviesData) => {
  return moviesData.totalResults && Math.ceil(moviesData.totalResults / 10);
};
