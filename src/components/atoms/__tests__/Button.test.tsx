import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../Button';

describe('Button Component', () => {
  it('renders children correctly', () => {
    render(<Button>Test Button</Button>);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  it('applies default props correctly', () => {
    render(<Button>Default Button</Button>);
    const button = screen.getByText('Default Button');
    expect(button).toHaveClass('bg-blue-600', 'text-white', 'text-base');
  });

  it('applies different variants correctly', () => {
    const { rerender } = render(<Button variant="secondary">Secondary Button</Button>);
    expect(screen.getByText('Secondary Button')).toHaveClass('bg-gray-200', 'text-gray-800');

    rerender(<Button variant="outlined">Outlined Button</Button>);
    expect(screen.getByText('Outlined Button')).toHaveClass('border-blue-600', 'text-blue-600');

    rerender(<Button variant="text">Text Button</Button>);
    expect(screen.getByText('Text Button')).toHaveClass('bg-transparent', 'text-blue-600');
  });

  it('applies different sizes correctly', () => {
    const { rerender } = render(<Button size="sm">Small Button</Button>);
    expect(screen.getByText('Small Button')).toHaveClass('text-sm');

    rerender(<Button size="lg">Large Button</Button>);
    expect(screen.getByText('Large Button')).toHaveClass('text-lg');
  });

  it('handles loading state correctly', () => {
    render(<Button isLoading>Loading Button</Button>);
    const button = screen.getByRole('button');
    
    expect(button).toBeDisabled();
    expect(button).toHaveClass('opacity-60', 'cursor-not-allowed');
    expect(screen.getByText('Loading Button')).toBeInTheDocument();
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  it('handles disabled state correctly', () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByRole('button');
    
    expect(button).toBeDisabled();
    expect(button).toHaveClass('opacity-60', 'cursor-not-allowed');
  });

  it('renders with start and end icons', () => {
    const StartIcon = () => <span>Start</span>;
    const EndIcon = () => <span>End</span>;

    render(
      <Button startIcon={<StartIcon />} endIcon={<EndIcon />}>
        Icon Button
      </Button>
    );

    expect(screen.getByTestId('start-icon')).toBeInTheDocument();
    expect(screen.getByTestId('end-icon')).toBeInTheDocument();
  });

  it('applies fullWidth class when specified', () => {
    render(<Button fullWidth>Full Width Button</Button>);
    expect(screen.getByText('Full Width Button')).toHaveClass('w-full');
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Clickable Button</Button>);
    
    fireEvent.click(screen.getByText('Clickable Button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies custom className correctly', () => {
    render(<Button className="custom-class">Custom Button</Button>);
    expect(screen.getByText('Custom Button')).toHaveClass('custom-class');
  });
});