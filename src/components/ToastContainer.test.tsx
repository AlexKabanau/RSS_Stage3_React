import { render, screen, fireEvent } from '@testing-library/react';
import ToastContainer from './ToastContainer';

describe('ToastContainer', () => {
  test('renders button to show toast', () => {
    render(<ToastContainer />);
    const button = screen.getByText('Показать тост');
    expect(button).toBeInTheDocument();
  });

  test('adds a toast when button is clicked', () => {
    render(<ToastContainer />);
    const button = screen.getByText('Показать тост');
    fireEvent.click(button);

    const toastMessage = screen.getByText(/Это ваше уведомление с/i);
    expect(toastMessage).toBeInTheDocument();
  });

  test('displays toast when button is clicked', () => {
    render(<ToastContainer />);

    fireEvent.click(screen.getByText('Показать тост'));

    expect(screen.getByText(/это ваше уведомление с/i)).toBeInTheDocument();
  });
});
