import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  icon?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({ children, title, icon, onClick, style }) => {
  return (
    <div 
      onClick={onClick}
      style={{
        backgroundColor: 'var(--color-card-bg)',
        borderRadius: 'var(--border-radius)',
        padding: 'var(--spacing-md)',
        border: '1px solid var(--color-border)',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        cursor: onClick ? 'pointer' : 'default',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-sm)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        ...style
      }}
      onMouseEnter={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
        }
      }}
      onMouseLeave={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
        }
      }}
    >
      {(title || icon) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-xs)' }}>
          {icon && <span style={{ fontSize: '1.5rem' }}>{icon}</span>}
          {title && <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{title}</h3>}
        </div>
      )}
      {children}
    </div>
  );
};
