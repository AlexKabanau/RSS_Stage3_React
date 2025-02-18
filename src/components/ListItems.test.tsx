import { render, screen } from '@testing-library/react';
import ListItems from './ListItems';
import { MemoryRouter } from 'react-router-dom';
import { mockFakeItemList } from '../mock/mock';

describe('ListItems Component', () => {
  // test('renders without crashing', () => {
  //   render(
  //     <MemoryRouter>
  //       <ListItems items={mockFakeItemList} />
  //     </MemoryRouter>
  //   );
  //   expect(screen.getByRole('list')).toBeInTheDocument();
  // });
  // test('renders correct number of items', () => {
  //   render(
  //     <MemoryRouter>
  //       <ListItems items={mockFakeItemList} />
  //     </MemoryRouter>
  //   );
  //   expect(screen.getAllByRole('listitem')).toHaveLength(
  //     mockFakeItemList.length
  //   );
  // });
  // test('renders empty list without crashing', () => {
  //   render(
  //     <MemoryRouter>
  //       <ListItems items={[]} />
  //     </MemoryRouter>
  //   );
  //   expect(screen.getByRole('list')).toBeEmptyDOMElement();
  // });
});
