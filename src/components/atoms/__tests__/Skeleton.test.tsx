import { render } from '@testing-library/react';
import Skeleton from '../Skeleton';

describe('Skeleton Component', () => {
  it('renders with default props correctly', () => {
    const { container } = render(<Skeleton />);
    const skeleton = container.firstChild as HTMLElement;

    expect(skeleton).toHaveClass('bg-gray-200', 'rounded-md', 'animate-pulse');
    expect(skeleton).toHaveStyle({
      width: '100%',
      height: '100px'
    });
  });

  it('applies different variants correctly', () => {
    const { rerender, container } = render(<Skeleton variant="text" />);
    expect(container.firstChild).toHaveClass('rounded');
    expect(container.firstChild).toHaveStyle({ height: '1em' });

    rerender(<Skeleton variant="circular" />);
    expect(container.firstChild).toHaveClass('rounded-full');

    rerender(<Skeleton variant="rectangular" />);
    expect(container.firstChild).toHaveClass('rounded-md');
  });

  it('applies different animations correctly', () => {
    const { rerender, container } = render(<Skeleton animation="pulse" />);
    expect(container.firstChild).toHaveClass('animate-pulse');

    rerender(<Skeleton animation="wave" />);
    expect(container.firstChild).toHaveClass('animate-shimmer');

    rerender(<Skeleton animation="none" />);
    expect(container.firstChild).not.toHaveClass('animate-pulse');
    expect(container.firstChild).not.toHaveClass('animate-shimmer');
  });

  it('applies custom width and height correctly', () => {
    const { container } = render(
      <Skeleton width="200px" height="150px" />
    );
    
    expect(container.firstChild).toHaveStyle({
      width: '200px',
      height: '150px'
    });
  });

  it('applies custom className correctly', () => {
    const { container } = render(<Skeleton className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('maintains base styling with custom props', () => {
    const { container } = render(
      <Skeleton
        variant="circular"
        animation="wave"
        width="50px"
        height="50px"
        className="custom-class"
      />
    );

    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton).toHaveClass(
      'bg-gray-200',
      'rounded-full',
      'animate-shimmer',
      'custom-class'
    );
    expect(skeleton).toHaveStyle({
      width: '50px',
      height: '50px'
    });
  });

  it('handles percentage values for width and height', () => {
    const { container } = render(
      <Skeleton width="50%" height="75%" />
    );
    
    expect(container.firstChild).toHaveStyle({
      width: '50%',
      height: '75%'
    });
  });

  it('handles undefined width and height correctly', () => {
    const { container } = render(<Skeleton width={undefined} height={undefined} />);
    
    expect(container.firstChild).toHaveStyle({
      width: '100%',
      height: '100px'
    });
  });
});