import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, User, Mail, Lock, Phone, MapPin } from 'lucide-react';
import { authService } from '../services/api';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        role: 'USER'
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await authService.register(formData);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed. Email might be in use.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-black py-12">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="flex items-center justify-center gap-2 mb-8">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
                        <span className="text-black font-bold text-sm">C</span>
                    </div>
                    <span className="text-2xl font-bold text-white tracking-tight">Courier<span className="text-yellow-500">Pro</span></span>
                </div>

                {/* Register Card */}
                <div className="bg-[#111] border border-[#222] rounded-2xl p-8">
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold text-white mb-2">Create Account</h2>
                        <p className="text-gray-400 text-sm">Join CourierPro today</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                             <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg text-sm text-center">
                                {error}
                             </div>
                        )}
                        
                        <div>
                            <label className="text-sm font-medium text-gray-300 block mb-2">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                                <input 
                                    type="text" 
                                    name="name" 
                                    onChange={handleChange} 
                                    className="w-full bg-black border border-[#333] text-white pl-10 pr-4 py-2.5 rounded-lg outline-none focus:border-[#555] transition-colors text-sm" 
                                    placeholder="John Doe"
                                    required 
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-300 block mb-2">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                                <input 
                                    type="email" 
                                    name="email" 
                                    onChange={handleChange} 
                                    className="w-full bg-black border border-[#333] text-white pl-10 pr-4 py-2.5 rounded-lg outline-none focus:border-[#555] transition-colors text-sm" 
                                    placeholder="name@company.com"
                                    required 
                                />
                            </div>
                        </div>

                        <div>
                             <label className="text-sm font-medium text-gray-300 block mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                                <input 
                                    type="password" 
                                    name="password" 
                                    onChange={handleChange} 
                                    className="w-full bg-black border border-[#333] text-white pl-10 pr-4 py-2.5 rounded-lg outline-none focus:border-[#555] transition-colors text-sm" 
                                    placeholder="••••••••"
                                    required 
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-300 block mb-2">Phone</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                                <input 
                                    type="tel" 
                                    name="phone" 
                                    onChange={handleChange} 
                                    className="w-full bg-black border border-[#333] text-white pl-10 pr-4 py-2.5 rounded-lg outline-none focus:border-[#555] transition-colors text-sm" 
                                    placeholder="+1 (555) 000-0000"
                                    required 
                                />
                            </div>
                        </div>
                        
                        <div>
                            <label className="text-sm font-medium text-gray-300 block mb-2">Address</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                                <input 
                                    type="text" 
                                    name="address" 
                                    onChange={handleChange} 
                                    className="w-full bg-black border border-[#333] text-white pl-10 pr-4 py-2.5 rounded-lg outline-none focus:border-[#555] transition-colors text-sm" 
                                    placeholder="123 Main St, New York"
                                    required 
                                />
                            </div>
                        </div>

                        <button type="submit" className="w-full bg-white hover:bg-gray-200 text-black font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 mt-6">
                            <UserPlus size={18} /> Register
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-500">
                        Already have an account? <Link to="/login" className="text-white hover:underline">Sign In</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
