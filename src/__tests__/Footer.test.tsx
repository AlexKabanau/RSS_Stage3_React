import { render, screen } from '@testing-library/react';
import Footer from '@/components/Footer';
import React from 'react';
import { expect, test } from 'vitest';

test('Footer renders correctly with links', () => {
  render(<Footer />);

  // Проверяем наличие ссылки на GitHub
  const githubLink = screen.getByRole('link', { name: /alexkabanau/i });
  expect(githubLink).toBeInTheDocument();
  expect(githubLink).toHaveAttribute('href', 'https://github.com/AlexKabanau');
  expect(githubLink).toHaveAttribute('target', '_blank');
  expect(githubLink).toHaveAttribute('rel', 'noreferrer');

  // Проверяем наличие изображения GitHub
  const githubLogo = screen.getByAltText('github logo');
  expect(githubLogo).toBeInTheDocument();

  // Проверяем наличие ссылки на RS School
  const rsschoolLink = screen.getByTestId('rsschool-link');
  expect(rsschoolLink).toBeInTheDocument();
  expect(rsschoolLink).toHaveAttribute(
    'href',
    'https://rs.school/courses/reactjs'
  );
  expect(rsschoolLink).toHaveAttribute('target', '_blank');
  expect(rsschoolLink).toHaveAttribute('rel', 'noreferrer');

  // Проверяем наличие изображения RSSchool
  const rsschoolLogo = screen.getByAltText('RSSchool logo');
  expect(rsschoolLogo).toBeInTheDocument();
});
