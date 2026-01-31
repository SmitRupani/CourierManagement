import React, { useState, useEffect } from 'react';
import { Users, MapPin, Phone, Mail, Star, CheckCircle, Clock, MoreHorizontal, Filter, Search, Loader2 } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import { adminService } from '../services/api';

const Agents = () => {
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('ALL'); // ALL, COURIER, CUSTOMER
    const [updatingId, setUpdatingId] = useState(null);

    useEffect(() => {
        fetchAgents();
    }, []);

    const fetchAgents = async () => {
        try {
            setLoading(true);
            const response = await adminService.getAllUsers({ size: 100 });
            setAgents(response.data.content);
        } catch (err) {
            console.error("Failed to fetch agents", err);
        } finally {
            setLoading(false);
        }
    };

    const handleToggleStatus = async (agent) => {
        try {
            setUpdatingId(agent.id);
            await adminService.updateUserStatus(agent.id, !agent.active);
            fetchAgents();
        } catch (err) {
            alert("Failed to update status");
        } finally {
            setUpdatingId(null);
        }
    };

    const handleChangeRole = async (id, newRole) => {
        if (!window.confirm(`Change user role to ${newRole}?`)) return;
        try {
            setUpdatingId(id);
            await adminService.updateUserRole(id, newRole);
            fetchAgents();
        } catch (err) {
            alert("Failed to update role");
        } finally {
            setUpdatingId(null);
        }
    };

    const filteredAgents = agents.filter(a => {
        const matchesSearch = a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             a.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = filterRole === 'ALL' || a.role === filterRole;
        return matchesSearch && matchesRole;
    });

    const stats = [
        { label: 'Total Agents', value: agents.length, icon: Users, color: 'blue' },
        { label: 'Active Now', value: agents.filter(a => a.active).length, icon: CheckCircle, color: 'green' },
        { label: 'Pending Task', value: '12', icon: Clock, color: 'orange' },
        { label: 'Avg Rating', value: '4.8', icon: Star, color: 'yellow' },
    ];

    return (
        <div className="flex flex-col gap-6 h-full pb-6 p-6 overflow-y-auto">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Agent Management</h1>
                    <p className="text-gray-500">Manage your delivery agents and track their performance</p>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-zinc-900/80 border border-white/5 p-5 rounded-2xl flex items-center justify-between group hover:border-white/10 transition-all">
                        <div>
                            <div className="text-gray-500 text-xs uppercase tracking-wider font-semibold mb-1">{stat.label}</div>
                            <div className="text-2xl font-bold text-white">{stat.value}</div>
                        </div>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center 
                            ${stat.color === 'blue' ? 'bg-blue-500/10 text-blue-400' : ''}
                            ${stat.color === 'green' ? 'bg-green-500/10 text-green-400' : ''}
                            ${stat.color === 'orange' ? 'bg-orange-500/10 text-orange-400' : ''}
                            ${stat.color === 'yellow' ? 'bg-yellow-500/10 text-yellow-400' : ''}
                        `}>
                            <stat.icon size={20} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Filter Bar */}
            <div className="bg-zinc-900/50 border border-white/5 p-3 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4">
                 <div className="flex items-center gap-3 px-2 flex-1 w-full">
                    <Search className="text-gray-500" size={16} />
                    <input 
                        type="text" 
                        placeholder="Search by name or email..." 
                        className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-gray-600" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                 </div>
                 <div className="flex items-center gap-2 w-full md:w-auto">
                    <span className="text-xs text-gray-500 font-bold uppercase tracking-wider mr-2">Filter:</span>
                    <button 
                        onClick={() => setFilterRole('ALL')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${filterRole === 'ALL' ? 'bg-white/10 text-white border border-white/20' : 'text-gray-500 hover:text-white'}`}
                    >ALL</button>
                    <button 
                        onClick={() => setFilterRole('COURIER')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${filterRole === 'COURIER' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' : 'text-gray-500 hover:text-white'}`}
                    >COURIERS</button>
                    <button 
                        onClick={() => setFilterRole('CUSTOMER')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${filterRole === 'CUSTOMER' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' : 'text-gray-500 hover:text-white'}`}
                    >CUSTOMERS</button>
                 </div>
            </div>

            {/* Agents Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {loading ? (
                    <div className="col-span-2 p-12 text-center">
                        <Loader2 className="w-8 h-8 animate-spin mx-auto text-yellow-500 mb-4" />
                        <p className="text-gray-500">Loading agents...</p>
                    </div>
                ) : filteredAgents.length === 0 ? (
                    <div className="col-span-2 p-12 text-center text-gray-500 glass rounded-2xl">
                        No couriers found in the system.
                    </div>
                ) : (
                    filteredAgents.map((agent) => (
                        <div key={agent.id} className="bg-zinc-900/80 border border-white/5 p-6 rounded-2xl hover:bg-white/[0.03] transition-colors group relative">
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-600 p-[2px] shadow-lg shadow-yellow-500/20">
                                        <div className="w-full h-full rounded-2xl bg-[#0f1219] flex items-center justify-center text-xl font-bold text-white uppercase">
                                            {agent.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-1">{agent.name}</h3>
                                        <div className="flex items-center gap-2">
                                            <span className={`w-2 h-2 rounded-full ${agent.active ? 'bg-green-500 animate-pulse' : 'bg-gray-600'}`}></span>
                                            <span className="text-xs text-gray-400 capitalize">{agent.active ? 'Active' : 'Inactive'}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1.5 bg-yellow-500/10 px-2 py-1 rounded-lg border border-yellow-500/20">
                                    <Star size={14} className="text-yellow-500" fill="currentColor" />
                                    <span className="text-sm font-bold text-yellow-500">4.8</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="flex items-center gap-3 text-sm text-gray-500 truncate">
                                    <Mail size={16} className="shrink-0" />
                                    <span className="truncate">{agent.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-500">
                                    <Phone size={16} className="shrink-0" />
                                    <span>{agent.phone || 'N/A'}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-500">
                                    <MapPin size={16} className="shrink-0" />
                                    <span>Main Hub</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-500">
                                    <CheckCircle size={16} className="shrink-0" />
                                    <span>Role: {agent.role}</span>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-4">
                                <button 
                                    onClick={() => handleToggleStatus(agent)}
                                    disabled={updatingId === agent.id}
                                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                                        agent.active 
                                        ? 'bg-red-500/5 hover:bg-red-500/10 text-red-500 border-red-500/10' 
                                        : 'bg-green-500/5 hover:bg-green-500/10 text-green-500 border-green-500/10'
                                    }`}
                                >
                                    {updatingId === agent.id ? 'Updating...' : (agent.active ? 'Deactivate' : 'Activate')}
                                </button>
                                
                                {agent.role === 'CUSTOMER' ? (
                                    <button 
                                        onClick={() => handleChangeRole(agent.id, 'COURIER')}
                                        disabled={updatingId === agent.id}
                                        className="flex-1 py-2.5 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black text-xs font-bold transition-all"
                                    >
                                        Make Courier
                                    </button>
                                ) : (
                                    <button 
                                        onClick={() => handleChangeRole(agent.id, 'CUSTOMER')}
                                        disabled={updatingId === agent.id || agent.role === 'ADMIN'}
                                        className="flex-1 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-white text-xs font-bold transition-all disabled:opacity-30"
                                    >
                                        Make Customer
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Agents;
