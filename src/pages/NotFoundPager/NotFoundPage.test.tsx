import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import NotFoundPager from '.';

describe('NotFoundPage test', () => {
  it('NotFoundPage should defined', () => {
    expect(<NotFoundPager />).toBeDefined();
  });

  it('NotFoundPage should render', () => {
    render(
      <MemoryRouter initialEntries={['/not-found']}>
        <NotFoundPager />
      </MemoryRouter>
    );
    const text = screen.getByText('😢 OOPS! Page not found.');
    expect(text).toBeInTheDocument();
  });
});
