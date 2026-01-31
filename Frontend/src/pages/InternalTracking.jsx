import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Package, Search, MapPin, Clock, Circle, ArrowRight } from 'lucide-react';
import { packageService, trackingService } from '../services/api';
import TrackingMap from '../components/TrackingMap';
import { useAuth } from '../context/AuthContext';

const InternalTracking = () => {
    const [searchParams] = useSearchParams();
    const initialTrackingId = searchParams.get('id') || '';
    
    const [trackingId, setTrackingId] = useState(initialTrackingId);
    const [trackingData, setTrackingData] = useState(null);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [updating, setUpdating] = useState(false);
    const [newStatus, setNewStatus] = useState('');
    const [remarks, setRemarks] = useState('');
    const [location, setLocation] = useState('');
    const [otp, setOtp] = useState('');
    const [showOtp, setShowOtp] = useState(false);
    const { user } = useAuth();

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
            setLocation(pkgResponse.data.receiver?.address?.city || '');
            setNewStatus(pkgResponse.data.status);
        } catch (err) {
            console.error(err);
            setError('Package not found or invalid tracking ID.');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (e) => {
        e.preventDefault();
        if (newStatus === 'DELIVERED' && !showOtp) {
            setShowOtp(true);
            return;
        }

        try {
            setUpdating(true);
            // 1. Add tracking event
            await trackingService.addEvent(trackingData.id, {
                status: newStatus,
                location: location,
                remarks: remarks
            });

            // 2. Update package status (and pass OTP if delivered)
            await packageService.updateStatus(trackingData.id, {
                status: newStatus,
                otp: newStatus === 'DELIVERED' ? otp : null
            });

            alert('Status updated successfully!');
            setRemarks('');
            setOtp('');
            setShowOtp(false);
            handleTrack(); // Refresh
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to update status');
        } finally {
            setUpdating(false);
        }
    };

    const isAdminOrAssignedCourier = user?.role === 'ADMIN' || (user?.role === 'COURIER' && trackingData?.assignedCourierId === user.id);

    useEffect(() => {
        if (initialTrackingId) {
            handleTrack();
        }
    }, [initialTrackingId]);

    return (
        <div className="flex flex-col gap-6 h-full pb-6 p-6">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="h2 mb-1">Tracking</h2>
                    <p className="text-muted">Real-time package tracking and history</p>
                </div>
            </div>

            {/* Search Bar */}
            <div className="glass p-6 rounded-xl flex gap-4 items-center mt-6">
                <div className="relative flex-1">
                    <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={20} />
                    <input 
                        type="text" 
                        placeholder="Enter Tracking ID (e.g., PKG-12345)" 
                        className="input pl-12 h-12 text-lg bg-white/5 border-white/10 w-full"
                        value={trackingId}
                        onChange={(e) => setTrackingId(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
                    />
                </div>
                <button 
                    className="btn btn-primary h-12 px-6 shadow-lg shadow-blue-500/20" 
                    onClick={handleTrack}
                    disabled={loading}
                >
                    {loading ? 'Searching...' : 'Track Package'}
                </button>
            </div>

            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    {error}
                </div>
            )}

            {trackingData && (
                <div className="grid grid-cols-12 gap-6 flex-1 min-h-0">
                    {/* Left Column: Details & Map */}
                    <div className="col-span-8 flex flex-col gap-6 overflow-y-auto custom-scrollbar pr-2">
                        {/* Real Map */}
                        <div className="w-full h-96 glass rounded-xl relative overflow-hidden border border-white/5">
                           <TrackingMap history={history} currentStatus={trackingData.status} />
                        </div>

                        {/* Shipment Info */}
                        <div className="glass p-6 rounded-xl">
                            <h3 className="h3 mb-4 text-lg">Shipment Details</h3>
                            <div className="grid grid-cols-3 gap-6">
                                <div>
                                    <span className="text-xs text-muted uppercase tracking-wider font-semibold">Sender</span>
                                    <div className="text-white font-medium mt-1">{trackingData.sender?.name || trackingData.senderName}</div>
                                    <div className="text-sm text-muted">
                                        {trackingData.sender?.address?.city}, {trackingData.sender?.address?.state}
                                    </div>
                                </div>
                                <div className="flex items-center justify-center">
                                    <ArrowRight className="text-muted opacity-50" />
                                </div>
                                <div>
                                    <span className="text-xs text-muted uppercase tracking-wider font-semibold">Receiver</span>
                                    <div className="text-white font-medium mt-1">{trackingData.receiver?.name || trackingData.receiverName}</div>
                                    <div className="text-sm text-muted">
                                        {trackingData.receiver?.address?.city}, {trackingData.receiver?.address?.state}
                                    </div>
                                </div>
                            </div>
                            <div className="h-px bg-white/5 my-6"></div>
                            <div className="grid grid-cols-4 gap-4">
                                <div>
                                    <span className="text-xs text-muted uppercase tracking-wider font-semibold">Type</span>
                                    <div className="text-sm text-white mt-1">{trackingData.packageType?.replace('_', ' ')}</div>
                                </div>
                                <div>
                                    <span className="text-xs text-muted uppercase tracking-wider font-semibold">Weight</span>
                                    <div className="text-sm text-white mt-1">{trackingData.weight}kg</div>
                                </div>
                                <div>
                                    <span className="text-xs text-muted uppercase tracking-wider font-semibold">Price</span>
                                    <div className="text-sm text-white mt-1">${trackingData.amount || trackingData.price}</div>
                                </div>
                                <div>
                                    <span className="text-xs text-muted uppercase tracking-wider font-semibold">ETA</span>
                                    <div className="text-sm text-accent mt-1">2 Days</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Timeline & Update */}
                    <div className="col-span-4 flex flex-col gap-6">
                        <div className="glass rounded-xl p-6 flex-1 overflow-y-auto">
                            <h3 className="h3 mb-6 text-lg">Tracking History</h3>
                            <div className="relative pl-4 space-y-8 before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-white/5">
                                {history.length === 0 ? (
                                    <p className="text-muted text-sm italic">No history available.</p>
                                ) : (
                                    history.map((event, index) => {
                                        const eventDate = event.timestamp ? (Array.isArray(event.timestamp) ? 
                                            new Date(event.timestamp[0], event.timestamp[1]-1, event.timestamp[2], event.timestamp[3], event.timestamp[4]) : 
                                            new Date(event.timestamp)) : new Date();

                                        return (
                                            <div key={index} className="relative z-10">
                                                <div className={`absolute -left-[21px] top-1 w-3 h-3 rounded-full border-2 ${index === 0 ? 'bg-blue-500 border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-[#0f1219] border-gray-600'}`}></div>
                                                <div className="flex flex-col gap-1">
                                                    <span className={`text-sm font-bold uppercase tracking-wide ${index === 0 ? 'text-blue-400' : 'text-gray-400'}`}>
                                                        {event.status.replace('_', ' ')}
                                                    </span>
                                                    <div className="text-xs text-muted flex items-center gap-1.5">
                                                        <Clock size={12} />
                                                        {eventDate.toLocaleString()}
                                                    </div>
                                                    <div className="text-xs text-gray-500 mt-1 flex items-center gap-1.5">
                                                        <MapPin size={12} />
                                                        {event.location}
                                                    </div>
                                                    {event.remarks && (
                                                        <p className="text-xs text-gray-600 mt-1 italic">"{event.remarks}"</p>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>

                        {isAdminOrAssignedCourier && trackingData.status !== 'DELIVERED' && trackingData.status !== 'CANCELLED' && (
                            <div className="glass rounded-xl p-6">
                                <h3 className="h3 mb-4 text-lg">Update Status</h3>
                                <form onSubmit={handleUpdateStatus} className="space-y-4">
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 block">New Status</label>
                                        <select 
                                            value={newStatus}
                                            onChange={(e) => {
                                                setNewStatus(e.target.value);
                                                if (e.target.value !== 'DELIVERED') setShowOtp(false);
                                            }}
                                            className="w-full bg-black/50 border border-white/10 text-white p-2.5 rounded-xl outline-none focus:border-blue-500/50 transition-all text-sm"
                                        >
                                            <option value="CREATED">Created</option>
                                            <option value="PICKED_UP">Picked Up</option>
                                            <option value="IN_TRANSIT">In Transit</option>
                                            <option value="ARRIVED_AT_HUB">Arrived at Hub</option>
                                            <option value="OUT_FOR_DELIVERY">Out for Delivery</option>
                                            <option value="DELIVERED">Delivered (Requires OTP)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 block">Current Location</label>
                                        <input 
                                            type="text" 
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                            placeholder="e.g. Dallas Distribution Center"
                                            className="w-full bg-black/50 border border-white/10 text-white p-2.5 rounded-xl outline-none focus:border-blue-500/50 transition-all text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 block">Remarks</label>
                                        <textarea 
                                            value={remarks}
                                            onChange={(e) => setRemarks(e.target.value)}
                                            placeholder="Optional delivery notes..."
                                            className="w-full bg-black/50 border border-white/10 text-white p-2.5 rounded-xl outline-none focus:border-blue-500/50 transition-all text-sm h-20 resize-none"
                                        />
                                    </div>

                                    {showOtp && (
                                        <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl space-y-3 animate-in fade-in slide-in-from-top-2">
                                            <p className="text-xs text-yellow-500 font-medium">Please enter the 6-digit OTP provided by the customer.</p>
                                            <input 
                                                type="text" 
                                                maxLength="6"
                                                value={otp}
                                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                                placeholder="Enter OTP"
                                                className="w-full bg-black/50 border border-yellow-500/30 text-yellow-500 p-2.5 rounded-xl outline-none focus:border-yellow-500 transition-all text-center text-lg font-bold tracking-widest"
                                            />
                                        </div>
                                    )}

                                    <button 
                                        type="submit"
                                        disabled={updating || (showOtp && otp.length < 6)}
                                        className="w-full btn btn-primary py-3 flex items-center justify-center gap-2 group"
                                    >
                                        {updating ? (
                                            <Circle className="animate-spin" size={18} />
                                        ) : (
                                            <>
                                                <span>Update Status</span>
                                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default InternalTracking;
