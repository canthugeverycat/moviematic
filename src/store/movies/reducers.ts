import {
    FETCH_MOVIES,
    FETCH_MOVIES_SUCCESS,
    FETCH_MOVIES_FAILURE,
    FAVORITE_MOVIE,
} from './action-types';

import { MovieType } from '../../globals/types';
import { MoviesActionType } from './actions';
import { removeDuplicates, sortMoviesByRating } from '../../globals/functions';

export type StateType = {
    data: MovieType[],
    favorites: number[],
    isFetching: boolean,
    hasError: boolean,
};

const initialState: StateType = {
    data: [],
    favorites: [],
    isFetching: false,
    hasError: false,
};

export const moviesReducer = (state: StateType = initialState, action: MoviesActionType): StateType => {
    switch (action.type) {
        case FETCH_MOVIES:
            return { ...state, isFetching: true, hasError: false };
        case FETCH_MOVIES_SUCCESS: {
            const { data } = action.payload;

            const filtered = removeDuplicates(data);
            const sorted = sortMoviesByRating(filtered);

            return { ...state, data: sorted, isFetching: false };
        }
        case FETCH_MOVIES_FAILURE: {
            return { ...state, hasError: true, isFetching: false };
        }
        case FAVORITE_MOVIE: {
            const { id } = action.payload;
            const { favorites } = state;

            let newFavorites = favorites.slice();

            if (favorites.includes(id)) {
                newFavorites = favorites.filter(item => item !== id);
            } else {
                newFavorites.push(id);
            }

            return { ...state, favorites: newFavorites };
        }
        default:
            return state;
    }
};

export default moviesReducer;
