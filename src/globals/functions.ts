import { CARD_WIDTH, MONTHS, POSTER_BASE_URL, POSTER_WIDTH } from './const';

/**
 * Get a full movie poster url
 *
 * @param   {string}  id  Movie poster id
 *
 * @return  {string}      (ex. "https://image.tmdb.org/t/p/w500/123556123.jpg")
 */
export const getPoster = (id: string | null): string => id ? `${POSTER_BASE_URL}w${POSTER_WIDTH}${id}` : '';

/**
 * Transform datestring to a human readable date
 *
 * @param   {string}  date  Date string in YYYY-MM-DD format
 *
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
 * 
 * @return  {number}
 */
export const getNumberOfColumns = () => {
    const availableWidth = window.innerWidth * 0.75; // Grid is 75% of the window width
    const count = Math.floor(availableWidth / CARD_WIDTH);
    return count > 0 ? count : 1;
};
