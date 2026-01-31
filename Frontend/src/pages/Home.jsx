import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, Shield, Clock, Globe } from 'lucide-react';

const Home = () => {
  const [trackingId, setTrackingId] = useState('');
  const navigate = useNavigate();

  const handleTrack = (e) => {
    e.preventDefault();
    if (trackingId.trim()) {
      navigate(`/track/${trackingId}`);
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section style={{ 
        padding: '8rem 0', 
        textAlign: 'center', 
        background: 'radial-gradient(circle at 50% 0%, #1a1a2e 0%, var(--bg-primary) 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '600px',
          background: 'var(--accent)',
          filter: 'blur(150px)',
          opacity: 0.15,
          borderRadius: '50%',
          zIndex: 0
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontSize: '4rem', fontWeight: 800, marginBottom: '1.5rem', lineHeight: 1.1 }}>
            Delivery <span className="text-gradient">Simplified.</span><br />
            Tracking <span className="accent-gradient">Perfected.</span>
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 3rem' }}>
            Experience the next generation of logistics. Real-time updates, secure OT- handshake, and seamless delivery management.
          </p>

          <form onSubmit={handleTrack} style={{ 
            maxWidth: '500px', 
            margin: '0 auto', 
            position: 'relative',
            display: 'flex',
            alignItems: 'center'
          }}>
            <Search style={{ position: 'absolute', left: '1rem', color: 'var(--text-secondary)' }} />
            <input 
              type="text" 
              placeholder="Enter your Tracking ID..." 
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              style={{ 
                paddingLeft: '3rem', 
                paddingRight: '3rem', 
                height: '60px', 
                borderRadius: '30px',
                fontSize: '1.1rem',
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(10px)'
              }}
            />
            <button type="submit" style={{ 
              position: 'absolute', 
              right: '6px', 
              height: '48px', 
              width: '48px', 
              borderRadius: '50%', 
              background: 'var(--accent)', 
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'var(--transition)'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <ArrowRight size={20} />
            </button>
          </form>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '6rem 0', background: 'var(--bg-primary)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <FeatureCard 
            icon={<Shield size={32} color="var(--accent)" />}
            title="Secure Handshake"
            description="Every delivery is authenticated with a unique OTP to ensure it reaches the right hands."
          />
          <FeatureCard 
            icon={<Clock size={32} color="#2cb67d" />}
            title="Real-time Tracking"
            description="Monitor your package's journey step-by-step with live status updates."
          />
          <FeatureCard 
            icon={<Globe size={32} color="#ff5454" />}
            title="Global Reach"
            description="Seamless logistics management across cities and borders."
          />
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="card" style={{ textAlign: 'left' }}>
    <div style={{ marginBottom: '1.5rem', background: 'rgba(255,255,255,0.03)', width: 'fit-content', padding: '1rem', borderRadius: '12px' }}>
      {icon}
    </div>
    <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{title}</h3>
    <p style={{ color: 'var(--text-secondary)' }}>{description}</p>
  </div>
);

export default Home;
