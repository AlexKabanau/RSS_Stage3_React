import React from 'react';
import Footer from '@/components/Footer';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
// import Footer from './Footer';

describe('Footer', () => {
  test('renders GitHub link with correct text and image', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const githubLink = screen.getByRole('link', { name: /AlexKabanau/i });
    expect(githubLink).toHaveAttribute(
      'href',
      'https://github.com/AlexKabanau'
    );
    expect(githubLink).toBeInTheDocument();

    const githubImage = screen.getByAltText('github logo');
    expect(githubImage).toHaveAttribute(
      'src',
      expect.stringContaining('github_logo_black.svg')
    );
  });

  test('renders RSSchool link with correct image', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const rsschoolLink = screen.getByTestId('rsschool-link');
    expect(rsschoolLink).toHaveAttribute(
      'href',
      'https://rs.school/courses/reactjs'
    );
    expect(rsschoolLink).toBeInTheDocument();

    const rsschoolImage = screen.getByAltText('RSSchool logo');
    expect(rsschoolImage).toHaveAttribute(
      'src',
      expect.stringContaining('rs_logo_black.svg')
    );
  });
});
