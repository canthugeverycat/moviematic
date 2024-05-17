import {
    FETCH_MOVIES,
    FETCH_MOVIES_SUCCESS,
    FETCH_MOVIES_FAILURE,
    FAVORITE_MOVIE,
} from './action-types';

import { MovieType } from '../../globals/types';

// FETCH_MOVIES
type FetchMoviesActionType = {
    type: typeof FETCH_MOVIES,
};

export const fetchMovies = (): FetchMoviesActionType => ({
    type: FETCH_MOVIES,
});

// FETCH_MOVIES_SUCCESS
type FetchMoviesSuccessActionType = {
    type: typeof FETCH_MOVIES_SUCCESS,
    payload: {
        data: MovieType[],
    }
};

export const fetchMoviesSuccess = (data: MovieType[]): FetchMoviesSuccessActionType => ({
    type: FETCH_MOVIES_SUCCESS,
    payload: { data },
});

// FETCH_MOVIES_FAILURE
type FetchMoviesFailureActionType = {
    type: typeof FETCH_MOVIES_FAILURE,
    payload: {
        error: string,
    }
};

export const fetchMoviesFailure = (error: string): FetchMoviesFailureActionType => ({
    type: FETCH_MOVIES_FAILURE,
    payload: { error },
});

// FAVORITE_MOVIE
type FavoriteMovieActionType = {
    type: typeof FAVORITE_MOVIE,
    payload: {
        id: number,
    }
};

export const favoriteMovie = (id: number): FavoriteMovieActionType => ({
    type: FAVORITE_MOVIE,
    payload: { id },
});


export type MoviesActionType = FetchMoviesActionType | FetchMoviesSuccessActionType | FetchMoviesFailureActionType | FavoriteMovieActionType;
