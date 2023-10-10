import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from "./header";

test('Renders Header components', () => {
    render(
        <MemoryRouter>
            <Header />
        </MemoryRouter>
    );

    const podcasterLink = screen.getByText('Podcaster');
    expect(podcasterLink).toBeInTheDocument();
});
