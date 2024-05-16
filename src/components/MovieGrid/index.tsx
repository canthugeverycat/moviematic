import Movie from './Movie';
import { useCallback, useEffect, useRef, useMemo, useState } from 'react';
import useResizeObserver from 'use-resize-observer';
import { MovieType } from '../../utils/global-types';
import { getNumberOfColumns } from '../../utils/functions';
import data from '../../movies.json';

import './index.scss';

const MovieGrid = () => {
    const [ movies, setMovies ] = useState<MovieType[]>([...data.slice(0, 20)]);
    const [ selected, setSelected ] = useState(-1);
    const { ref: gridRef, width } = useResizeObserver<HTMLDivElement>();
    const [ columnsCount, setColumnsCount ] = useState<number>(getNumberOfColumns());

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
            default:
                return;
        }

        setSelected(val);
    }, [movies, selected, columnsCount]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [handleKeyDown]);

    useEffect(() => {
        if (width !== undefined) {
            const count = getNumberOfColumns();
            setColumnsCount(count);
        }
    }, [width]);

    return (
        <div className="grid" ref={gridRef}>
            {movies.map((movie, i) => <Movie key={i} data={movie} isSelected={selected === i} />)}
        </div>
    );
};

export default MovieGrid;
