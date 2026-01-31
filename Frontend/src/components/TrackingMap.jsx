import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom icons
const packageIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="#EAB308">
      <path d="M21 16.5c0 .38-.21.71-.53.88l-7.97 4.43c-.16.09-.33.14-.5.14s-.34-.05-.5-.14l-7.97-4.43c-.32-.17-.53-.5-.53-.88v-9c0-.38.21-.71.53-.88l7.97-4.43c.16-.09.33-.14.5-.14s.34.05.5.14l7.97 4.43c.32.17.53.5.53.88v9z" fill="#EAB308" stroke="#000" stroke-width="1"/>
      <path d="M12 22l-9-5V7l9 5 9-5v10l-9 5z" fill="#EAB308" stroke="#000" stroke-width="0.5" opacity="0.5"/>
      <path d="M12 12l9-5-9-5-9 5 9 5z" fill="#EAB308" stroke="#000" stroke-width="0.5"/>
    </svg>
  `),
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

// City to Coords mapping for common Indian cities
const cityCoords = {
  'Mumbai': [19.0760, 72.8777],
  'Delhi': [28.6139, 77.2090],
  'Bengaluru': [12.9716, 77.5946],
  'Bangalore': [12.9716, 77.5946],
  'Hyderabad': [17.3850, 78.4867],
  'Ahmedabad': [23.0225, 72.5714],
  'Chennai': [13.0827, 80.2707],
  'Kolkata': [22.5726, 88.3639],
  'Pune': [18.5204, 73.8567],
  'Jaipur': [26.9124, 75.7873],
  'Surat': [21.1702, 72.8311],
  'Lucknow': [26.8467, 80.9462],
  'Nagpur': [21.1458, 79.0882],
  'Indore': [22.7196, 75.8577],
  'Thane': [19.2183, 72.9781],
  'Bhopal': [23.2599, 77.4126],
  'Visakhapatnam': [17.6868, 83.2185],
  'Pimpri-Chinchwad': [18.6298, 73.7997],
  'Patna': [25.5941, 85.1376],
  'Vadodara': [22.3072, 73.1812],
  'Ghaziabad': [28.6692, 77.4538],
  'Ludhiana': [30.9010, 75.8573],
  'Coimbatore': [11.0168, 76.9558],
  'Agra': [27.1767, 78.0081],
  'Madurai': [9.9252, 78.1198],
  'Nashik': [19.9975, 73.7898],
  'Faridabad': [28.4089, 77.3178],
  'Meerut': [28.9845, 77.7064],
  'Rajkot': [22.3039, 70.8022],
  'Kalyan-Dombivli': [19.2437, 73.1350],
  'Vasai-Virar': [19.3913, 72.8397],
  'Varanasi': [25.3176, 82.9739],
  'Srinagar': [34.0837, 74.7973],
  'Aurangabad': [19.8762, 75.3433],
  'Dhanbad': [23.7957, 86.4304],
  'Gurgaon': [28.4595, 77.0266],
  'Gurugram': [28.4595, 77.0266],
  'Amritsar': [31.6340, 74.8723],
  'Andheri': [19.1136, 72.8697],
  'Bandra': [19.0522, 72.8315],
  'Koramangala': [12.9352, 77.6245],
};

const getCoords = (locationStr) => {
  if (!locationStr) return [20.5937, 78.9629]; // Center of India
  
  const cities = Object.keys(cityCoords);
  for (const city of cities) {
    if (locationStr.toLowerCase().includes(city.toLowerCase())) {
      return cityCoords[city];
    }
  }
  
  // Default to a random-ish but reasonable spot if not found
  return [20.5937, 78.9629];
};

const ChangeView = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

const TrackingMap = ({ history = [], currentStatus = '' }) => {
  const [points, setPoints] = useState([]);
  const [center, setCenter] = useState([20.5937, 78.9629]);
  const [zoom, setZoom] = useState(5);

  useEffect(() => {
    if (history && history.length > 0) {
      const getEventDate = (evt) => {
        if (!evt.timestamp) return new Date();
        if (Array.isArray(evt.timestamp)) {
          return new Date(evt.timestamp[0], evt.timestamp[1]-1, evt.timestamp[2], evt.timestamp[3], evt.timestamp[4]);
        }
        return new Date(evt.timestamp);
      };

      const sortedHistory = [...history].sort((a, b) => getEventDate(a) - getEventDate(b));
      const coords = sortedHistory.map(evt => getCoords(evt.location));
      setPoints(coords);
      
      const latestCoords = coords[coords.length - 1];
      setCenter(latestCoords);
      setZoom(8);
    }
  }, [history]);

  return (
    <div className="w-full h-full relative z-[1]">
      <MapContainer 
        center={center} 
        zoom={zoom} 
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
        attributionControl={false}
      >
        <ChangeView center={center} zoom={zoom} />
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        {points.length > 1 && (
          <Polyline 
            positions={points} 
            pathOptions={{ color: '#EAB308', weight: 3, opacity: 0.6, dashArray: '10, 10' }} 
          />
        )}

        {points.map((pos, idx) => {
          const event = history[history.length - 1 - idx];
          const eventDate = event.timestamp ? (Array.isArray(event.timestamp) ? 
            new Date(event.timestamp[0], event.timestamp[1]-1, event.timestamp[2], event.timestamp[3], event.timestamp[4]) : 
            new Date(event.timestamp)) : new Date();

          return (
            <Marker 
              key={idx} 
              position={pos} 
              icon={idx === points.length - 1 ? packageIcon : undefined}
            >
              <Popup>
                <div className="p-1">
                  <p className="font-bold text-xs uppercase text-black">{event.status.replace('_', ' ')}</p>
                  <p className="text-xs text-gray-600">{event.location}</p>
                  <p className="text-[10px] text-gray-400">{eventDate.toLocaleString()}</p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Overlay indicators */}
      <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
        <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-[10px] font-bold text-white uppercase tracking-wider">{currentStatus.replace('_', ' ')}</span>
        </div>
      </div>
    </div>
  );
};

export default TrackingMap;
