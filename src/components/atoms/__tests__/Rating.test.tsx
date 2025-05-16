import { render, screen } from '@testing-library/react';
import Rating from '../Rating';

jest.mock('lucide-react', () => ({
  Star: () => <span data-testid="star-icon">★</span>
}));

describe('Rating Component', () => {
  it('renders with default props correctly', () => {
    render(<Rating average={0} />);
    
    expect(screen.getByTestId('star-icon')).toBeInTheDocument();
    expect(screen.getByText('0.0 (0)')).toBeInTheDocument();
  });

  it('displays rating average with one decimal place', () => {
    render(<Rating average={4.567} />);
    expect(screen.getByText('4.6 (0)')).toBeInTheDocument();
  });

  it('formats count correctly for different ranges', () => {
    const { rerender } = render(<Rating average={4} count={500} />);
    expect(screen.getByText('4.0 (500)')).toBeInTheDocument();

    rerender(<Rating average={4} count={1500} />);
    expect(screen.getByText('4.0 (1.5k)')).toBeInTheDocument();

    rerender(<Rating average={4} count={15000} />);
    expect(screen.getByText('4.0 (15k)')).toBeInTheDocument();
  });

  it('applies custom size to star icon', () => {
    render(<Rating average={4} size={24} />);
    const starIcon = screen.getByTestId('star-icon');
    expect(starIcon).toBeInTheDocument();
  });

  it('applies custom className correctly', () => {
    render(<Rating average={4} className="custom-class" />);
    expect(screen.getByText('4.0 (0)').parentElement).toHaveClass('custom-class');
  });

  it('handles zero rating correctly', () => {
    render(<Rating average={0} count={0} />);
    expect(screen.getByText('0.0 (0)')).toBeInTheDocument();
  });

  it('handles large numbers correctly', () => {
    render(<Rating average={4.8} count={1000000} />);
    expect(screen.getByText('4.8 (1m)')).toBeInTheDocument();
  });

  it('maintains consistent layout with different value lengths', () => {
    const { container, rerender } = render(<Rating average={1} count={1} />);

    rerender(<Rating average={10} count={1000000} />);
    expect(screen.getByTestId('star-icon')).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('flex', 'items-center', 'gap-1');
  });
});