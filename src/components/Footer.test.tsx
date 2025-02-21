import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import { MemoryRouter } from 'react-router-dom';

describe('Footer Component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
  });

  it('должен отображать ссылку на GitHub с правильным текстом и URL', () => {
    const githubLink = screen.getByRole('link', { name: /AlexKabanau/i });

    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute(
      'href',
      'https://github.com/AlexKabanau'
    );
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noreferrer');

    const githubLogo = screen.getByAltText('github logo');
    expect(githubLogo).toBeInTheDocument();
    expect(githubLogo).toHaveAttribute(
      'src',
      expect.stringContaining('github_logo_black.svg')
    );
  });

  it('должен отображать ссылку на RSSchool с правильным URL', () => {
    const rsschoolLink = screen.getByTestId('rsschool-link');

    expect(rsschoolLink).toBeInTheDocument();
    expect(rsschoolLink).toHaveAttribute(
      'href',
      'https://rs.school/courses/reactjs'
    );
    expect(rsschoolLink).toHaveAttribute('target', '_blank');
    expect(rsschoolLink).toHaveAttribute('rel', 'noreferrer');

    const rsschoolLogo = screen.getByAltText('RSSchool logo');
    expect(rsschoolLogo).toBeInTheDocument();
    expect(rsschoolLogo).toHaveAttribute(
      'src',
      expect.stringContaining('rs_logo_black.svg')
    );
  });
});
