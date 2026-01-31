import React, { useState, useEffect } from 'react';
import { Building2, MapPin, Phone, Package, Plus, Search, MoreVertical, Map, Loader2 } from 'lucide-react';
import { hubService } from '../services/api';

const Hubs = () => {
    const [hubs, setHubs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchHubs();
    }, []);

    const fetchHubs = async () => {
        try {
            setLoading(true);
            const response = await hubService.getAllHubs();
            setHubs(response.data);
        } catch (err) {
            console.error("Failed to fetch hubs", err);
            setError('Failed to load hubs data');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-6 h-full pb-6 p-6">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div className="flex flex-col gap-1">
                    <h1 className="h2 flex items-center gap-3">
                         Hubs Management
                    </h1>
                    <p className="text-muted">Manage distribution centers and capacities</p>
                </div>
                <button className="btn btn-primary shadow-lg shadow-blue-500/20">
                    <Plus size={18} /> 
                    <span>Add New Hub</span>
                </button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-4 gap-6">
                <div className="glass p-5 rounded-xl flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                        <Building2 size={24} />
                    </div>
                    <div>
                        <p className="text-muted text-xs font-bold uppercase tracking-wider">Total Hubs</p>
                        <h3 className="h2 text-white">{hubs.length}</h3>
                    </div>
                </div>
                <div className="glass p-5 rounded-xl flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                        <Package size={24} />
                    </div>
                    <div>
                        <p className="text-muted text-xs font-bold uppercase tracking-wider">Total Capacity</p>
                        <h3 className="h2 text-white">
                            {Math.round(hubs.reduce((acc, hub) => acc + hub.capacity, 0) / 1000)}k
                        </h3>
                    </div>
                </div>
                <div className="glass p-5 rounded-xl flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500">
                        <MapPin size={24} />
                    </div>
                    <div>
                        <p className="text-muted text-xs font-bold uppercase tracking-wider">Active Hubs</p>
                        <h3 className="h2 text-white">{hubs.filter(h => h.active).length}</h3>
                    </div>
                </div>
                 <div className="glass p-5 rounded-xl flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500">
                        <Phone size={24} />
                    </div>
                    <div>
                        <p className="text-muted text-xs font-bold uppercase tracking-wider">Avg Load</p>
                        <h3 className="h2 text-white">
                            {hubs.length > 0 ? Math.round(hubs.reduce((acc, hub) => acc + (hub.currentLoad / hub.capacity), 0) / hubs.length * 100) : 0}%
                        </h3>
                    </div>
                </div>
            </div>

            {/* Hubs Content */}
            <div className="glass flex-1 rounded-xl overflow-hidden flex flex-col">
                <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                     <div className="relative w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
                        <input type="text" placeholder="Search hubs..." className="input pl-10 h-10 text-sm bg-white/5 border-white/10" />
                    </div>
                    <div className="flex gap-2">
                        <button className="btn btn-secondary text-sm">
                            <Map size={16} /> Map View
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto flex-1 custom-scrollbar">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-white/5">
                            <tr className="border-b border-white/5">
                                <th className="p-4 text-muted text-xs font-semibold uppercase tracking-wider">Hub Name</th>
                                <th className="p-4 text-muted text-xs font-semibold uppercase tracking-wider">Location</th>
                                <th className="p-4 text-muted text-xs font-semibold uppercase tracking-wider">Capacity Load</th>
                                <th className="p-4 text-muted text-xs font-semibold uppercase tracking-wider">Status</th>
                                <th className="p-4 text-muted text-xs font-semibold uppercase tracking-wider">Manager</th>
                                <th className="p-4 text-muted text-xs font-semibold uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="p-12 text-center">
                                        <Loader2 className="w-8 h-8 animate-spin mx-auto text-yellow-500" />
                                        <p className="text-gray-500 mt-2">Loading hubs...</p>
                                    </td>
                                </tr>
                            ) : hubs.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="p-12 text-center text-gray-500 italic">
                                        No distribution centers found
                                    </td>
                                </tr>
                            ) : (
                                hubs.map((hub) => (
                                    <tr key={hub.id} className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center font-bold text-gray-400 border border-white/5">
                                                    {hub.code.substring(4,7)}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-white">{hub.name}</div>
                                                    <div className="text-xs text-muted font-mono">{hub.code}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2 text-sm text-gray-300">
                                                <MapPin size={14} className="text-muted" />
                                                {hub.location}
                                            </div>
                                            <div className="text-xs text-muted mt-1 truncate max-w-[200px] opacity-70">
                                                {hub.address?.line1}, {hub.address?.city}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex flex-col gap-1 w-40">
                                                <div className="flex justify-between text-xs mb-1 font-medium">
                                                    <span className="text-white">{Math.round((hub.currentLoad / hub.capacity) * 100)}%</span>
                                                    <span className="text-muted">{hub.currentLoad.toLocaleString()} / {hub.capacity.toLocaleString()}</span>
                                                </div>
                                                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                                    <div 
                                                        className={`h-full rounded-full ${
                                                            (hub.currentLoad / hub.capacity) > 0.9 ? 'bg-red-500' : 
                                                            (hub.currentLoad / hub.capacity) > 0.7 ? 'bg-yellow-500' : 'bg-blue-500'
                                                        }`}
                                                        style={{ width: `${(hub.currentLoad / hub.capacity) * 100}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold tracking-wide border ${
                                                hub.active 
                                                ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                                                : 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                                            }`}>
                                                {hub.active ? 'ACTIVE' : 'INACTIVE'}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-gray-700 to-gray-600 flex items-center justify-center text-[10px] font-bold text-white border border-white/10">
                                                    {hub.managerName?.charAt(0) || 'U'}
                                                </div>
                                                <span className="text-sm text-gray-300">{hub.managerName}</span>
                                            </div>
                                            <div className="text-xs text-muted flex items-center gap-1 mt-1 ml-8">
                                                <Phone size={10} /> {hub.managerPhone}
                                            </div>
                                        </td>
                                        <td className="p-4 text-right">
                                            <button className="btn-ghost p-2 hover:bg-white/10 rounded-lg text-muted hover:text-white transition-colors">
                                                <MoreVertical size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Hubs;
