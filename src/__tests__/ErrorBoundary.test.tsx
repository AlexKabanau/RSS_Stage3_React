import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import ErrorBoundary from '@/components/ErrorBoundary';
import ErrorButton from '@/components/ErrorButton';

test('Make sure the errorButton is working', () => {
  const spyError = vi.spyOn(console, 'error').mockImplementation(() => {}); // Отключаем лишние логи

  render(
    <ErrorBoundary>
      <ErrorButton />
    </ErrorBoundary>
  );

  const errorBtn = screen.getByTestId('errorButton');
  fireEvent.click(errorBtn);

  expect(
    screen.getByText('Some error occurred. Please open console and try again.')
  ).toBeInTheDocument();
  expect(screen.getByText('Reset')).toBeInTheDocument();

  spyError.mockRestore(); // Восстанавливаем консоль
});
