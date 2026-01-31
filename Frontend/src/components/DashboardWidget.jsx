import React from 'react';

const DashboardWidget = ({ title, children, className = '' }) => {
  return (
    <div className={`card ${className} flex-col`} style={{ height: '100%', gap: 'var(--space-4)' }}>
      {title && <h3 className="h3" style={{ fontSize: '18px' }}>{title}</h3>}
      <div style={{ flex: 1 }}>
        {children}
      </div>
    </div>
  );
};

export default DashboardWidget;
