import CSSModules from 'react-css-modules';
import styles from './index.module.scss';

import { IoIosStar, IoIosStarOutline } from 'react-icons/io';

import { MovieType } from '../../../utils/global-types';
import { getHumanReadableDate, getPoster } from '../../../utils/functions';
import React, { useState } from 'react';

type MovieProps = {
    data: MovieType,
};

const Movie: React.FC<MovieProps> = ({
    data: {
        title,
        poster_path,
        release_date,
    },
}) => {
    const [isFavorite, setIsFavorite] = useState(false);

    return (
        <div styleName="container">
            <img src={getPoster(poster_path)} styleName="poster" />
            {isFavorite ? (
                <IoIosStar styleName="favorite" color="#ffcf40" size={50} onClick={() => setIsFavorite(false)} />
            ) : (
                <IoIosStarOutline styleName="favorite" color="white" size={50} onClick={() => setIsFavorite(true)} />
            )}
            <p styleName="info">
                <p styleName="title">{title}</p>
                <p styleName="release-date">{getHumanReadableDate(release_date)}</p>
            </p>
        </div>
    );
};

export default CSSModules(Movie, styles);
