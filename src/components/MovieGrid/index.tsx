import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useResizeObserver from 'use-resize-observer';
import InfiniteScroll from 'react-infinite-scroll-component';

import { getNumberOfColumns } from '../../globals/functions';
import { fetchMovies as apiFetchMovies } from '../../globals/http';
import { CARD_HEIGHT, MOVIES_PER_PAGE } from '../../globals/const';

import { RootStateType } from '../../store/rootReducer';
import {
    fetchMovies,
    fetchMoviesSuccess,
    fetchMoviesFailure,
    favoriteMovie,
} from '../../store/movies/actions';

import Movie from './Movie';
import Loader from './Loader';

import './index.scss';

/**
 * A parent grid container used for rendering the cards.
 * The main app logic is stored here.
 * @returns {React.ReactElement}
 */
const MovieGrid = (): React.ReactElement => {
    const movies = useSelector((store:RootStateType) => store.movies.data);
    const favorites = useSelector((store:RootStateType) => store.movies.favorites);
    const isFetching = useSelector((store:RootStateType) => store.movies.isFetching);
    const hasError = useSelector((store:RootStateType) => store.movies.hasError);
    const dispatch = useDispatch();
    
    const [ visibleMovies, setVisibleMovies ] = useState(movies.slice(0, MOVIES_PER_PAGE));
    const [ selected, setSelected ] = useState(-1);
    const [ columnCount, setColumnCount ] = useState<number>(getNumberOfColumns());

    const gridRef = useRef<HTMLDivElement>(null);
    const { width, height } = useResizeObserver<HTMLDivElement>({ ref: gridRef }); // Tracks and updates window resizing in a react-friendly way

    /**
     * A handler that will fire both on Enter key and on a click
     * @param {string} id Movie id
     */
    const handleFavoriteMovie = (id: number) => dispatch(favoriteMovie(id));

    /**
     * Handles keyboard navigation through the grid
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
            case 'ArrowDown': {
                val = selected !== -1 ? Math.min(selected + columnCount, movies.length - 1) : 0;
                break;
            }
            case 'ArrowUp':
                val = Math.max(selected - columnCount, 0);
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

        const currentRow = Math.ceil((selected + 1) / columnCount);
        const nextRow = Math.ceil((val + 1) / columnCount);

        if (currentRow && nextRow !== currentRow) {
            scrollToRow(nextRow);
        }

        setSelected(val);
    }, [movies, selected, columnCount]);

    /**
     * Loads the next batch of movies
     */
    const loadMoreMovies = () => {
        const nextLimit = Math.min(visibleMovies.length + MOVIES_PER_PAGE, movies.length);
        setVisibleMovies(movies.slice(0, nextLimit));
    };

    /**
     * Scrolls grid to the provided row
     * @param {number} rowNumber Number of row starting with 1
     */
    const scrollToRow = useCallback((rowNumber: number) => {
        const i = rowNumber - 1;
        const val = i * (CARD_HEIGHT + 24) - ((height || 0) - CARD_HEIGHT - 24)/2;

        gridRef.current?.scrollTo({
            top: val,
            behavior: 'smooth',
        });
    }, [height]);

    /**
     * Fetch movies from the API and place them in store
     */
    const getData = async () => {
        try {
            dispatch(fetchMovies());
            const data = await apiFetchMovies();
            dispatch(fetchMoviesSuccess(data));
        } catch (e) {
            dispatch(fetchMoviesFailure());
        }
    };
    
    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    // Track the window change and update columns (this is used to help navigate ↑ and ↓)
    useEffect(() => {
        if (width !== undefined) {
            const count = getNumberOfColumns();
            setColumnCount(count);
        }
    }, [width]);

    useEffect(() => {
        setVisibleMovies(movies.slice(0, MOVIES_PER_PAGE));
    }, [movies.length]);

    if (isFetching) {
        return <Loader />
    }

    return (
        <div id="grid" className="grid" role="grid" ref={gridRef} style={{height: height}}>
            <InfiniteScroll
                dataLength={visibleMovies.length}
                next={loadMoreMovies}
                hasMore={movies.length !== visibleMovies.length}
                loader={<h4>Loading...</h4>}
                scrollableTarget="grid"
                className="grid-scroll"
            >
                {visibleMovies.map((movie, i) => (
                    <Movie
                        key={i}
                        data={movie}
                        isSelected={selected === i}
                        isFavorite={favorites.includes(movie.id)}
                        onClick={handleFavoriteMovie}
                    />
                ))}

                {hasError ? (
                    <p className="grid-end">
                        Whoops! Something went wrong when we tried to get your our list of movies. Please
                        <span onClick={getData}> try again</span>.
                    </p>
                ) : null}

                {visibleMovies.length ? (
                    <p className="grid-end">Oh... I'm sorry... Is {movies.length} movies not enough for you ?</p>
                ): null}
            </InfiniteScroll>
        </div>
    );
};

export default MovieGrid;
