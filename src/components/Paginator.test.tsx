// import { render, screen, fireEvent } from '@testing-library/react';
// import Paginator from './Paginator';

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

// describe('Paginator Component', () => {
//   let currentPage = 1;

//   const setCurrentPage = (page: number) => {
//     currentPage = page;
//     console.log(`setCurrentPage called with: ${page}`);
//   };

//   const onPageChanged = (pageNumber: number) => {
//     console.log(`onPageChanged called with: ${pageNumber}`);
//   };

//   beforeEach(() => {
//     render(
//       <Paginator
//         currentPage={Number(page)}
//         // setCurrentPage={setCurrentPage}
//         totalItemsCount={count}
//         pageSize={RESOURCES_PER_PAGE}
//         onPageChanged={onPageChanged}
//       />
//     );
//   });

//   test('renders paginator component', () => {
//     expect(screen.getByText(/1/)).toBeInTheDocument();
//   });

//   test('renders correct number of pages', () => {
//     for (let i = 1; i <= 5; i++) {
//       expect(screen.getByText(i.toString())).toBeInTheDocument();
//     }
//   });

//   // test('clicking a page number updates currentPage', () => {
//   //   const pageNumber = screen.getByText('3');
//   //   fireEvent.click(pageNumber);

//   //   expect(currentPage).toBe(3);
//   // });

//   test('shows NEXT button when more pages exist', () => {
//     expect(screen.getByText(/NEXT/)).toBeInTheDocument();
//   });

//   test('does not show PREV on first portion', () => {
//     expect(screen.queryByText(/PREV/)).not.toBeInTheDocument();
//   });
// });
