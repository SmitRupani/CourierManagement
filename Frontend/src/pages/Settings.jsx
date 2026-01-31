import React, { useState } from 'react';
import { User, Mail, Bell, Lock, Moon, Shield, Save, Smartphone, ChevronRight, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { userService } from '../services/api';

const Settings = () => {
    const { user } = useAuth();
    const [darkMode, setDarkMode] = useState(true);
    const [notifications, setNotifications] = useState({
        email: true,
        push: true,
        sms: false
    });
    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        password: ''
    });
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleSave = async () => {
        try {
            setLoading(true);
            setMessage({ type: '', text: '' });
            
            const updateData = {
                name: profile.name,
                email: profile.email,
                phone: profile.phone
            };
            
            if (profile.password) {
                updateData.password = profile.password;
            }

            await userService.updateProfile(updateData);
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
        } catch (err) {
            setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to update profile' });
        } finally {
            setLoading(false);
        }
    };

    const Toggle = ({ active }) => (
        <div className={`w-11 h-6 rounded-full relative transition-colors duration-200 ease-in-out ${active ? 'bg-yellow-500' : 'bg-gray-700'}`}>
            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ease-in-out shadow-sm ${active ? 'left-6' : 'left-1'}`}></div>
        </div>
    );

    return (
        <div className="max-w-5xl mx-auto py-6">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="h1 mb-1">Settings</h1>
                    <p className="text-muted">Manage your account preferences and application settings</p>
                </div>
                <button 
                    onClick={handleSave}
                    disabled={loading}
                    className="btn btn-primary shadow-lg shadow-blue-500/20 px-6"
                >
                    {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                    <span>{loading ? 'Saving...' : 'Save Changes'}</span>
                </button>
            </div>

            {message.text && (
                <div className={`p-4 rounded-xl mb-6 border ${
                    message.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'
                }`}>
                    {message.text}
                </div>
            )}

            <div className="flex flex-col gap-8">
                    
                    {/* Profile Information */}
                    <div className="glass rounded-xl p-8">
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                                <User size={20} />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-white">Profile Information</h2>
                                <p className="text-xs text-muted">Update your public profile details.</p>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-6">
                            <div className="col-span-2 flex items-center gap-6 mb-2">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-[2px]">
                                    <div className="w-full h-full rounded-full bg-[#0f1219] flex items-center justify-center text-2xl font-bold text-white uppercase">
                                        {user?.name ? user.name.split(' ').map(n=>n[0]).join('') : 'JD'}
                                    </div>
                                </div>
                                <div>
                                    <button className="btn btn-secondary text-xs py-1.5 px-3">Change Avatar</button>
                                    <p className="text-xs text-muted mt-2">JPG, GIF or PNG. Max size 800K</p>
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Full Name</label>
                                <input 
                                    type="text" 
                                    className="input bg-white/5 border-white/10 focus:border-blue-500/50" 
                                    value={profile.name}
                                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email Address</label>
                                <input 
                                    type="email" 
                                    className="input bg-white/5 border-white/10 focus:border-blue-500/50" 
                                    value={profile.email}
                                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Phone Number</label>
                                <input 
                                    type="tel" 
                                    className="input bg-white/5 border-white/10 focus:border-blue-500/50" 
                                    value={profile.phone}
                                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Role</label>
                                <input 
                                    type="text" 
                                    className="input bg-white/5 border-white/10 opacity-50 cursor-not-allowed" 
                                    value={user?.role || ''}
                                    disabled
                                />
                            </div>
                        </div>
                    </div>

                    {/* Notifications */}
                    <div className="glass rounded-xl p-8">
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                            <div className="p-2 rounded-lg bg-yellow-500/10 text-yellow-500">
                                <Bell size={20} />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-white">Notifications</h2>
                                <p className="text-xs text-muted">Manage how we communicate with you.</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {[
                                { key: 'email', label: 'Email Notifications', desc: 'Receive daily summaries and critical alerts via email.', icon: Mail },
                                { key: 'push', label: 'Push Notifications', desc: 'Get real-time updates on your desktop or mobile.', icon: Bell },
                                { key: 'sms', label: 'SMS Alerts', desc: 'Receive text messages for urgent delivery status changes.', icon: Smartphone }
                            ].map((item) => (
                                <div key={item.key} 
                                     onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key] })}
                                     className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors cursor-pointer border border-white/5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-muted">
                                            <item.icon size={18} />
                                        </div>
                                        <div>
                                            <div className="font-medium text-white">{item.label}</div>
                                            <div className="text-xs text-muted mt-0.5">{item.desc}</div>
                                        </div>
                                    </div>
                                    <Toggle active={notifications[item.key]} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Security */}
                     <div className="glass rounded-xl p-8">
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                            <div className="p-2 rounded-lg bg-green-500/10 text-green-500">
                                <Shield size={20} />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-white">Security & Login</h2>
                                <p className="text-xs text-muted">Update your password and secure your account.</p>
                            </div>
                        </div>
                         <div className="space-y-2 max-w-md">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Current Password</label>
                                <input type="password" className="input bg-white/5 border-white/10" placeholder="••••••••" />
                        </div>
                        <div className="grid grid-cols-2 gap-6 mt-4 max-w-md">
                             <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">New Password</label>
                                <input 
                                    type="password" 
                                    className="input bg-white/5 border-white/10" 
                                    placeholder="••••••••" 
                                    value={profile.password}
                                    onChange={(e) => setProfile({...profile, password: e.target.value})}
                                />
                            </div>
                             <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Confirm Password</label>
                                <input type="password" className="input bg-white/5 border-white/10" placeholder="••••••••" />
                            </div>
                        </div>
                        <div className="mt-6">
                             <button className="btn btn-secondary border-red-500/20 text-red-500 hover:bg-red-500/10 hover:border-red-500/30">
                                Log Out All Devices
                             </button>
                        </div>
                    </div>

            </div>
        </div>
    );
};

export default Settings;
