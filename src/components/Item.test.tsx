import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Item from './Item';
import { mockFakeItem } from '../mock/mock';

describe('Item Component', () => {
  test('renders item details correctly', () => {
    render(
      <MemoryRouter>
        <Item item={mockFakeItem} />
      </MemoryRouter>
    );

    expect(
      screen.getByText(`George Weasley's dance partner`)
    ).toBeInTheDocument();

    expect(screen.getByText('Species: Human')).toBeInTheDocument();
    expect(screen.getByText('Gender: Female')).toBeInTheDocument();
  });

  test('renders a link with the correct URL', () => {
    render(
      <MemoryRouter>
        <Item item={mockFakeItem} />
      </MemoryRouter>
    );

    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute(
      'href',
      '/character/643ae975-0c29-49a7-a87e-d052b798962d'
    );
  });
});
