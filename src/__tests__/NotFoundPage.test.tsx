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
