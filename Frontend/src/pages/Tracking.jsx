import React, { useState, useEffect } from 'react';
import { Package, Search, MapPin, Phone, CalendarClock, MessageCircle, CheckCircle, Circle, Clock, ArrowLeft } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { packageService, trackingService } from '../services/api';
import TrackingMap from '../components/TrackingMap';

const Tracking = () => {
    const [searchParams] = useSearchParams();
    const initialTrackingId = searchParams.get('id') || '';
    
    const [trackingId, setTrackingId] = useState(initialTrackingId);
    const [trackingData, setTrackingData] = useState(null);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleTrack = async () => {
        if (!trackingId) return;
        setLoading(true);
        setError('');
        setTrackingData(null);
        setHistory([]);

        try {
            const pkgResponse = await packageService.trackPackage(trackingId);
            setTrackingData(pkgResponse.data);
            const historyResponse = await trackingService.getHistory(trackingId);
            setHistory(historyResponse.data);
        } catch (err) {
            console.error(err);
            setError('Package not found or invalid tracking ID.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (initialTrackingId) {
            handleTrack();
        }
    }, [initialTrackingId]);

    return (
        <div className="flex flex-col min-h-screen bg-[#050505] text-white selection:bg-yellow-500/30">
             <nav className="container flex justify-between items-center h-20 px-6 border-b border-white/5 mx-auto">
                <Link to="/" className="flex items-center gap-3 text-white hover:opacity-80 transition-opacity">
                    <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center shadow-lg shadow-yellow-500/10">
                        <Package size={18} className="text-black" />
                    </div>
                    <span className="text-xl font-bold tracking-tight">Courier<span className="text-yellow-500">Pro</span></span>
                </Link>
                <Link to="/login" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Agent Login</Link>
            </nav>

            <main className="container flex flex-col items-center py-20 px-4 w-full max-w-5xl mx-auto">
                <div className="text-center flex flex-col gap-4 mb-12">
                     <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 mx-auto mb-4 animate-fade-in-up">
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse"></span>
                        <span className="text-xs font-bold text-yellow-500 tracking-wide uppercase">Live Tracking</span>
                     </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">Track your shipment</h1>
                    <p className="text-gray-400 text-lg">Enter your tracking ID to see real-time updates.</p>
                </div>

                <div className="w-full max-w-xl relative group mb-12">
                     <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 to-yellow-200 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                    <div className="relative flex gap-2 p-2 bg-[#0a0a0a] rounded-2xl items-center border border-white/10 shadow-2xl">
                        <Search className="text-gray-500 ml-4" size={24} />
                        <input 
                            type="text" 
                            placeholder="Tracking ID (e.g., PKG-8859)" 
                            className="bg-transparent text-white outline-none w-full p-2 h-12 text-lg placeholder:text-gray-700 font-mono"
                            value={trackingId}
                            onChange={(e) => setTrackingId(e.target.value)}
                             onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
                        />
                        <button className="h-12 px-8 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed" onClick={handleTrack} disabled={loading}>
                            {loading ? <Clock className="animate-spin" size={20} /> : 'Track'}
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-center animate-fade-in mb-8">
                        {error}
                    </div>
                )}

                {trackingData && (
                    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in-up">
                        {/* Status Card */}
                        <div className="lg:col-span-4 flex flex-col gap-6">
                             <div className="glass-panel p-8 relative overflow-hidden h-full flex flex-col justify-between rounded-3xl">
                                <div className="absolute top-0 right-0 p-32 bg-yellow-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                                
                                <div className="space-y-6 relative z-10">
                                    <div>
                                        <span className="text-gray-500 text-xs uppercase tracking-wider font-bold">Tracking ID</span>
                                        <h3 className="text-3xl font-mono text-white tracking-widest mt-1">{trackingData.trackingNumber}</h3>
                                    </div>

                                    <div className="w-full h-px bg-white/10"></div>

                                    <div>
                                        <span className="text-gray-500 text-xs uppercase tracking-wider font-bold">Current Status</span>
                                        <div className={`mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-full border ${
                                            trackingData.status === 'DELIVERED' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 
                                            trackingData.status === 'CANCELLED' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
                                            'bg-yellow-500/10 border-yellow-500/20 text-yellow-500'
                                        }`}>
                                            <Circle size={8} fill="currentColor" />
                                            <span className="font-bold capitalize">{trackingData.status.replace('_', ' ')}</span>
                                        </div>
                                    </div>

                                    <div>
                                         <span className="text-gray-500 text-xs uppercase tracking-wider font-bold">Estimated Delivery</span>
                                         <div className="flex items-center gap-3 text-white mt-1">
                                             <CalendarClock className="text-yellow-500" size={24} />
                                             <span className="text-2xl font-light">Sep 24, 2026</span>
                                         </div>
                                         <p className="text-sm text-gray-500 mt-1 pl-9">By End of Day</p>
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-white/10 relative z-10">
                                   <div className="flex items-center gap-4">
                                       <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                                           <MessageCircle size={18} className="text-gray-400" />
                                       </div>
                                       <div>
                                           <div className="text-sm font-medium text-white">Need updates?</div>
                                           <div className="text-xs text-gray-500">Get SMS notifications</div>
                                       </div>
                                       <button className="ml-auto text-xs font-bold text-yellow-500 hover:text-yellow-400 uppercase tracking-wide">Enable</button>
                                   </div>
                                </div>
                             </div>
                        </div>

                        {/* Map & Timeline */}
                        <div className="lg:col-span-8 flex flex-col gap-6">
                             {/* Map */}
                             <div className="w-full h-[350px] bg-[#111] rounded-3xl border border-white/10 relative overflow-hidden group">
                                <TrackingMap history={history} currentStatus={trackingData.status} />
                             </div>

                             {/* Timeline */}
                             <div className="glass-panel p-8 rounded-3xl">
                                <h3 className="text-lg font-bold mb-8 flex items-center gap-2 text-white">
                                    Shipment History <span className="text-xs font-normal text-gray-500 bg-white/5 px-2 py-0.5 rounded-full ml-2">Latest First</span>
                                </h3>
                                <div className="relative flex flex-col gap-0 pl-2">
                                     <div className="absolute left-[19px] top-2 bottom-6 w-0.5 bg-gray-800"></div>

                                    {history.map((step, i) => (
                                        <div key={i} className="flex gap-6 relative z-10 pb-8 last:pb-0 group">
                                            <div className="relative">
                                                 <div className={`w-10 h-10 rounded-full border-4 flex items-center justify-center bg-[#0a0a0a] transition-all duration-300 ${
                                                     i === 0 ? 'border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.3)] scale-110' : 'border-gray-800 group-hover:border-gray-700'
                                                 }`}>
                                                    {i === 0 ? <Clock size={16} className="text-yellow-500" /> : <div className="w-2 h-2 rounded-full bg-gray-600"></div>}
                                                 </div>
                                            </div>
                                            <div className="flex flex-col gap-1 pt-0.5">
                                                <h4 className={`text-base font-bold capitalize transition-colors ${i === 0 ? 'text-white' : 'text-gray-400'}`}>
                                                    {step.status.replace('_', ' ')}
                                                </h4>
                                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                                    <span className="text-yellow-500/80">{new Date(step.eventTime).toLocaleDateString()}</span>
                                                    <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                                                    <span>{new Date(step.eventTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                                </div>
                                                 <div className="flex items-center gap-1 text-sm text-gray-400 mt-1">
                                                    <MapPin size={12} />
                                                    <span>{step.location}</span>
                                                </div>
                                                {step.remarks && <p className="text-sm text-gray-500 mt-2 bg-white/5 p-3 rounded-lg border border-white/5">"{step.remarks}"</p>}
                                            </div>
                                        </div>
                                    ))}
                                    
                                    {history.length === 0 && <p className="text-gray-500 italic ml-12">No tracking history available yet.</p>}
                                </div>
                             </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Tracking;
