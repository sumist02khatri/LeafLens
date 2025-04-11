import React, { useEffect } from 'react';
import axios from 'axios';
import { getLocation } from '../utils/geolocation';

const PlantLogger = ({ species, onLog }) => {
  useEffect(() => {
    if (species) {
      logPlant();
    }
  }, [species]);

  const logPlant = async () => {
    try {
      const { latitude, longitude } = await getLocation();
      // Create FormData object to match FastAPI's Form expectation
      const formData = new FormData();
      formData.append('species', species);
      formData.append('latitude', latitude);
      formData.append('longitude', longitude);

      const res = await axios.post('http://localhost:8000/log', formData);
      onLog({ latitude, longitude });
      console.log('Plant logged:', res.data);
    } catch (e) {
      console.error('Logging error:', e);
      const mockLat = 37.7749;
      const mockLng = -122.4194;
      // Fallback: Send mock data as FormData
      const formData = new FormData();
      formData.append('species', species);
      formData.append('latitude', mockLat);
      formData.append('longitude', mockLng);

      const res = await axios.post('http://localhost:8000/log', formData);
      onLog({ latitude: mockLat, longitude: mockLng });
      console.log('Plant logged with mock location:', res.data);
    }
  };

  return null;
};

export default PlantLogger;