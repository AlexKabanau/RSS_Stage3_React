import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import mockRouter from 'next-router-mock';
import { expect, test, vi } from 'vitest';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
// import Home from '../pages/index';
// import { TransformSpellsRequest } from './_fakeData';
import ThemeContextProvider from '@/context/ThemeContext';
import { ToastProvider } from '@/components/ToastContext';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
// import HomePage from '../pages/index';
import { mockFakeMoreResponse } from '@/mock/mock';
// import { NextRouter } from 'next/router';
// import HomePageContainer from '@/app/page';
import HomePage from '@/__tests__/app/components/HomePage';

const mockData = {
  data: mockFakeMoreResponse,
};
const pushMock = vi.fn();
const searchParamValue = '1';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
  useSearchParams: () => ({
    get: (key: string) => (key === 'search' ? searchParamValue : '1'),
  }),
}));
test('Make sure the component updates URL query parameter when page changes', async () => {
  mockRouter.setCurrentUrl('/?page=1');
  render(
    <ThemeContextProvider>
      <ToastProvider>
        <Provider store={store}>
          <RouterContext.Provider value={mockRouter}>
            <HomePage cards={mockData.data} />
          </RouterContext.Provider>
        </Provider>
      </ToastProvider>
    </ThemeContextProvider>
  );
  const pagination = screen.getByTestId('paginator');
  const page2 = screen.getByText('2');
  fireEvent.click(page2);

  expect(pagination).toBeInTheDocument();

  waitFor(() => {
    expect(mockRouter.query).toEqual({ page: '2' });
  });
  // fireEvent.click(nextBtn);
  // expect(mockRouter.query).toEqual({ page: '2', limit: '10' });
  // fireEvent.click(nextBtn);
  // expect(mockRouter.query).toEqual({ page: '3', limit: '10' });
  // fireEvent.click(prevBtn);
  // expect(mockRouter.query).toEqual({ page: '2', limit: '10' });
});

// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import Paginator from './Paginator';
// import { describe, it, expect, vi } from 'vitest';
// import userEvent from '@testing-library/user-event';

// const renderPaginator = (props = {}) => {
//   const defaultProps = {
//     totalItemsCount: 4962,
//     pageSize: 10,
//     currentPage: 1,
//     onPageChanged: vi.fn(),
//     portionsSize: 10,
//     ...props,
//   };

//   return render(<Paginator {...defaultProps} />);
// };

// describe('Paginator Component', () => {
//   it('renders pagination buttons', () => {
//     renderPaginator();
//     expect(screen.getByText('1')).toBeInTheDocument();
//     expect(screen.getByText('2')).toBeInTheDocument();
//   });

//   it('calls onPageChanged when clicking a page number', () => {
//     const onPageChanged = vi.fn();
//     renderPaginator({ onPageChanged });

//     const page2 = screen.getByText('2');
//     fireEvent.click(page2);

//     expect(onPageChanged).toHaveBeenCalledWith(2);
//   });

//   it('shows NEXT button when there are more pages', () => {
//     renderPaginator();
//     expect(screen.getByText('NEXT')).toBeInTheDocument();
//   });

//   it('shows PREV button when portionNumber > 1', () => {
//     renderPaginator({ currentPage: 49 });
//     expect(screen.getByText('NEXT')).toBeInTheDocument();
//     const next = screen.getByText('NEXT');
//     userEvent.click(next);

//     waitFor(() => {
//       expect(screen.getByText('PREV')).toBeInTheDocument();
//     });
//   });

//   it('updates portionNumber when clicking NEXT and PREV', () => {
//     renderPaginator({ currentPage: 1 });

//     const nextButton = screen.getByText('NEXT');
//     fireEvent.click(nextButton);

//     expect(screen.getByText('PREV')).toBeInTheDocument();
//   });
// });
