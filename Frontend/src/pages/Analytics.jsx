import React, { useState, useEffect } from 'react';
import { TrendingUp, Package, Users, Clock, BarChart3, Activity, Download, Calendar, ArrowUpRight, ArrowDownRight, MapPin, Truck, Loader2 } from 'lucide-react';
import { adminService, packageService } from '../services/api';

const Analytics = () => {
    const [statsData, setStatsData] = useState(null);
    const [recentPackages, setRecentPackages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAnalyticsData();
    }, []);

    const fetchAnalyticsData = async () => {
        try {
            setLoading(true);
            const statsRes = await adminService.getStats();
            setStatsData(statsRes.data);
            
            const pkgsRes = await packageService.getAllPackages({ size: 10 });
            setRecentPackages(pkgsRes.data.content);
        } catch (err) {
            console.error("Analytics fetch error", err);
        } finally {
            setLoading(false);
        }
    };

    const statsOverview = [
        { 
            label: 'Total Deliveries', 
            value: statsData?.totalPackages || '0', 
            change: '+12.5%', trend: 'up', icon: Package, color: 'blue' 
        },
        { 
            label: 'Active Agents', 
            value: statsData?.totalUsers || '0', 
            change: '+3', trend: 'up', icon: Users, color: 'purple' 
        },
        { 
            label: 'Success Rate', 
            value: '98.2%', 
            change: '+1.2%', trend: 'up', icon: Activity, color: 'yellow' 
        },
        { 
            label: 'Avg Delivery Time', 
            value: '2.4h', 
            change: '-8%', trend: 'down', icon: Clock, color: 'green' 
        }
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-yellow-500 mx-auto mb-4" />
                    <p className="text-gray-500 font-medium">Loading analytics intelligence...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 h-full pb-6 p-6 overflow-y-auto">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-1">Analytics Dashboard</h1>
                    <p className="text-gray-500">Real-time insights into your logistics operations</p>
                </div>
                <div className="flex gap-3">
                    <button className="bg-zinc-900 border border-white/5 px-4 py-2 rounded-xl text-gray-400 text-sm font-bold flex items-center gap-2 hover:text-white transition-colors">
                        <Calendar size={18} />
                        <span>Last 30 Days</span>
                    </button>
                    <button className="bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-yellow-500/20">
                        <Download size={18} />
                        <span>Export Report</span>
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsOverview.map((stat, i) => (
                    <div key={i} className="bg-zinc-900/80 border border-white/5 p-6 rounded-2xl flex flex-col gap-4 group hover:border-white/10 transition-all">
                        <div className="flex justify-between items-start">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center 
                                ${stat.color === 'blue' ? 'bg-blue-500/10 text-blue-400' : ''}
                                ${stat.color === 'purple' ? 'bg-purple-500/10 text-purple-400' : ''}
                                ${stat.color === 'green' ? 'bg-green-500/10 text-green-400' : ''}
                                ${stat.color === 'yellow' ? 'bg-yellow-500/10 text-yellow-500' : ''}
                                group-hover:scale-110 transition-transform duration-300`}>
                                <stat.icon size={24} />
                            </div>
                            <span className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${
                                stat.trend === 'up' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                            }`}>
                                {stat.trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                {stat.change}
                            </span>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                            <div className="text-gray-500 text-sm font-medium uppercase tracking-wider">{stat.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">
                {/* Main Graph Section */}
                <div className="lg:col-span-8 bg-zinc-900/50 border border-white/5 rounded-3xl p-6 flex flex-col md:p-8">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-1">Delivery Trends</h3>
                            <p className="text-gray-500 text-sm">Real-time performance metrics</p>
                        </div>
                        <div className="flex gap-2 p-1 bg-black/50 rounded-xl border border-white/5">
                            <button className="px-4 py-1.5 text-xs font-bold text-black bg-yellow-500 rounded-lg shadow-sm">Live</button>
                            <button className="px-4 py-1.5 text-xs font-medium text-gray-400 hover:text-white transition-colors">7D</button>
                            <button className="px-4 py-1.5 text-xs font-medium text-gray-400 hover:text-white transition-colors">30D</button>
                        </div>
                    </div>
                    
                    <div className="flex-1 w-full relative p-4 flex items-end justify-between gap-3 overflow-hidden min-h-[250px]">
                        {[20, 40, 60, 80].map((line) => (
                            <div key={line} className="absolute left-0 right-0 h-px bg-white/5 w-full" style={{ bottom: `${line}%` }}></div>
                        ))}
                        
                        {[35, 52, 45, 78, 59, 81, 65, 70, 85, 92, 60, 75, 88].map((h, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer h-full justify-end">
                                <div className="w-full bg-gradient-to-t from-yellow-500/20 to-yellow-500 rounded-t-lg relative transition-all duration-500 group-hover:from-yellow-500/40 group-hover:to-yellow-400 shadow-[0_0_20px_rgba(234,179,8,0.1)]" style={{ height: `${h}%` }}>
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold px-2 py-1 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-all pointer-events-none scale-90 group-hover:scale-100">
                                        {h}%
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-6 text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold px-2">
                        <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                    </div>
                </div>

                {/* Right Column: Recent Activity */}
                <div className="lg:col-span-4 flex flex-col gap-6 h-full">
                    <div className="bg-zinc-900/50 border border-white/5 rounded-3xl p-6 flex flex-col flex-1 overflow-hidden">
                        <h3 className="text-xl font-bold text-white mb-6">Live Feed</h3>
                        <div className="space-y-6 overflow-y-auto custom-scrollbar flex-1 pr-2">
                            {recentPackages.length === 0 ? (
                                <p className="text-gray-500 text-sm text-center py-10">No recent activity detected.</p>
                            ) : (
                                recentPackages.map((pkg) => (
                                    <div key={pkg.id} className="flex gap-4 group">
                                        <div className="relative mt-1">
                                             <div className={`w-3 h-3 rounded-full outline outline-4 outline-offset-2 ${
                                                 pkg.status === 'DELIVERED' ? 'bg-green-500 outline-green-500/10' : 
                                                 pkg.status === 'CANCELLED' ? 'bg-red-500 outline-red-500/10' : 
                                                 'bg-yellow-500 outline-yellow-500/10'
                                             }`}></div>
                                            <div className="absolute top-4 left-[5.5px] w-px h-full bg-white/5 opacity-50 group-last:hidden"></div>
                                        </div>
                                        <div className="flex-1 pb-4">
                                            <div className="text-sm font-bold text-white mb-1">{pkg.status.replace('_', ' ')}</div>
                                            <div className="text-xs text-gray-500 font-mono">{pkg.trackingNumber}</div>
                                            <div className="flex flex-col gap-2 mt-3">
                                                 <div className="flex items-center gap-2 text-[10px] text-gray-500">
                                                    <MapPin size={12} className="text-gray-600" />
                                                    <span className="truncate">Destination: {pkg.receiver?.address?.city}</span>
                                                 </div>
                                                 <div className="flex items-center gap-2 text-[10px] text-gray-500">
                                                    <Package size={12} className="text-gray-600" />
                                                    <span>{pkg.packageType.replace('_', ' ')}</span>
                                                 </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
