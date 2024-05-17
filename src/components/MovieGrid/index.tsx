import Movie from './Movie';
import { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useResizeObserver from 'use-resize-observer';

import { getNumberOfColumns } from '../../globals/functions';
import { RootStateType } from '../../store/rootReducer';

import './index.scss';
import { favoriteMovie } from '../../store/movies/actions';

/**
 * A parent grid container used for rendering the cards.
 * The main app logic is stored here.
 * @returns {React.ReactElement}
 */
const MovieGrid = (): React.ReactElement => {
    const movies = useSelector((store:RootStateType) => store.movies.data);
    const favorites = useSelector((store:RootStateType) => store.movies.favorites);
    const dispatch = useDispatch();

    const [ selected, setSelected ] = useState(-1);
    const [ columnsCount, setColumnsCount ] = useState<number>(getNumberOfColumns());

    const { ref: gridRef, width } = useResizeObserver<HTMLDivElement>(); // Tracks and updates window resizing in a react-friendly way

    /**
     * A common handler that will fire both on Enter key and on a click
     * 
     * @param {string} id Movie id
     */
    const handleFavoriteMovie = (id: number) => dispatch(favoriteMovie(id));

    /**
     * Handles keyboard navigation through the grid
     * 
     * @param {KeyboardEvent} e
     */
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        e.preventDefault();
        let val = selected;

        switch (e.key) {
            case 'ArrowLeft':
                val = Math.max(0, selected - 1);
                break;
            case 'ArrowRight':
                val = Math.min(selected + 1, movies.length - 1);
                break;
            case 'ArrowDown':
                val = Math.min(selected + columnsCount, movies.length - 1);
                break;
            case 'ArrowUp':
                val = Math.max(selected - columnsCount, 0);
                break;
            case 'Enter': {
                if (selected > -1) {
                    handleFavoriteMovie(movies[selected].id)
                }
                break;
            }
            default:
                return;
        }

        setSelected(val);
    }, [movies, selected, columnsCount]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    // Track the window change and update columns
    // (this is used to help navigate ↑ and ↓)
    useEffect(() => {
        if (width !== undefined) {
            const count = getNumberOfColumns();
            setColumnsCount(count);
        }
    }, [width]);

    return (
        <div className="grid" ref={gridRef}>
            {movies.map((movie, i) => (
                <Movie
                    key={i}
                    data={movie}
                    isSelected={selected === i}
                    isFavorite={favorites.includes(movie.id)}
                    onClick={handleFavoriteMovie}
                />
            ))}
        </div>
    );
};

export default MovieGrid;
