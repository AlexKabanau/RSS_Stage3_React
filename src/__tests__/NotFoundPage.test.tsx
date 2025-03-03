import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
// import NotFoundPage from '@/pages/404';
import { describe, expect, test } from 'vitest';
import NotFoundPage from '@/pages/404';

describe('404 Page', () => {
  test('should display the 404 error message', () => {
    render(<NotFoundPage />);

    const text = screen.getByText(/😢 OOPS! Page not found/i);
    expect(text).toBeInTheDocument();
  });
});

// import { fireEvent, render, screen, waitFor } from '@testing-library/react';
// import { MemoryRouter } from 'react-router';

// import NotFoundPager from '.';

// describe('NotFoundPage test', () => {
//   it('NotFoundPage should be defined', () => {
//     expect(NotFoundPager).toBeDefined();
//   });

//   it('NotFoundPage should render', () => {
//     render(
//       <MemoryRouter initialEntries={['/not-found']}>
//         <NotFoundPager />
//       </MemoryRouter>
//     );

//     const text = screen.getByText('😢 OOPS! Page not found.');
//     const homeButton = screen.getByText('Home Page');

//     expect(text).toBeInTheDocument();
//     expect(homeButton).toBeInTheDocument();
//   });

//   it('Click to button should redirect to home', () => {
//     render(
//       <MemoryRouter initialEntries={['/not-found']}>
//         <NotFoundPager />
//       </MemoryRouter>
//     );

//     const homeButton = screen.getByText('Home Page');
//     fireEvent.click(homeButton);

//     waitFor(() => {
//       expect(NotFoundPager).not.toBeInTheDocument();
//     });
//   });
// });
