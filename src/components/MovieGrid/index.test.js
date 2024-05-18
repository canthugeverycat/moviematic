import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import MovieGrid from './index';

jest.mock('../../globals/http.ts', () => ({
    fetchMovies: jest.fn(() => Promise.resolve([])),
}));

jest.mock('react', () => {
    return {
      ...jest.requireActual('react'),
      useRef: () => {
        return {
          current: { width: 1280, height: 720 },
        };
      }
    };
});

class ResizeObserver {
    observe() {}
    unobserve() {}
}

const mockStore = configureStore([]);

const movieFactory = (i) => ({
    id: i,
    title: 'Movie Title',
    poster_path: 'test.jpg',
    release_date: '2024-05-18',
});

describe('MovieGrid', () => {
    beforeEach(() => {
        window.ResizeObserver = ResizeObserver;

        const store = mockStore({
            movies: {
                data: Array.from({ length: 20}).map(i => movieFactory(i)),
                favorites: [],
                isFetching: false,
                hasError: false,
            },
        });

        render(<Provider store={store}><MovieGrid /></Provider>);
    });

    it('renders movie cards correctly in the grid', () => {
        expect(screen.getAllByTestId('movie-card')).toHaveLength(10);
    });

    it('loads more movies when reaching the end', async () => {
        await waitFor(() => {
            fireEvent.scroll(screen.getByRole('grid'));
        });

        await waitFor(() => expect(screen.getAllByTestId('movie-card')).toHaveLength(20));
    });

    it('handles keyboard navigation', () => {
        fireEvent.keyDown(window, { key: 'ArrowRight' });
        fireEvent.keyDown(window, { key: 'ArrowRight' });
        // Expected grid location
        // [ ] [X] [ ]
        // [ ] [ ] [ ]
        expect(screen.getAllByTestId('movie-card')[1]).toHaveClass('movie--selected');

        
        fireEvent.keyDown(window, { key: 'ArrowLeft' });
        // Expected grid location
        // [X] [ ] [ ]
        // [ ] [ ] [ ]
        expect(screen.getAllByTestId('movie-card')[0]).toHaveClass('movie--selected');

        fireEvent.keyDown(window, { key: 'ArrowDown' });
        // Expected grid location
        // [ ] [ ] [ ]
        // [X] [ ] [ ]
        expect(screen.getAllByTestId('movie-card')[3]).toHaveClass('movie--selected');

        fireEvent.keyDown(window, { key: 'ArrowUp' });
        // Expected grid location
        // [X] [ ] [ ]
        // [ ] [ ] [ ]
        expect(screen.getAllByTestId('movie-card')[0]).toHaveClass('movie--selected');
    });
});
