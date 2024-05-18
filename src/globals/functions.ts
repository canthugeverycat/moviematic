import { CARD_WIDTH, MONTHS, POSTER_BASE_URL, POSTER_WIDTH } from './const';
import { MovieType } from './types';

/**
 * Get a full movie poster url
 * @param   {string}  id  Movie poster id
 * @return  {string}      (ex. "https://image.tmdb.org/t/p/w500/123556123.jpg")
 */
export const getPoster = (id: string | null): string => id ? `${POSTER_BASE_URL}w${POSTER_WIDTH}${id}` : '';

/**
 * Transform datestring to a human readable date
 * @param   {string}  date  Date string in YYYY-MM-DD format
 * @return  {string} (ex. 'May 19, 2019')
 */
export const getHumanReadableDate = (date?: string): string => {
    if (!date) {
        return '';
    }

    const d = new Date(date);

    const day = d.getDate();
    const month = d.getMonth();
    const year = d.getFullYear();

    return `${MONTHS[month]} ${day}, ${year}`;
};

/**
 * Calculate the number of columns based on the available space
 * @return  {number}
 */
export const getNumberOfColumns = (): number => {
    const availableWidth = window.innerWidth - 2 * 60; // 2 * 60 is for left and right padding
    const count = Math.floor(availableWidth / CARD_WIDTH);

    return count > 0 ? count : 1;
};

/**
 * Removes movies with duplicate ids from the dataset
 * @param   {MovieType[]}  data Array of movie objects
 * @return  {MovieType[]}       Filtered movies
 */
export const removeDuplicates = (data: MovieType[]): MovieType[] => {
    const dataMap = new Map(
        data.map(item => [item.id, item])
    );

    return [...dataMap.values()];
};

/**
 * Sort movies by imdb rating
 * @param   {MovieType[]}  data       Array of movie objects
 * @param   {string}       direction  'asc' or 'desc'
 * @return  {MovieType[]}             Sorted movies
 */
export const sortMoviesByRating = (data: MovieType[], direction: 'asc' | 'desc' = 'desc'): MovieType[] => {
    return data.sort((a, b) => {
        const ratingA = a.ratings[0].rating;
        const ratingB = b.ratings[0].rating;

        return direction === 'asc' ? ratingA - ratingB : ratingB - ratingA;
    });
}
