import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Mail, Lock, Truck, Eye, EyeOff } from 'lucide-react';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(credentials);
            navigate('/dashboard');
        } catch (err) {
            setError('Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex">
            {/* Left Side - Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-zinc-900 to-black p-12 flex-col justify-between relative overflow-hidden">
                {/* Background Pattern */}
                <div 
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)',
                        backgroundSize: '32px 32px'
                    }}
                ></div>
                
                {/* Logo */}
                <div className="relative z-10 flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/20">
                        <Truck size={20} className="text-black" />
                    </div>
                    <span className="text-2xl font-bold text-white tracking-tight">
                        Courier<span className="text-yellow-500">Pro</span>
                    </span>
                </div>
                
                {/* Content */}
                <div className="relative z-10">
                    <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight mb-6">
                        Manage your deliveries with
                        <span className="block text-yellow-500 mt-2">precision & ease</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-md leading-relaxed">
                        Join thousands of businesses using CourierPro to streamline their logistics operations.
                    </p>
                </div>
                
                {/* Stats */}
                <div className="relative z-10 flex gap-8">
                    <div>
                        <div className="text-3xl font-bold text-white">50M+</div>
                        <div className="text-sm text-gray-500">Packages Delivered</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-white">99.9%</div>
                        <div className="text-sm text-gray-500">Uptime SLA</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-white">10K+</div>
                        <div className="text-sm text-gray-500">Businesses</div>
                    </div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex-1 flex items-center justify-center p-6 md:p-12">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
                        <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/20">
                            <Truck size={20} className="text-black" />
                        </div>
                        <span className="text-2xl font-bold text-white tracking-tight">
                            Courier<span className="text-yellow-500">Pro</span>
                        </span>
                    </div>

                    {/* Login Card */}
                    <div className="bg-zinc-900/50 border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 backdrop-blur-xl">
                        <div className="mb-8">
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Welcome back</h2>
                            <p className="text-gray-500">Sign in to access your dashboard</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {error && (
                                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm text-center animate-pulse">
                                    {error}
                                </div>
                            )}
                            
                            <div>
                                <label className="text-sm font-medium text-gray-300 block mb-2">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                    <input
                                        type="email"
                                        name="email"
                                        value={credentials.email}
                                        onChange={handleChange}
                                        className="w-full bg-black/50 border border-white/10 text-white pl-12 pr-4 py-3.5 rounded-xl outline-none focus:border-yellow-500/50 focus:ring-2 focus:ring-yellow-500/20 transition-all text-sm placeholder-gray-600"
                                        placeholder="name@company.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="text-sm font-medium text-gray-300">Password</label>
                                    <a href="#" className="text-xs text-gray-500 hover:text-yellow-500 transition-colors">Forgot password?</a>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={credentials.password}
                                        onChange={handleChange}
                                        className="w-full bg-black/50 border border-white/10 text-white pl-12 pr-12 py-3.5 rounded-xl outline-none focus:border-yellow-500/50 focus:ring-2 focus:ring-yellow-500/20 transition-all text-sm placeholder-gray-600"
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                disabled={loading}
                                className="w-full bg-yellow-500 hover:bg-yellow-400 disabled:bg-yellow-500/50 text-black font-semibold py-3.5 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-yellow-500/25 flex items-center justify-center gap-2 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <LogIn size={18} /> Sign In
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-6 text-center text-sm text-gray-500">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-yellow-500 hover:text-yellow-400 font-medium transition-colors">
                                Create account
                            </Link>
                        </div>
                    </div>
                    
                    {/* Footer */}
                    <p className="text-center text-xs text-gray-600 mt-8">
                        By signing in, you agree to our{' '}
                        <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
                        {' '}and{' '}
                        <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
