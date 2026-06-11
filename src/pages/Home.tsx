import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { modules } from '../modules/registry';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 'var(--spacing-md)' }}>
      <header style={{ marginBottom: 'var(--spacing-xl)', textAlign: 'center' }}>
        <h1 style={{ color: 'var(--color-primary)', marginBottom: 'var(--spacing-xs)' }}>Wholify</h1>
        <p style={{ opacity: 0.8, margin: 0 }}>Grow every day in body, mind, and soul.</p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
        {modules.map((module) => (
          <Card 
            key={module.id}
            title={module.name}
            icon={module.icon}
            onClick={() => navigate(module.route)}
          >
            <p style={{ margin: 0, opacity: 0.8 }}>{module.description}</p>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'flex-end', 
              marginTop: 'var(--spacing-sm)' 
            }}>
              <span style={{ 
                fontSize: '0.75rem', 
                backgroundColor: 'var(--color-border)', 
                padding: '2px 8px', 
                borderRadius: '10px',
                textTransform: 'capitalize'
              }}>
                {module.category}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
