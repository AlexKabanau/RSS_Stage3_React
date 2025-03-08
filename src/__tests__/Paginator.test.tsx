import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Paginator from '@/components/Paginator';
import { MemoryRouter } from 'react-router';

describe('Paginator', () => {
  const totalItemsCount = 999;
  const pageSize = 10;
  const onPageChanged = vi.fn();

  beforeEach(() => {
    render(
      <MemoryRouter>
        <Paginator
          totalItemsCount={totalItemsCount}
          pageSize={pageSize}
          currentPage={1}
          onPageChanged={onPageChanged}
        />
      </MemoryRouter>
    );
  });

  test('renders the correct number of page numbers', () => {
    const pageNumbers = screen.getAllByText(/^\d+$/);
    expect(pageNumbers.length).toBe(10);
  });

  test('calls onPageChanged when a page number is clicked', () => {
    const pageTwo = screen.getByText('2');
    fireEvent.click(pageTwo);
    expect(onPageChanged).toHaveBeenCalledWith(2);
  });

  test('disables the "PREV" button on the first portion', () => {
    const prevButton = screen.queryByText('PREV');
    expect(prevButton).not.toBeInTheDocument();
  });

  test('shows the "NEXT" button when there are more pages', () => {
    const nextButton = screen.getByText('NEXT');
    expect(nextButton).toBeInTheDocument();
  });

  test('changes portion when "NEXT" is clicked', () => {
    const nextButton = screen.getByText('NEXT');
    fireEvent.click(nextButton);

    const pageEleven = screen.getByText('11');
    expect(pageEleven).toBeInTheDocument();
  });
});
