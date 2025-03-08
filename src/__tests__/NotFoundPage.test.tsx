import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NotFoundPage from '@/components/not-found';
import { MemoryRouter } from 'react-router';

describe('NotFoundPage component', () => {
  it('renders the not found message', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    expect(screen.getByText('😢 OOPS! Page not found.')).toBeInTheDocument();
  });

  it('has a link to the home page', async () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    const homeLink = screen.getByRole('link', { name: /home page/i });
    expect(homeLink).toHaveAttribute('href', '/');

    await userEvent.click(homeLink);
  });
});
