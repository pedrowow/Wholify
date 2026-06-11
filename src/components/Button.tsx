import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  style,
  ...props 
}) => {
  const getStyles = () => {
    const base: React.CSSProperties = {
      padding: '0.5rem 1rem',
      borderRadius: 'var(--border-radius)',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: 500,
      transition: 'all 0.2s ease',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      fontFamily: 'var(--font-main)',
    };

    const variants: Record<string, React.CSSProperties> = {
      primary: {
        backgroundColor: 'var(--color-primary)',
        color: 'white',
      },
      secondary: {
        backgroundColor: 'var(--color-secondary)',
        color: 'white',
      },
      outline: {
        backgroundColor: 'transparent',
        border: '1px solid var(--color-primary)',
        color: 'var(--color-primary)',
      },
      ghost: {
        backgroundColor: 'transparent',
        color: 'var(--color-text)',
      }
    };

    const sizes: Record<string, React.CSSProperties> = {
      sm: { padding: '0.25rem 0.5rem', fontSize: '0.875rem' },
      md: { padding: '0.5rem 1rem', fontSize: '1rem' },
      lg: { padding: '0.75rem 1.5rem', fontSize: '1.125rem' },
    };

    return { ...base, ...variants[variant], ...sizes[size], ...style };
  };

  return (
    <button style={getStyles()} {...props}>
      {children}
    </button>
  );
};
