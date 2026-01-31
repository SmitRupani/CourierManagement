import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Bell, Settings, ChevronDown, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Topbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = React.useState(false);
  
  return (
    <header className="h-14 md:h-16 border-b border-white/5 bg-black flex items-center justify-between px-4 md:px-6 flex-shrink-0">
      {/* Left Side */}
      <div className="flex items-center gap-4">
        <div className="w-10 lg:hidden"></div>
        <h1 className="text-white font-semibold text-base md:text-lg hidden md:block">Overview</h1>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Search - Desktop */}
        <div className="hidden lg:block relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-zinc-900 border border-white/10 text-sm text-white pl-10 pr-4 py-2.5 rounded-xl outline-none focus:border-yellow-500/50 transition-all placeholder-gray-600"
          />
        </div>

        {/* Mobile Search */}
        <button className="lg:hidden w-9 h-9 rounded-xl bg-zinc-900 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
          <Search size={18} />
        </button>

        {/* Divider */}
        <div className="hidden md:block h-8 w-px bg-white/10 mx-1"></div>

        {/* Notifications */}
        <Link to="/notifications" className="w-9 h-9 rounded-xl bg-zinc-900 flex items-center justify-center text-gray-400 hover:text-white transition-colors relative">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-yellow-500 rounded-full border-2 border-black"></span>
        </Link>
        
        {/* Settings */}
        <Link to="/settings" className="hidden md:flex w-9 h-9 rounded-xl bg-zinc-900 items-center justify-center text-gray-400 hover:text-white transition-colors">
          <Settings size={18} />
        </Link>

        {/* Divider */}
        <div className="hidden md:block h-8 w-px bg-white/10 mx-1"></div>

        {/* User Profile */}
        <div className="relative">
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 md:gap-3 hover:bg-zinc-900 px-2 md:px-3 py-1.5 rounded-xl transition-colors group"
          >
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-black font-bold text-xs shadow-lg shadow-yellow-500/20">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="hidden md:block text-left">
              <div className="text-sm font-medium text-white">{user?.name || 'User'}</div>
              <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{user?.role || 'Member'}</div>
            </div>
            <ChevronDown size={14} className={`hidden md:block text-gray-500 group-hover:text-white transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
          </button>

          {showDropdown && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowDropdown(false)}></div>
              <div className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-white/10 rounded-xl shadow-2xl py-2 z-20 overflow-hidden">
                <Link 
                  to="/settings" 
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                  onClick={() => setShowDropdown(false)}
                >
                  <Settings size={16} />
                  <span>Profile Settings</span>
                </Link>
                <div className="h-px bg-white/5 my-1"></div>
                <button 
                  onClick={() => {
                    logout();
                    setShowDropdown(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-colors"
                >
                  <LogOut size={16} />
                  <span>Log Out</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
