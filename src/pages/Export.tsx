import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { modules } from '../modules/registry';

const Export: React.FC = () => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    
    const today = new Date().toISOString().split('T')[0];
    let markdown = `# Wholify Export - ${today}\n\n`;
    
    modules.forEach(module => {
      if (module.enableExport) {
        markdown += `## ${module.name}\n`;
        markdown += `- [ ] Daily activity for ${module.category}\n\n`;
        markdown += `**Notes:**\n\n---\n\n`;
      }
    });

    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `wholify-export-${today}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setTimeout(() => setIsExporting(false), 1000);
  };

  return (
    <div style={{ padding: 'var(--spacing-md)' }}>
      <h1>Export Data</h1>
      <Card title="Markdown Export">
        <p>Export your daily progress to a Markdown file for your personal journal.</p>
        <Button 
          onClick={handleExport} 
          disabled={isExporting}
          style={{ width: '100%', marginTop: 'var(--spacing-md)' }}
        >
          {isExporting ? 'Generating...' : 'Download Markdown (.md)'}
        </Button>
      </Card>
    </div>
  );
};

export default Export;
