import { MovieType } from "./types";

const API_BASE_URL = 'http://localhost:3001';

/**
 * Obtains a list of movies from the API
 * @return  {MovieType[]}  List of movies
 */
export const fetchMovies = async (): Promise<MovieType[]> => {
    try {
        const res = await fetch(`${API_BASE_URL}/movies`);
    
        const data: MovieType[] = await res.json();

        return data;
    } catch (e) {
        const message = e instanceof Error ? e.message : 'An error has occured!';
        throw new Error(message);
    }
};
