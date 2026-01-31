import React, { useState, useEffect } from 'react';
import { Bell, Clock, Mail, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { notificationService } from '../services/api';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            setLoading(true);
            const response = await notificationService.getNotifications();
            setNotifications(response.data);
        } catch (err) {
            console.error("Failed to fetch notifications", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto min-h-screen">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="h1 mb-1">Notifications</h1>
                    <p className="text-muted">Stay updated with your latest alerts and messages</p>
                </div>
                <button 
                    onClick={fetchNotifications}
                    className="text-xs font-bold text-yellow-500 hover:text-yellow-400 uppercase tracking-widest"
                >
                    Refresh List
                </button>
            </div>

            <div className="space-y-4">
                {loading ? (
                    <div className="p-12 text-center">
                        <Loader2 className="w-8 h-8 animate-spin mx-auto text-yellow-500 mb-4" />
                        <p className="text-gray-500">Retrieving notifications...</p>
                    </div>
                ) : notifications.length === 0 ? (
                    <div className="p-16 text-center glass rounded-2xl border-dashed">
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                            <Bell className="text-gray-600" size={32} />
                        </div>
                        <h3 className="text-white font-bold mb-1">All caught up!</h3>
                        <p className="text-gray-500 text-sm">No new notifications for you right now.</p>
                    </div>
                ) : (
                    notifications.map((notif) => (
                        <div key={notif.id} className="glass p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-all group">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0 group-hover:bg-blue-500 group-hover:text-white transition-all">
                                    <Mail size={20} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="text-white font-bold">{notif.subject}</h3>
                                        <span className="text-[10px] text-gray-500 font-medium whitespace-nowrap ml-4 flex items-center gap-1">
                                            <Clock size={10} />
                                            {new Date(notif.timestamp).toLocaleString()}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-400 leading-relaxed whitespace-pre-wrap">
                                        {notif.body}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Notifications;
