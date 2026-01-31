import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Package, User, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={{ 
      background: 'rgba(10, 10, 12, 0.8)', 
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '80px' }}>
        
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '1.5rem', fontWeight: 'bold' }}>
          <div style={{ 
            background: 'var(--accent)', 
            padding: '8px', 
            borderRadius: '12px',
            display: 'flex'
          }}>
            <Package color="white" size={24} />
          </div>
          <span>Courier<span style={{ color: 'var(--accent)' }}>Pro</span></span>
        </Link>

        {/* Desktop Menu */}
        <div className="desktop-menu" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link to="/" style={{ color: 'var(--text-secondary)' }}>Track</Link>
          
          {user ? (
            <>
              <Link to="/dashboard" style={{ color: 'var(--text-secondary)' }}>Dashboard</Link>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Hi, {user.name || user.email}</span>
                <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" style={{ color: 'var(--text-primary)' }}>Login</Link>
              <Link to="/register" className="btn btn-primary">Get Started</Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)} style={{ display: 'none', background: 'transparent' }}>
          {isOpen ? <X color="white" /> : <Menu color="white" />}
        </button>
      </div>
      
      {/* Mobile Menu (Hidden by default via CSS but structure here for simplicity) */}
      {/* I'll use media queries in the style tag or separate CSS file for responsiveness. 
          For now, keeping it simple desktop-focused as per usual agent patterns unless requested otherwise. 
      */}
    </nav>
  );
};

export default Navbar;
