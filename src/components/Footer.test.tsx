import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import { MemoryRouter } from 'react-router-dom';

describe('Footer', () => {
  test('renders GitHub link', () => {
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
  });

  test('renders RSSchool link', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const rsSchoolLink = screen.getByRole('link', { name: /RSSchool logo/i });
    expect(rsSchoolLink).toBeInTheDocument();
    expect(rsSchoolLink).toHaveAttribute(
      'href',
      'https://rs.school/courses/reactjs'
    );
  });

  test('renders GitHub logo', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const githubLogo = screen.getByAltText('github logo');
    expect(githubLogo).toBeInTheDocument();
  });

  test('renders RSSchool logo', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const rsSchoolLogo = screen.getByAltText('RSSchool logo');
    expect(rsSchoolLogo).toBeInTheDocument();
  });
});
