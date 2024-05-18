import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Loader from './index';

describe('Loader', () => {
    beforeEach(() => {
        render(<Loader />);
    });

    it('renders 10 loader cards', () => {
        const loaderCards = screen.getAllByRole('presentation');

        expect(loaderCards).toHaveLength(10);
    });

    it('each loader card has correct animation delay', () => {
        const cards = screen.getAllByRole('presentation');

        const expectedDelays = [0, 0.2, 0.4, 0.6, 0.8, 1, 1.2, 1.4, 1.6, 1.8];

        cards.forEach((card, index) => {
            const style = window.getComputedStyle(card);
            const renderedDelay = parseFloat(style.animationDelay);

            const tolerance = 0.00000001; // Fixing floating point precision

            expect(Math.abs(renderedDelay - expectedDelays[index])).toBeLessThan(tolerance);
        });
    });
});
