import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Paginator from './Paginator';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

const renderPaginator = (props = {}) => {
  const defaultProps = {
    totalItemsCount: 4962,
    pageSize: 10,
    currentPage: 1,
    onPageChanged: vi.fn(),
    portionsSize: 10,
    ...props,
  };

  return render(<Paginator {...defaultProps} />);
};

describe('Paginator Component', () => {
  it('renders pagination buttons', () => {
    renderPaginator();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('calls onPageChanged when clicking a page number', () => {
    const onPageChanged = vi.fn();
    renderPaginator({ onPageChanged });

    const page2 = screen.getByText('2');
    fireEvent.click(page2);

    expect(onPageChanged).toHaveBeenCalledWith(2);
  });

  it('shows NEXT button when there are more pages', () => {
    renderPaginator();
    expect(screen.getByText('NEXT')).toBeInTheDocument();
  });

  it('shows PREV button when portionNumber > 1', () => {
    renderPaginator({ currentPage: 49 });
    expect(screen.getByText('NEXT')).toBeInTheDocument();
    const next = screen.getByText('NEXT');
    userEvent.click(next);

    waitFor(() => {
      expect(screen.getByText('PREV')).toBeInTheDocument();
    });
  });

  it('updates portionNumber when clicking NEXT and PREV', () => {
    renderPaginator({ currentPage: 1 });

    const nextButton = screen.getByText('NEXT');
    fireEvent.click(nextButton);

    expect(screen.getByText('PREV')).toBeInTheDocument();
  });
});
