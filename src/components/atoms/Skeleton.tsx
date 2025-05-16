import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular';
  width?: string;
  height?: string;
  animation?: 'pulse' | 'wave' | 'none';
}

const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rectangular',
  width,
  height,
  animation = 'pulse'
}) => {
  const baseClass = 'bg-gray-200';
  
  const variantClass = 
    variant === 'text' ? 'rounded' : 
    variant === 'circular' ? 'rounded-full' : 
    'rounded-md';
  
  const animationClass = 
    animation === 'pulse' ? 'animate-pulse' : 
    animation === 'wave' ? 'animate-shimmer' : 
    '';

  const sizeStyle = {
    width: width || '100%',
    height: height || (variant === 'text' ? '1em' : '100px')
  };

  return (
    <div 
      data-testid="skeleton"
      className={`${baseClass} ${variantClass} ${animationClass} ${className}`}
      style={sizeStyle}
    />
  );
};

export default Skeleton;