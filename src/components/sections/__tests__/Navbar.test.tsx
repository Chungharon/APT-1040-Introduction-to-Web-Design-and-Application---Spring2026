import { render, screen } from '@testing-library/react';
import { Navbar } from '../Navbar';
import { expect, test, describe } from 'vitest';

describe('Navbar UI Tests', () => {
  test('renders logo and navigation links', () => {
    render(<Navbar />);
    expect(screen.getByText(/AFRICA/i)).toBeInTheDocument();
    expect(screen.getByText(/FESTIVALS/i)).toBeInTheDocument();
    expect(screen.getByText(/ARTS/i)).toBeInTheDocument();
  });

  test('Navbar is fixed to top (UI check)', () => {
     render(<Navbar />);
     const header = screen.getByRole('banner');
     expect(header).toHaveClass('fixed top-0');
  });
});
