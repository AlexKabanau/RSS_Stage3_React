import { render, screen } from '@testing-library/react';
import Toast from './Toast';

describe('Toast component', () => {
  it('renders content correctly', () => {
    const content = <span>This is a toast message!</span>;

    render(<Toast content={content} />);

    expect(screen.getByText('This is a toast message!')).toBeInTheDocument();
  });

  it('has the correct class name', () => {
    const content = <span>Another toast message!</span>;

    render(<Toast content={content} />);

    const toastElement = screen.getByText('Another toast message!');

    expect(toastElement).toBeInTheDocument();

    expect(toastElement.parentElement).toHaveClass('toast');
  });
});
