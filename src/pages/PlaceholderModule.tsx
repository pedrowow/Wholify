import React from 'react';
import { useParams } from 'react-router-dom';

const PlaceholderModule: React.FC = () => {
  const { moduleId } = useParams();
  
  return (
    <div style={{ padding: 'var(--spacing-md)' }}>
      <h1>Module Placeholder</h1>
      <p>This is a placeholder for the module content. (ID: {moduleId})</p>
      <div style={{ 
        padding: 'var(--spacing-lg)', 
        backgroundColor: 'var(--color-card-bg)', 
        borderRadius: 'var(--border-radius)',
        border: '1px solid var(--color-border)',
        marginTop: 'var(--spacing-md)'
      }}>
        <h3>Features coming soon:</h3>
        <ul>
          <li>Module-specific tracking</li>
          <li>Custom notification settings</li>
          <li>Data export to Markdown</li>
        </ul>
      </div>
    </div>
  );
};

export default PlaceholderModule;
