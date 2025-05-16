import { render, screen, fireEvent } from '@testing-library/react';
import Dropdown from '../Dropdown';

describe('Dropdown Component', () => {
  const defaultProps = {
    label: 'Test Dropdown',
    value: undefined,
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' }
    ],
    onChange: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default props correctly', () => {
    render(<Dropdown {...defaultProps} />);
    
    expect(screen.getByText('Test Dropdown: All')).toBeInTheDocument();
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument(); // Dropdown is closed
  });

  it('opens dropdown menu when clicked', () => {
    render(<Dropdown {...defaultProps} />);
    
    fireEvent.click(screen.getByText('Test Dropdown: All'));
    
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  it('selects an option when clicked', () => {
    render(<Dropdown {...defaultProps} />);
    
    fireEvent.click(screen.getByText('Test Dropdown: All'));
    fireEvent.click(screen.getByText('Option 1'));
    
    expect(defaultProps.onChange).toHaveBeenCalledWith('1');
  });

  it('closes dropdown when option is selected', () => {
    render(<Dropdown {...defaultProps} />);
    
    fireEvent.click(screen.getByText('Test Dropdown: All'));
    fireEvent.click(screen.getByText('Option 1'));
    
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument(); // Dropdown is closed
  });

  it('displays selected option in button', () => {
    render(
      <Dropdown
        {...defaultProps}
        value="2"
      />
    );
    
    expect(screen.getByText('Test Dropdown: Option 2')).toBeInTheDocument();
  });

  it('closes dropdown when clicking outside', () => {
    render(
      <div>
        <div data-testid="outside">Outside</div>
        <Dropdown {...defaultProps} />
      </div>
    );
    
    fireEvent.click(screen.getByText('Test Dropdown: All')); // Open dropdown
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    
    fireEvent.mouseDown(screen.getByTestId('outside'));
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument(); // Dropdown should be closed
  });

  it('applies custom className correctly', () => {
    render(<Dropdown {...defaultProps} className="custom-class" />);
    expect(screen.getByRole('button').parentElement).toHaveClass('custom-class');
  });

  it('handles undefined option value correctly', () => {
    const options = [
      { label: 'All' }, // No value
      { value: '1', label: 'Option 1' }
    ];
    
    render(
      <Dropdown
        {...defaultProps}
        options={options}
      />
    );
    
    fireEvent.click(screen.getByText('Test Dropdown: All'));
    fireEvent.click(screen.getByText('All'));
    
    expect(defaultProps.onChange).toHaveBeenCalledWith(undefined);
  });

  it('uses custom defaultLabel when provided', () => {
    render(
      <Dropdown
        {...defaultProps}
        defaultLabel="Custom Default"
      />
    );
    
    expect(screen.getByText('Test Dropdown: Custom Default')).toBeInTheDocument();
  });

  it('has correct ARIA attributes', () => {
    render(<Dropdown {...defaultProps} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAttribute('aria-haspopup', 'true');
    
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });
});