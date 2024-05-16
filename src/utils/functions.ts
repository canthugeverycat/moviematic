import { CARD_WIDTH, MONTHS, POSTER_BASE_URL, POSTER_WIDTH } from './consts';

export const getPoster = (id: string | null): string => id ? `${POSTER_BASE_URL}w${POSTER_WIDTH}${id}` : '';

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

export const getNumberOfColumns = () => {
    const availableWidth = window.innerWidth * 0.75; // Grid is 75% of the window width
    const count = Math.floor(availableWidth / CARD_WIDTH);
    return count > 0 ? count : 1;
};
