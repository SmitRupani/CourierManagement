import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Truck, ShieldCheck, Globe, Menu, X, ArrowRight, BarChart3, Bell, Lock, Zap, Package, MapPin, CheckCircle } from 'lucide-react';

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    { icon: Globe, title: 'Real-time Tracking', desc: 'Monitor your entire fleet and shipments on a live, interactive map globally.' },
    { icon: BarChart3, title: 'Analytics & Reports', desc: 'Deep insights into fuel costs, delivery times, and fleet performance.' },
    { icon: Bell, title: 'Automated Notifications', desc: 'Keep customers informed with SMS and email updates at every step.' },
    { icon: Truck, title: 'Fleet Management', desc: 'Optimized routing for trucks, vans, and bikes to save time and fuel.' },
    { icon: Lock, title: 'Secure & Scalable', desc: 'Enterprise-grade security with 99.9% uptime SLA for your business.' },
    { icon: ShieldCheck, title: 'Compliance Ready', desc: 'Automated digital proof of delivery and audit trails.' },
  ];

  const stats = [
    { value: '99.9%', label: 'Uptime' },
    { value: '50M+', label: 'Deliveries' },
    { value: '10K+', label: 'Businesses' },
    { value: '150+', label: 'Countries' },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/70 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center h-16 md:h-20 px-4 md:px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-9 md:h-9 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center shadow-lg shadow-yellow-500/20">
              <Truck size={16} className="text-black" />
            </div>
            <span className="text-lg md:text-xl font-bold tracking-tight">
              Courier<span className="text-yellow-500">Pro</span>
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Features</a>
            <a href="#stats" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">About</a>
            <Link to="/login" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Login</Link>
            <Link 
              to="/tracking" 
              className="bg-yellow-500 hover:bg-yellow-400 text-black px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 shadow-lg shadow-yellow-500/20"
            >
              Track Package
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-gray-300 hover:text-white transition-colors" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/5 transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
          <div className="flex flex-col p-4 gap-4">
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="text-gray-400 hover:text-white py-2 text-sm font-medium">Features</a>
            <a href="#stats" onClick={() => setMobileMenuOpen(false)} className="text-gray-400 hover:text-white py-2 text-sm font-medium">About</a>
            <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="text-gray-400 hover:text-white py-2 text-sm font-medium">Login</Link>
            <Link 
              to="/tracking" 
              onClick={() => setMobileMenuOpen(false)}
              className="bg-yellow-500 text-black px-5 py-3 rounded-full text-sm font-semibold text-center"
            >
              Track Package
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 md:pt-20 overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black z-10"></div>
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/6169116-uhd_3840_2160_25fps.mp4" type="video/mp4" />
          </video>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-20 px-4 md:px-6 text-center max-w-5xl mx-auto py-20 md:py-32">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6 md:mb-8">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs font-bold text-yellow-500 tracking-wide uppercase">Next Gen Logistics</span>
          </div>
          
          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 md:mb-8 leading-tight">
            Smart Courier Management,{' '}
            <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-500">
              Real-Time Tracking
            </span>
          </h1>
          
          {/* Subheading */}
          <p className="text-base md:text-lg lg:text-xl text-gray-400 mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed px-4">
            The end-to-end platform for modern logistics. Optimize your fleet, track shipments in real-time, and deliver a premium experience.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
            <Link 
              to="/dashboard" 
              className="w-full sm:w-auto h-12 md:h-14 px-6 md:px-8 rounded-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold transition-all duration-300 hover:scale-105 shadow-lg shadow-yellow-500/25 flex items-center justify-center gap-2"
            >
              Get Started <ArrowRight size={18} />
            </Link>
            <Link
              to="/tracking"
              className="w-full sm:w-auto h-12 md:h-14 px-6 md:px-8 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium backdrop-blur-sm border border-white/10 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <MapPin size={18} /> Track a Package
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 md:mt-16 flex flex-wrap items-center justify-center gap-6 md:gap-8 text-gray-500 text-xs md:text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-500" />
              <span>Free 14-day trial</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-500" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-500" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:block">
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
            <div className="w-1 h-3 bg-white/40 rounded-full animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-16 md:py-24 bg-zinc-950 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-500 mb-2">{stat.value}</div>
                <div className="text-sm md:text-base text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32 bg-black">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-20 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
              <Zap size={14} className="text-yellow-500" />
              <span className="text-xs font-bold text-yellow-500 uppercase">Features</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-white">
              Everything you need to run your logistics
            </h2>
            <p className="text-gray-400 text-base md:text-lg">
              Powerful features designed for scalability and reliability.
            </p>
          </div>
          
          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {features.map((feature, i) => (
              <div 
                key={i} 
                className="group p-6 md:p-8 rounded-2xl md:rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-yellow-500/20 hover:bg-zinc-900 transition-all duration-300"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-yellow-500/10 flex items-center justify-center mb-4 md:mb-6 group-hover:bg-yellow-500/20 group-hover:scale-110 transition-all duration-300">
                  <feature.icon size={24} className="text-yellow-500" />
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm md:text-base">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-black to-zinc-950">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
            Ready to transform your logistics?
          </h2>
          <p className="text-gray-400 text-base md:text-lg mb-8 md:mb-10 max-w-2xl mx-auto">
            Join thousands of businesses already using CourierPro to streamline their delivery operations.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/dashboard" 
              className="w-full sm:w-auto h-12 md:h-14 px-8 rounded-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold transition-all duration-300 hover:scale-105 shadow-lg shadow-yellow-500/25 flex items-center justify-center gap-2"
            >
              Start Free Trial <ArrowRight size={18} />
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto h-12 md:h-14 px-8 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium border border-white/10 transition-all duration-300 flex items-center justify-center"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 md:py-20 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-16">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4 md:mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center shadow-lg shadow-yellow-500/20">
                  <Truck size={16} className="text-black" />
                </div>
                <span className="text-lg font-bold text-white">CourierPro</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                Reimagining logistics with AI-driven solutions for the modern world.
              </p>
            </div>
            
            {/* Links */}
            <div>
              <h4 className="font-semibold mb-4 text-white text-sm">Product</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li><a href="#features" className="hover:text-yellow-400 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition-colors">API</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-white text-sm">Company</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li><a href="#" className="hover:text-yellow-400 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-white text-sm">Legal</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li><a href="#" className="hover:text-yellow-400 transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          
          {/* Bottom */}
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
            <p>&copy; 2026 CourierPro. All rights reserved.</p>
            <p>Made with ❤️ for modern logistics</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
