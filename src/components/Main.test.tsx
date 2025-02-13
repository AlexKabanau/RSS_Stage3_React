import { render, screen } from '@testing-library/react';
import Main from './Main';
import { MemoryRouter } from 'react-router-dom';
import { mockFakeItemList } from '../mock/mock';

describe('Main Component', () => {
  test('renders without crashing', () => {
    render(
      <MemoryRouter>
        <Main items={mockFakeItemList} count={20} onPageChanged={() => {}} />
      </MemoryRouter>
    );

    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
