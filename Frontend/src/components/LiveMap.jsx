import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Hub icon
const hubIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
      <circle fill="#EAB308" cx="16" cy="16" r="14" stroke="#000" stroke-width="2"/>
      <rect fill="#000" x="10" y="10" width="12" height="10" rx="1"/>
      <rect fill="#EAB308" x="14" y="14" width="4" height="6"/>
    </svg>
  `),
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

// Delivery icon
const deliveryIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 32" width="24" height="32">
      <path fill="#22C55E" stroke="#fff" stroke-width="2" d="M12 2C7 2 3 6 3 11c0 7 9 18 9 18s9-11 9-18c0-5-4-9-9-9z"/>
      <circle fill="#fff" cx="12" cy="11" r="4"/>
    </svg>
  `),
  iconSize: [24, 32],
  iconAnchor: [12, 32],
  popupAnchor: [0, -32],
});

// Truck icon
const truckIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
      <circle fill="#EAB308" cx="20" cy="20" r="18" stroke="#000" stroke-width="2"/>
      <g transform="translate(8, 12)">
        <rect fill="#000" x="0" y="4" width="16" height="10" rx="1"/>
        <path fill="#000" d="M16 6h6l3 5v3H16z"/>
        <circle fill="#fff" cx="5" cy="14" r="2.5"/>
        <circle fill="#fff" cx="21" cy="14" r="2.5"/>
      </g>
      <circle fill="#22C55E" cx="34" cy="8" r="4" stroke="#fff" stroke-width="1.5"/>
    </svg>
  `),
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  popupAnchor: [0, -20],
});

const LiveMap = ({ 
  center = [15.5, 77.5], // Center between Bengaluru and Hyderabad
  zoom = 6,
  height = "100%",
  className = ""
}) => {
  // Hubs in Bengaluru and Hyderabad
  const hubs = [
    { id: 'hub1', position: [12.9716, 77.5946], title: 'Bengaluru Hub', city: 'Bengaluru' },
    { id: 'hub2', position: [17.3850, 78.4867], title: 'Hyderabad Hub', city: 'Hyderabad' },
  ];

  // Delivery destinations
  const destinations = [
    // Bengaluru area
    { id: 1, position: [13.0358, 77.5970], title: '#PKG-1001', city: 'Yelahanka' },
    { id: 2, position: [12.9063, 77.5857], title: '#PKG-1002', city: 'JP Nagar' },
    { id: 3, position: [12.9352, 77.6245], title: '#PKG-1003', city: 'Indiranagar' },
    { id: 4, position: [12.9783, 77.6408], title: '#PKG-1004', city: 'Whitefield' },
    // Hyderabad area
    { id: 5, position: [17.4400, 78.4982], title: '#PKG-2001', city: 'Secunderabad' },
    { id: 6, position: [17.3616, 78.4747], title: '#PKG-2002', city: 'Banjara Hills' },
    { id: 7, position: [17.4156, 78.4347], title: '#PKG-2003', city: 'Kukatpally' },
    { id: 8, position: [17.3687, 78.5247], title: '#PKG-2004', city: 'LB Nagar' },
  ];

  // Trucks with routes
  const trucks = [
    // Bengaluru trucks
    { id: 1, position: [13.0100, 77.5960], driver: 'Rajesh Kumar', order: '#AB045861', destId: 1, city: 'Bengaluru' },
    { id: 2, position: [12.9400, 77.5900], driver: 'Sunil Gowda', order: '#BC022341', destId: 2, city: 'Bengaluru' },
    { id: 3, position: [12.9500, 77.6100], driver: 'Venkat Rao', order: '#CD033421', destId: 3, city: 'Bengaluru' },
    { id: 4, position: [12.9600, 77.6300], driver: 'Kiran Shetty', order: '#DE044521', destId: 4, city: 'Bengaluru' },
    // Hyderabad trucks
    { id: 5, position: [17.4100, 78.4900], driver: 'Ravi Reddy', order: '#EF055621', destId: 5, city: 'Hyderabad' },
    { id: 6, position: [17.3750, 78.4650], driver: 'Prasad Rao', order: '#FG066721', destId: 6, city: 'Hyderabad' },
    { id: 7, position: [17.4000, 78.4500], driver: 'Naresh Kumar', order: '#GH077821', destId: 7, city: 'Hyderabad' },
    { id: 8, position: [17.3800, 78.5000], driver: 'Mahesh Reddy', order: '#HI088921', destId: 8, city: 'Hyderabad' },
  ];

  const getDestination = (destId) => destinations.find(d => d.id === destId);

  return (
    <div className={`relative overflow-hidden rounded-2xl ${className}`} style={{ height }}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
        attributionControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        
        {/* Route lines from trucks to destinations */}
        {trucks.map((truck) => {
          const dest = getDestination(truck.destId);
          return dest ? (
            <Polyline
              key={`route-${truck.id}`}
              positions={[truck.position, dest.position]}
              pathOptions={{ color: '#EAB308', weight: 3, opacity: 0.8, dashArray: '8, 8' }}
            />
          ) : null;
        })}
        
        {/* Hub markers */}
        {hubs.map((hub) => (
          <Marker key={hub.id} position={hub.position} icon={hubIcon}>
            <Popup>
              <div className="font-bold text-sm">{hub.title}</div>
              <div className="text-xs text-gray-500">{hub.city}</div>
            </Popup>
          </Marker>
        ))}

        {/* Destination markers */}
        {destinations.map((dest) => (
          <Marker key={`dest-${dest.id}`} position={dest.position} icon={deliveryIcon}>
            <Popup>
              <div className="font-bold text-sm">{dest.title}</div>
              <div className="text-xs text-gray-500">{dest.city}</div>
            </Popup>
          </Marker>
        ))}
        
        {/* Truck markers */}
        {trucks.map((truck) => (
          <Marker key={`truck-${truck.id}`} position={truck.position} icon={truckIcon}>
            <Popup>
              <div className="p-1 min-w-[150px]">
                <div className="font-bold text-sm">{truck.driver}</div>
                <div className="text-xs text-gray-600">{truck.order}</div>
                <div className="text-xs text-gray-500 mt-1">{truck.city}</div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      {/* Live badge */}
      <div className="absolute top-3 left-3 z-[1000] flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-md text-xs font-medium">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
        Live • {trucks.length} trucks
      </div>

      {/* City labels */}
      <div className="absolute bottom-3 left-3 z-[1000] flex gap-2">
        <div className="bg-white px-3 py-1.5 rounded-full shadow-md text-xs font-medium">
          🏙️ Bengaluru: 4 trucks
        </div>
        <div className="bg-white px-3 py-1.5 rounded-full shadow-md text-xs font-medium">
          🏙️ Hyderabad: 4 trucks
        </div>
      </div>
    </div>
  );
};

export default LiveMap;
