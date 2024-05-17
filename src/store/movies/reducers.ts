import {
    FETCH_MOVIES,
    FETCH_MOVIES_SUCCESS,
    FETCH_MOVIES_FAILURE,
    FAVORITE_MOVIE,
} from './action-types';

import { MovieType } from '../../utils/global-types';
import { MoviesActionType } from './actions';

import data from '../../movies.json';

export type StateType = {
    data: MovieType[],
    favorites: number[],
    isFetching: boolean,
    error: string | null,
};

const initialState: StateType = {
    data: data.slice(0, 30),
    favorites: [],
    isFetching: false,
    error: null,
};

export const moviesReducer = (state: StateType = initialState, action: MoviesActionType): StateType => {
    switch (action.type) {
        case FETCH_MOVIES:
            return { ...state, isFetching: true, error: null };
        case FETCH_MOVIES_SUCCESS: {
            const { data } = action.payload;

            return { ...state, data, isFetching: false };
        }
        case FETCH_MOVIES_FAILURE: {
            const { error } = action.payload;
            return { ...state, error, isFetching: false };
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
