import React from 'react';
import Main from '@/components/Main';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { ToastProvider } from '@/components/ToastContext';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
// import Main from '../Main';
import favoritsSlice from '../store/reducers/favorites';
// import { mockFakeItemList } from '@/mock/mock';

const createTestStore = () =>
  configureStore({
    reducer: {
      favorites: favoritsSlice,
    },
  });
describe('Main Component', () => {
  test('renders without crashing with empty items', () => {
    render(
      <MemoryRouter>
        <Provider store={createTestStore()}>
          <ToastProvider>
            <Main items={[]} count={0} onPageChanged={() => {}} />
          </ToastProvider>
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByRole('main')).toBeInTheDocument();
  });
  // test('renders paginator when there are items', () => {
  //   render(
  //     <MemoryRouter initialEntries={['/?page=1']}>
  //       <Provider store={createTestStore()}>
  //         <ToastProvider>
  //           <Main
  //             items={mockFakeItemList}
  //             count={20}
  //             onPageChanged={() => {}}
  //           />
  //         </ToastProvider>
  //       </Provider>
  //     </MemoryRouter>
  //   );

  //   expect(screen.getByTestId('paginator')).toBeInTheDocument();
  // });
});
