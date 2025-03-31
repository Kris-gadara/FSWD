export const movies = [];

export const addMovie = (title, genre, rating, releaseYear) => {
  movies.push({ title, genre, rating, releaseYear });
};

export const listMoviesByGenre = (genre) => {
  return movies.filter(movie => movie.genre.toLowerCase() === genre.toLowerCase());
};

export const findHighestRatedMovie = () => {
  return movies.reduce((highest, movie) => (movie.rating > highest.rating ? movie : highest), movies[0]);
};

export const getAllMovieTitles = () => movies.map(movie => movie.title);

export const getMoviesAfterYear = (year) => movies.filter(movie => movie.releaseYear > year);
