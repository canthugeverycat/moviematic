import { combineReducers, Reducer } from '@reduxjs/toolkit';

import moviesReducer, { StateType as MoviesStateType } from './movies/reducers';
import { MoviesActionType } from './movies/actions';

export type RootStateType = {
    movies: MoviesStateType,
};

// @ts-ignore
const rootReducer: Reducer<RootStateType, MoviesActionType> = combineReducers({
    movies: moviesReducer,
});

export default rootReducer;
