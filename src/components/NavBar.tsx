import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Settings, Download } from 'lucide-react';

export const NavBar: React.FC = () => {
  const navItems = [
    { icon: <Home size={24} />, label: 'Home', path: '/' },
    { icon: <Download size={24} />, label: 'Export', path: '/export' },
    { icon: <Settings size={24} />, label: 'Settings', path: '/settings' },
  ];

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100%',
      maxWidth: 'var(--max-width)',
      backgroundColor: 'var(--color-card-bg)',
      borderTop: '1px solid var(--color-border)',
      display: 'flex',
      justifyContent: 'space-around',
      padding: 'var(--spacing-sm) 0',
      paddingBottom: 'calc(var(--spacing-sm) + env(safe-area-inset-bottom))',
      zIndex: 1000,
    }}>
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          style={({ isActive }) => ({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textDecoration: 'none',
            color: isActive ? 'var(--color-primary)' : 'var(--color-text)',
            gap: '2px',
            fontSize: '0.75rem',
            transition: 'color 0.2s ease',
            opacity: isActive ? 1 : 0.7,
          })}
        >
          {item.icon}
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};
