import React from 'react';
import { render, screen } from '@testing-library/react';
// import NotFoundPage from '@/components/NotFoundPage';
import userEvent from '@testing-library/user-event';
import NotFoundPage from '@/components/not-found';
import { MemoryRouter } from 'react-router';
// import { MemoryRouter } from 'react-router-dom';

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
    // Здесь можно добавить дополнительные проверки, если в тесте требуется навигация
  });
});
