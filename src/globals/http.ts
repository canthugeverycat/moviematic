import { MovieType } from "./types";
import data from "../mocks/db.json";

/**
 * Obtains a list of movies from the API
 * @return  {MovieType[]}  List of movies
 */
export const fetchMovies = async (): Promise<MovieType[]> => {
  return new Promise<MovieType[]>((resolve) => {
    setTimeout(() => {
      const { movies } = data;
      resolve(movies);
    }, 1500);
  });
};
