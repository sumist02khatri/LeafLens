import React, { useState } from 'react';
import Camera from './components/Camera';
import Map from './components/Map';
import PlantLogger from './components/PlantLogger';
import Suggester from './components/Suggester';
import './App.css';

function App() {
  const [image, setImage] = useState(null);
  const [species, setSpecies] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [mapCenter, setMapCenter] = useState(null);

  const handleCapture = (imageSrc, species) => {
    setImage(imageSrc);
    setSpecies(species);
  };

  const handleLog = ({ latitude, longitude }) => {
    setMapCenter([latitude, longitude]);
  };

  return (
    <div className="container">
      <h1>LeafLens: Smart Plant Mapper</h1>
      <button onClick={() => setShowMap(!showMap)}>
        {showMap ? 'Show Camera' : 'Show Map'}
      </button>
      {showMap ? (
        <div className="map-container">
          <Map center={mapCenter} />
        </div>
      ) : (
        <div className="webcam-container">
          <Camera onCapture={handleCapture} />
          {species && (
            <>
              <h3>Identified: {species}</h3>
              <PlantLogger species={species} onLog={handleLog} />
              <Suggester species={species} />
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;