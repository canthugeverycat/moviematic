
import { IoIosStar, IoIosStarOutline } from 'react-icons/io';

import classNames from 'classnames';

import { MovieType } from '../../../utils/global-types';
import { getHumanReadableDate, getPoster } from '../../../utils/functions';
import React, { useState } from 'react';

import './index.scss';

type MovieProps = {
    data: MovieType,
    isSelected: boolean,
};

const Movie: React.FC<MovieProps> = ({
    data: {
        title,
        poster_path,
        release_date,
    },
    isSelected,
}) => {
    const [isFavorite, setIsFavorite] = useState(false);

    return (
        <div
            className={classNames('movie', {
                'movie--selected': isSelected,
                'movie--favorite': isFavorite,
            })}
            onClick={() => setIsFavorite(prev => !prev)}
        >
            <img src={getPoster(poster_path)} className="movie-poster" />

            <IoIosStar className="icon-favorite icon-favorite--on" color="#ffcf40" size={50} />
            <IoIosStarOutline className="icon-favorite icon-favorite--off" color="white" size={50} />

            <div className="movie-info">
                <p className="movie-title">{title}</p>
                <p className="movie-release-date">{getHumanReadableDate(release_date)}</p>
            </div>
        </div>
    );
};

export default Movie;
