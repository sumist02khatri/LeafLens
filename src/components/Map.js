import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';

// Fix Leaflet marker icon issue (this is fine at top level as it's not a Hook)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const Map = ({ center }) => {
  const [plants, setPlants] = useState([]);
  const defaultCenter = center || [37.7749, -122.4194]; // Mock: San Francisco
  const defaultZoom = 10;

  // Load Leaflet CSS dynamically inside the component
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    link.crossOrigin = '';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link); // Cleanup on unmount
    };
  }, []); // Empty dependency array: runs once on mount

  // Fetch plants from backend
  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const res = await axios.get('http://localhost:8000/plants');
        setPlants(res.data);
      } catch (e) {
        console.error('Error fetching plants:', e);
        setPlants([]);
      }
    };
    fetchPlants();
  }, []);

  // Force map resize to fix rendering issues
  useEffect(() => {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
  }, []);

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {plants.map((plant, i) => (
          <Marker key={i} position={[plant.latitude, plant.longitude]}>
            <Popup>{plant.species}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;