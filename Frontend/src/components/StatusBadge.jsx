import React from 'react';

const StatusBadge = ({ status }) => {
  const getStatusStyles = () => {
    const statusLower = status?.toLowerCase() || '';
    
    if (statusLower === 'delivered') {
      return 'bg-green-500/10 text-green-400 border-green-500/20';
    }
    if (statusLower === 'in_transit' || statusLower === 'in transit') {
      return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
    }
    if (statusLower === 'picked_up' || statusLower === 'picked up') {
      return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    }
    if (statusLower === 'cancelled' || statusLower === 'failed') {
      return 'bg-red-500/10 text-red-400 border-red-500/20';
    }
    if (statusLower === 'pending' || statusLower === 'booked') {
      return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
    }
    if (statusLower === 'out_for_delivery' || statusLower === 'out for delivery') {
      return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
    }
    
    return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
  };

  const formatStatus = (status) => {
    if (!status) return 'Unknown';
    return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${getStatusStyles()}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
      {formatStatus(status)}
    </span>
  );
};

export default StatusBadge;
