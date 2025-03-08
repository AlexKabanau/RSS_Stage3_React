import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Footer from '@/components/Footer';

describe('Footer', () => {
  test('renders GitHub link with correct text and image', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    const githubLink = screen.getByRole('link', { name: /AlexKabanau/i });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute(
      'href',
      'https://github.com/AlexKabanau'
    );
    const githubImage = screen.getByAltText('github logo');
    expect(githubImage).toBeInTheDocument();
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
    expect(rsschoolLink).toBeInTheDocument();
    expect(rsschoolLink).toHaveAttribute(
      'href',
      'https://rs.school/courses/reactjs'
    );
    const rsschoolImage = screen.getByAltText('RSSchool logo');
    expect(rsschoolImage).toBeInTheDocument();
    expect(rsschoolImage).toHaveAttribute(
      'src',
      expect.stringContaining('rs_logo_black.svg')
    );
  });
});
