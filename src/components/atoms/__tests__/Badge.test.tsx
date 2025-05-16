import { render, screen, fireEvent } from '@testing-library/react';
import Badge from '../Badge';

describe('Badge Component', () => {
  it('renders children correctly', () => {
    render(<Badge>Test Badge</Badge>);
    expect(screen.getByText('Test Badge')).toBeInTheDocument();
  });

  it('applies default props correctly', () => {
    render(<Badge>Default Badge</Badge>);
    const badge = screen.getByText('Default Badge');
    expect(badge).toHaveClass('bg-gray-100', 'text-gray-800', 'text-sm');
  });

  it('applies different colors correctly', () => {
    const { rerender } = render(<Badge color="primary">Primary Badge</Badge>);
    expect(screen.getByText('Primary Badge')).toHaveClass('bg-blue-100', 'text-blue-800');

    rerender(<Badge color="success">Success Badge</Badge>);
    expect(screen.getByText('Success Badge')).toHaveClass('bg-green-100', 'text-green-800');

    rerender(<Badge color="error">Error Badge</Badge>);
    expect(screen.getByText('Error Badge')).toHaveClass('bg-red-100', 'text-red-800');
  });

  it('applies different sizes correctly', () => {
    const { rerender } = render(<Badge size="sm">Small Badge</Badge>);
    expect(screen.getByText('Small Badge')).toHaveClass('text-xs');

    rerender(<Badge size="lg">Large Badge</Badge>);
    expect(screen.getByText('Large Badge')).toHaveClass('text-base');
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Badge onClick={handleClick}>Clickable Badge</Badge>);
    
    const badge = screen.getByText('Clickable Badge');
    expect(badge).toHaveClass('cursor-pointer');
    
    fireEvent.click(badge);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies custom className correctly', () => {
    render(<Badge className="custom-class">Custom Badge</Badge>);
    expect(screen.getByText('Custom Badge')).toHaveClass('custom-class');
  });
});