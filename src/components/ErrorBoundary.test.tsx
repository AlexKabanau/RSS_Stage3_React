import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

const ProblematicComponent = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary Component', () => {
  test('renders child components correctly when there is no error', () => {
    render(
      <ErrorBoundary>
        <h1>Child Component</h1>
      </ErrorBoundary>
    );
    expect(
      screen.getByRole('heading', { name: /Child Component/i })
    ).toBeInTheDocument();
  });

  test('renders error message when a child throws an error', () => {
    render(
      <ErrorBoundary>
        <ProblematicComponent />
      </ErrorBoundary>
    );

    expect(
      screen.getByRole('heading', {
        name: /Some error occurred. Please open console and try again./i,
      })
    ).toBeInTheDocument();
    expect(screen.getByText('Test error')).toBeInTheDocument();
  });
});
