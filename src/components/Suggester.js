import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getLocation } from '../utils/geolocation';

const Suggester = ({ species }) => {
  const [suggestion, setSuggestion] = useState(null);

  useEffect(() => {
    if (species) {
      suggestTree();
    }
  }, [species]);

  const suggestTree = async () => {
    try {
      const { latitude, longitude } = await getLocation();
      const formData = new FormData();
      formData.append('latitude', latitude);
      formData.append('longitude', longitude);
      const res = await axios.post('http://localhost:8000/suggest', formData);
      setSuggestion(res.data.suggestion);
    } catch (e) {
      console.error('Suggestion error:', e);
      setSuggestion('Pine');
    }
  };

  return suggestion && <h3>Suggested for Reforestation: {suggestion}</h3>;
};

export default Suggester;