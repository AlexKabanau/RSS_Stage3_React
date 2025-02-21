import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ToastProvider } from './ToastContext';
import '@testing-library/jest-dom';
import { useToast } from './useToast';

vi.mock('./Toast', () => {
  return {
    default: function DummyToast({ content }: { content: React.ReactNode }) {
      return <div data-testid="toast">{content}</div>;
    },
  };
});

describe('ToastProvider', () => {
  test('рендерит дочерние элементы', () => {
    render(
      <ToastProvider>
        <div data-testid="child">Дочерний компонент</div>
      </ToastProvider>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  test('добавляет тост при вызове addToast', async () => {
    const TestComponent = () => {
      const { addToast } = useToast();
      return (
        <button onClick={() => addToast('Тестовый тост')} data-testid="button">
          Добавить тост
        </button>
      );
    };

    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    await userEvent.click(screen.getByTestId('button'));
    expect(await screen.findByText('Тестовый тост')).toBeInTheDocument();
  });

  test('хук useToast выбрасывает ошибку при использовании вне ToastProvider', () => {
    const ProblemComponent = () => {
      useToast();
      return <div>Проблемный компонент</div>;
    };

    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => render(<ProblemComponent />)).toThrow(
      'useToast must be used within a ToastProvider'
    );

    spy.mockRestore();
  });
});
