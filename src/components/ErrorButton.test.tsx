import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorButton from './ErrorButton';

const renderWithErrorBoundary = (ui: React.ReactNode) => {
  return render(<ErrorBoundary>{ui}</ErrorBoundary>);
};

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error('Error caught in ErrorBoundary:', error);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

describe('ErrorButton Component', () => {
  test('renders ErrorButton', () => {
    render(<ErrorButton />);
    expect(
      screen.getByRole('button', { name: /ErrorButton/i })
    ).toBeInTheDocument();
  });

  test('throws error when button is clicked', () => {
    const { getByRole } = renderWithErrorBoundary(<ErrorButton />);

    // Нажимаем на кнопку
    fireEvent.click(getByRole('button', { name: /ErrorButton/i }));

    // Проверяем, что компонент обрабатывает ошибку
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
  });
});
