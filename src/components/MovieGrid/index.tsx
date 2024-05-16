import CSSModules from 'react-css-modules';
import styles from './index.module.scss';

import Movie from './Movie';
import { useState } from 'react';
import { MovieType } from '../../utils/global-types';
import data from '../../movies.json';

const MovieGrid = () => {
    const [ movies, setMovies ] = useState<MovieType[]>([...data.slice(0, 20)]);

    return (
        <div styleName="container">
            {movies.map((movie, i) => <Movie key={i} data={movie} />)}
        </div>
    );
};

export default CSSModules(MovieGrid, styles);
