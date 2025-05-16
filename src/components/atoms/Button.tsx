import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outlined' | 'text';
  size?: 'sm' | 'md' | 'lg';
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  isLoading?: boolean;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  startIcon,
  endIcon,
  isLoading = false,
  fullWidth = false,
  className = '',
  disabled,
  ...rest
}) => {
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    outlined: 'bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50',
    text: 'bg-transparent text-blue-600 hover:bg-blue-50'
  };

  const sizeClasses = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3'
  };

  const disabledClasses = disabled || isLoading 
    ? 'opacity-60 cursor-not-allowed'
    : 'cursor-pointer';

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`
        inline-flex items-center justify-center rounded-md font-medium transition-colors
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${disabledClasses}
        ${widthClass}
        ${className}
      `}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      
      {!isLoading && startIcon && <span className="mr-2" data-testid="start-icon">{startIcon}</span>}
      {children}
      {!isLoading && endIcon && <span className="ml-2" data-testid="end-icon">{endIcon}</span>}
    </button>
  );
};

export default Button;