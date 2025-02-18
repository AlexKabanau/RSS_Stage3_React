import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ToastProvider, useToast } from './ToastContext';
import '@testing-library/jest-dom';

// Мокаем компонент Toast, чтобы не зависеть от его реализации
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

  // test('удаляет тост через 3000 мс', async () => {
  //   // Используем fake timers только для этого теста
  //   vi.useFakeTimers();

  //   const TestComponent = () => {
  //     const { addToast } = useToast();
  //     return (
  //       <button
  //         onClick={() => addToast('Тост с таймаутом')}
  //         data-testid="button"
  //       >
  //         Добавить тост
  //       </button>
  //     );
  //   };

  //   render(
  //     <ToastProvider>
  //       <TestComponent />
  //     </ToastProvider>
  //   );

  //   await userEvent.click(screen.getByTestId('button'));

  //   // Ждем, пока тост появится в DOM
  //   expect(await screen.findByText('Тост с таймаутом')).toBeInTheDocument();

  //   // Оборачиваем изменение времени в act, чтобы обновления применились корректно
  //   await act(async () => {
  //     vi.advanceTimersByTime(3000);
  //   });

  //   // Ждем, что тост будет удален из DOM
  //   await waitFor(() => {
  //     expect(screen.queryByText('Тост с таймаутом')).not.toBeInTheDocument();
  //   });

  //   // Восстанавливаем реальные таймеры
  //   vi.useRealTimers();
  // });

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
