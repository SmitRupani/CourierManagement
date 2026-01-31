import React, { useState, useEffect } from 'react';
import { 
    Package, 
    Truck, 
    Search,
    MoreHorizontal,
    Plus,
    Minus,
    TrendingUp,
    Clock,
    CheckCircle2,
    Eye,
    Loader2
} from 'lucide-react';
import LiveMap from '../components/LiveMap';
import { adminService, packageService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [fleetStats, setFleetStats] = useState({ agents: 0, hubs: 0 });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch stats (Admin only or generic)
      let dashboardStats;
      if (user?.role === 'ADMIN') {
        const statsRes = await adminService.getStats();
        dashboardStats = [
          { label: 'Total Shipments', value: statsRes.data.totalPackages.toLocaleString(), change: '+12%', icon: Package, color: 'yellow' },
          { label: 'In Transit', value: statsRes.data.inTransitPackages.toLocaleString(), change: '+8%', icon: Truck, color: 'blue' },
          { label: 'Delivered', value: statsRes.data.deliveredPackages.toLocaleString(), change: '+24%', icon: CheckCircle2, color: 'green' },
          { label: 'Created', value: statsRes.data.createdPackages.toLocaleString(), change: '-5%', icon: Clock, color: 'orange' },
        ];

        const packagesRes = await packageService.getAllPackages({ size: 5 });
        setOrders(packagesRes.data.content);
        setFleetStats({
            agents: statsRes.data.totalCouriers,
            hubs: 5 // Mock for now or fetch from hubService
        });
      } else {
        const myPackagesRes = await packageService.getMyPackages();
        const myPkgs = myPackagesRes.data;
        dashboardStats = [
          { label: 'My Shipments', value: myPkgs.length.toLocaleString(), icon: Package, color: 'yellow' },
          { label: 'In Transit', value: myPkgs.filter(p => p.status === 'IN_TRANSIT').length.toLocaleString(), icon: Truck, color: 'blue' },
          { label: 'Delivered', value: myPkgs.filter(p => p.status === 'DELIVERED').length.toLocaleString(), icon: CheckCircle2, color: 'green' },
          { label: 'Pending', value: myPkgs.filter(p => p.status === 'CREATED').length.toLocaleString(), icon: Clock, color: 'orange' },
        ];
        setOrders(myPkgs.slice(0, 5));
      }
      
      setStats(dashboardStats);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };


  const getStatusColor = (status) => {
    switch(status) {
      case 'DELIVERED': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'IN_TRANSIT': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'PICKED_UP': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'CANCELLED': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-yellow-500 animate-spin" />
          <p className="text-gray-500 animate-pulse">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-4 md:p-6 lg:p-8 overflow-y-auto">
      {/* Page Header */}
      <div className="mb-6 md:mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-500 text-sm md:text-base">Welcome back, {user?.name}! Here's your logistics overview.</p>
        </div>
        <Link to="/shipments" className="btn btn-primary shadow-lg shadow-yellow-500/20 gap-2">
            <Plus size={18} />
            <span>New Shipment</span>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
        {stats.map((stat, i) => (
          <div 
            key={i} 
            className="bg-zinc-900/80 border border-white/5 rounded-2xl p-4 md:p-5 hover:border-white/10 transition-all hover:scale-[1.02] duration-300"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center
                ${stat.color === 'yellow' ? 'bg-yellow-500/10' : ''}
                ${stat.color === 'blue' ? 'bg-blue-500/10' : ''}
                ${stat.color === 'green' ? 'bg-green-500/10' : ''}
                ${stat.color === 'orange' ? 'bg-orange-500/10' : ''}
              `}>
                <stat.icon 
                  size={20} 
                  className={`
                    ${stat.color === 'yellow' ? 'text-yellow-500' : ''}
                    ${stat.color === 'blue' ? 'text-blue-500' : ''}
                    ${stat.color === 'green' ? 'text-green-500' : ''}
                    ${stat.color === 'orange' ? 'text-orange-500' : ''}
                  `} 
                />
              </div>
              {stat.change && (
                <span className={`text-xs font-medium px-2 py-1 rounded-full
                  ${stat.change.startsWith('+') ? 'text-green-400 bg-green-500/10' : 'text-red-400 bg-red-500/10'}
                `}>
                  {stat.change}
                </span>
              )}
            </div>
            <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-xs md:text-sm text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 md:gap-6">
        
        {/* Left Column */}
        <div className="xl:col-span-4 space-y-4 md:space-y-6">
          
          {/* Today's Progress */}
          <div className="bg-zinc-900/80 border border-white/5 rounded-2xl p-5">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-white text-lg font-semibold">Live Feed</h3>
                <p className="text-gray-500 text-xs">Real-time status updates</p>
              </div>
            </div>
            
            <div className="space-y-4">
               {orders.slice(0, 3).map((order, idx) => (
                 <div key={idx} className="flex gap-3 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-2 animate-pulse" />
                    <div>
                        <p className="text-sm text-white font-medium">{order.trackingNumber}</p>
                        <p className="text-xs text-gray-500">{order.status.replace('_', ' ')} • {new Date(order.updatedAt || order.createdAt).toLocaleTimeString()}</p>
                    </div>
                 </div>
               ))}
               {orders.length === 0 && <p className="text-gray-600 text-xs italic">No recent activity</p>}
            </div>
            
            <div className="mt-6 pt-6 border-t border-white/5">
                <div className="flex justify-between text-xs text-gray-500 mb-2">
                    <span>Target Achievement</span>
                    <span>72%</span>
                </div>
                <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full w-[72%] bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full"></div>
                </div>
            </div>
          </div>

          {/* Fleet Distribution */}
          <div className="bg-zinc-900/80 border border-white/5 rounded-2xl p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white text-lg font-semibold">Active Fleet</h3>
            </div>
            <div className="space-y-4">
              {[
                  { type: 'Active Agents', count: fleetStats.agents, percent: 100 },
                  { type: 'Supply Chain', count: 12, percent: 85 },
                  { type: 'Distribution', count: 5, percent: 45 },
                  { type: 'Support Staff', count: 8, percent: 30 },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                    <Truck size={14} className="text-yellow-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-white">{item.type}</span>
                      <span className="text-xs text-gray-500">{item.count}</span>
                    </div>
                    <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full"
                        style={{ width: `${item.percent}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 w-10 text-right">{item.percent}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Map & Table */}
        <div className="xl:col-span-8 space-y-4 md:space-y-6">
          
          {/* Map Section */}
          <div className="h-64 md:h-80 lg:h-96 w-full rounded-2xl md:rounded-3xl overflow-hidden relative border border-white/5">
            <LiveMap 
              center={[20.5937, 78.9629]} 
              zoom={5}
              height="100%"
            />
          </div>

          {/* Orders Table */}
          <div className="bg-zinc-900/80 border border-white/5 rounded-2xl overflow-hidden">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 p-5 border-b border-white/5">
              <h3 className="text-white text-lg font-semibold">Recent Shipments</h3>
              <div className="flex flex-wrap gap-2">
                <Link to="/shipments" className="text-xs font-bold text-yellow-500 hover:text-yellow-400 flex items-center gap-1 uppercase tracking-wider">
                  View All <TrendingUp size={14} />
                </Link>
              </div>
            </div>
            
            {/* Desktop Table View */}
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tracking ID</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Receiver</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Weight</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="p-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-yellow-500/10 text-yellow-500 flex items-center justify-center">
                            <Package size={16} />
                          </div>
                          <span className="font-mono text-sm text-white font-medium">{order.trackingNumber}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm text-white">{order.receiver.name}</div>
                        <div className="text-xs text-gray-500">{order.receiver.address.city}, {order.receiver.address.state}</div>
                      </td>
                      <td className="p-4 text-sm text-gray-300">{order.weight} kg</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${getStatusColor(order.status)}`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                          {order.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link 
                            to={`/tracking-internal?id=${order.trackingNumber}`}
                            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-yellow-500/20 text-gray-400 hover:text-yellow-500 flex items-center justify-center transition-all"
                          >
                            <Eye size={16} />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr>
                      <td colSpan="5" className="p-12 text-center text-gray-500 italic">No shipments found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
