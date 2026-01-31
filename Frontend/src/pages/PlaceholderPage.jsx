import React from 'react';

const PlaceholderPage = ({ title }) => {
  return (
    <div className="flex flex-col gap-6 justify-center items-center h-full text-center">
      <div className="p-6 rounded-full bg-gray-800" style={{ background: 'var(--bg-card)' }}>
        <h2 className="h2 text-muted" style={{ opacity: 0.5 }}>{title}</h2>
      </div>
      <p className="text-muted">This module is under development.</p>
    </div>
  );
};

export default PlaceholderPage;
