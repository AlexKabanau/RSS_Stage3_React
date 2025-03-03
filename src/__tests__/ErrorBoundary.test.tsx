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
// test('getDerivedStateFromError sets correct state', () => {
//   const errorState = ErrorBoundary.getDerivedStateFromError(new Error('Test error'));
//   expect(errorState).toEqual({ hasError: true, message: 'Some error!' });
// });

// test('componentDidCatch logs error', () => {
//   const spyConsoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

//   const TestComponent = () => {
//     throw new Error('Test error');
//   };

//   render(
//     <ErrorBoundary>
//       <TestComponent />
//     </ErrorBoundary>
//   );

//   expect(spyConsoleError).toHaveBeenCalled();
//   spyConsoleError.mockRestore();
// });

// test('Reset button clears error state', () => {
//   render(
//     <ErrorBoundary>
//       <ErrorButton />
//     </ErrorBoundary>
//   );

//   fireEvent.click(screen.getByTestId('errorButton'));

//   expect(
//     screen.getByText('Some error occurred. Please open console and try again.')
//   ).toBeInTheDocument();

//   fireEvent.click(screen.getByText('Reset'));

//   expect(screen.queryByText('Some error occurred.')).not.toBeInTheDocument();
// });

// test('ErrorBoundary correctly renders children when no error', () => {
//   render(
//     <ErrorBoundary>
//       <div data-testid="child-component">Hello, world!</div>
//     </ErrorBoundary>
//   );

//   expect(screen.getByTestId('child-component')).toBeInTheDocument();
// });
