import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Movie from './index';

describe('Movie', () => {
    const props = {
        data: {
            id: 123,
            title: 'Test Movie',
            poster_path: '/test-poster.jpg',
            release_date: '2024-05-18',
        },
        isSelected: false,
        isFavorite: false,
        onClick: jest.fn(),
    };

    it('renders title, poster, and release date', () => {
        render(<Movie {...props} />);

        const expectedUrl = 'https://image.tmdb.org/t/p/w300/test-poster.jpg';
        const style = window.getComputedStyle(screen.getByTestId('movie-poster'));
        
        expect(style.backgroundImage).toBe(`url(${expectedUrl})`);
        expect(screen.getByText('Test Movie')).toBeInTheDocument();
        expect(screen.getByText('May 18, 2024')).toBeInTheDocument();
    });

    it('calls onClick callback with proper arguments', () => {
        render(<Movie {...props} />);

        fireEvent.click(screen.getByTestId('movie-card'));

        expect(props.onClick).toHaveBeenCalledWith(123);
    });

    it('applies class when movie is selected', () => {
        render(<Movie {...{ ...props, isSelected: true }} />);

        expect(screen.getByTestId('movie-card')).toHaveClass('movie--selected');
    });

    it('applies class when movies is favorited', () => {
        render(<Movie {...{ ...props, isFavorite: true }} />);

        expect(screen.getByTestId('movie-card')).toHaveClass('movie--favorite');
    });

    it('applies animation when movie is favorited', async () => {
        const { rerender } = render(<Movie {...props} />);
        rerender(<Movie {...{ ...props, isFavorite: true }} />);

        expect(screen.getByTestId('movie-card')).toHaveClass('movie--favorite-animate');

        await waitFor(() => expect(screen.getByTestId('movie-card')).not.toHaveClass('movie--favorite-animate'));
    });
});
