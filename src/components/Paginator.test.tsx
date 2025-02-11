import { render, screen, fireEvent } from '@testing-library/react';
import Paginator from './Paginator';

describe('Paginator Component', () => {
  let currentPage = 1;

  const setCurrentPage = (page: number) => {
    currentPage = page;
    console.log(`setCurrentPage called with: ${page}`);
  };

  const onPageChanged = (pageNumber: number) => {
    console.log(`onPageChanged called with: ${pageNumber}`);
  };

  beforeEach(() => {
    render(
      <Paginator
        totalItemsCount={50}
        pageSize={5}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onPageChanged={onPageChanged}
        portionsSize={5}
      />
    );
  });

  test('renders paginator component', () => {
    expect(screen.getByText(/1/)).toBeInTheDocument();
  });

  test('renders correct number of pages', () => {
    for (let i = 1; i <= 5; i++) {
      expect(screen.getByText(i.toString())).toBeInTheDocument();
    }
  });

  test('clicking a page number updates currentPage', () => {
    const pageNumber = screen.getByText('3');
    fireEvent.click(pageNumber);

    expect(currentPage).toBe(3);
  });

  test('shows NEXT button when more pages exist', () => {
    expect(screen.getByText(/NEXT/)).toBeInTheDocument();
  });

  test('does not show PREV on first portion', () => {
    expect(screen.queryByText(/PREV/)).not.toBeInTheDocument();
  });
});
