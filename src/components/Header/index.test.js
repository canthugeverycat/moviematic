import { render, screen } from '@testing-library/react';
import Header from './index';

describe('Header', () => {
    it('renders all arrow key icons', () => {
        render(<Header />);

        ['left', 'up', 'down', 'right', 'enter'].forEach(type => {
            expect(screen.getByRole('presentation', { name: `key-${type}` })).toBeInTheDocument();
        });
    })
});
