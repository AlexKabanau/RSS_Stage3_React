import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import NotFoundPager from '.';

describe('NotFoundPage test', () => {
  it('NotFoundPage should be defined', () => {
    expect(NotFoundPager).toBeDefined(); // Убираем JSX
  });

  it('NotFoundPage should render', () => {
    render(
      <MemoryRouter initialEntries={['/not-found']}>
        <NotFoundPager />
      </MemoryRouter>
    );

    const text = screen.getByText('😢 OOPS! Page not found.');
    const homeButton = screen.getByText('Home Page');

    expect(text).toBeInTheDocument();
    expect(homeButton).toBeInTheDocument();
  });
});
