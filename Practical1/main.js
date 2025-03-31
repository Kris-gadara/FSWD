import { addMovie, listMoviesByGenre, findHighestRatedMovie, getAllMovieTitles, getMoviesAfterYear, movies } from './prac1.js';

addMovie("Dune", "Sci-Fi", 8.5, 2021);
addMovie("Joker", "Drama", 8.4, 2019);

console.log("All Movies:", movies);
console.log("Sci-Fi Movies:", listMoviesByGenre("Sci-Fi"));
console.log("Highest Rated Movie:", findHighestRatedMovie());
console.log("All Movie Titles:", getAllMovieTitles());
console.log("Movies After 2010:", getMoviesAfterYear(2010));
