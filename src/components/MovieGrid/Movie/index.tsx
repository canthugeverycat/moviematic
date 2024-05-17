
import { IoIosStar, IoIosStarOutline } from 'react-icons/io';

import classNames from 'classnames';

import { MovieType } from '../../../globals/types';
import { getHumanReadableDate, getPoster } from '../../../globals/functions';
import React, { useEffect, useState } from 'react';
import { FAVORITE_ANIMATION_DURATION_MS } from '../../../globals/const';

import './index.scss';

type MovieProps = {
    data: MovieType,
    isSelected: boolean,
    isFavorite: boolean,
    onClick: (id: number) => void,
};

/**
 * A component for displaying a grid card with movie information
 * @param {Object} props
 * @param {MovieType} props.data Movie data
 * @param {boolean} props.isSelected Is this movie selected
 * @param {boolean} props.isFavorite Is this movie favorited
 * @returns {React.ReactElement}
 */
const Movie = ({
    data: {
        id,
        title,
        poster_path,
        release_date,
    },
    isSelected,
    isFavorite,
    onClick,
}: MovieProps ): React.ReactElement => {
    const [favoriteChanged, setFavoriteChanged] = useState(false);

    // We do this to provide a time window to animate the card
    useEffect(() => {
        if (isFavorite) {
            setFavoriteChanged(true);

            // Reset state after animation duration
            const timer = setTimeout(() => {
                setFavoriteChanged(false);
            }, FAVORITE_ANIMATION_DURATION_MS);

            return () => clearTimeout(timer);
        }
    }, [isFavorite]);

    return (
        <div
            className={classNames('movie', {
                'movie--selected': isSelected,
                'movie--favorite': isFavorite,
                'movie--favorite-animate': favoriteChanged,
            })}
            onClick={() => onClick(id)}
        >
            <div
                style={{
                    backgroundImage: `url(${getPoster(poster_path)})`,
                }}
                className="movie-poster"
            />
    
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
