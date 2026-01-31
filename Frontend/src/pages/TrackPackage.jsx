import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { Package, MapPin, Calendar, Truck, CheckCircle, Clock } from 'lucide-react';

const TrackPackage = () => {
  const { id } = useParams();
  const [pkg, setPkg] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pkgRes, historyRes] = await Promise.all([
          api.get(`/packages/track/${id}`),
          api.get(`/tracking/${id}/history`)
        ]);
        setPkg(pkgRes.data);
        setHistory(historyRes.data);
      } catch (err) {
        setError('Tracking number not found.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <div className="container" style={{ paddingTop: '4rem', textAlign: 'center' }}>Loading...</div>;
  if (error) return <div className="container" style={{ paddingTop: '4rem', textAlign: 'center', color: 'var(--error)' }}>{error}</div>;

  const formatAddress = (addr) => {
    if (!addr) return "N/A";
    return `${addr.city}, ${addr.state}`;
  };

  return (
    <div className="container" style={{ padding: '4rem 2rem' }}>
      <div className="animate-fade-in">
        <h2 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Package size={32} color="var(--accent)" />
          Tracking: {id}
        </h2>
        
        {/* Status Card */}
        <div className="card" style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Current Status</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent)' }}>{pkg.status}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Amount</div>
            <div style={{ fontSize: '1.2rem' }}>${pkg.amount}</div>
          </div>
           <div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>From</div>
            <div style={{ fontSize: '1.2rem' }}>{formatAddress(pkg.sender?.address)}</div>
          </div>
           <div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>To</div>
            <div style={{ fontSize: '1.2rem' }}>{formatAddress(pkg.receiver?.address)}</div>
          </div>
        </div>

        {/* Timeline */}
        <h3 style={{ marginBottom: '2rem' }}>Shipment Journey</h3>
        <div style={{ position: 'relative', paddingLeft: '2rem', borderLeft: '2px solid rgba(255,255,255,0.1)' }}>
          {history.length === 0 ? <p style={{color: 'var(--text-secondary)'}}>No events yet.</p> : 
          history.map((event, index) => (
            <div key={index} style={{ marginBottom: '3rem', position: 'relative' }}>
               <div style={{ 
                 position: 'absolute', 
                 left: '-2.6rem', 
                 width: '20px', 
                 height: '20px', 
                 background: index === 0 ? 'var(--accent)' : 'var(--bg-card)', 
                 border: `2px solid ${index === 0 ? 'var(--accent)' : 'var(--text-secondary)'}`,
                 borderRadius: '50%' 
               }} />
               <div style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{event.status}</div>
               <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                   <Calendar size={14} /> {new Date(event.timestamp).toLocaleDateString()}
                 </div>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                   <Clock size={14} /> {new Date(event.timestamp).toLocaleTimeString()}
                 </div>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                   <MapPin size={14} /> {event.location || "In Transit"}
                 </div>
               </div>
               {event.remarks && <p style={{ marginTop: '0.5rem', color: 'var(--text-secondary)' }}>"{event.remarks}"</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrackPackage;
