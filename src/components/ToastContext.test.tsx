import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, beforeEach, afterEach } from 'vitest';
import { ToastProvider, useToast } from './ToastContext';

const TestComponent: React.FC = () => {
  const { addToast } = useToast();
  return <button onClick={() => addToast('Test toast')}>Show Toast</button>;
};

describe('ToastProvider', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('adds and removes toast after 3 seconds', async () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    // Нажимаем кнопку, чтобы добавить тост
    userEvent.click(screen.getByText('Show Toast'));

    // Ожидаем появления тоста
    await waitFor(() => {
      const toastElement = screen.getByText('Test toast');
      console.log('Toast added:', toastElement);
      expect(toastElement).toBeInTheDocument();
    });

    // Проматываем время на 3 секунды вперед
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    // Ожидаем исчезновения тоста
    await waitFor(() => {
      const removedToastElement = screen.queryByText('Test toast');
      console.log('Toast removed:', removedToastElement);
      expect(removedToastElement).not.toBeInTheDocument();
    });
  }, 15000); // Увеличиваем тайм-аут теста до 15 секунд
});
