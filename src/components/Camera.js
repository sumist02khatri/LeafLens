import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

const Camera = ({ onCapture }) => {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;
    setImage(imageSrc);

    const blob = await fetch(imageSrc).then((res) => res.blob());
    const formData = new FormData();
    formData.append('file', blob, 'plant.jpg');

    try {
      const res = await axios.post('http://localhost:8000/classify', formData);
      onCapture(imageSrc, res.data.species);
    } catch (e) {
      console.error('Classification error:', e);
      onCapture(imageSrc, 'Unknown');
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = async () => {
      setImage(reader.result);
      const formData = new FormData();
      formData.append('file', file);

      try {
        const res = await axios.post('http://localhost:8000/classify', formData);
        onCapture(reader.result, res.data.species);
      } catch (e) {
        console.error('Classification error:', e);
        onCapture(reader.result, 'Unknown');
      }
    };
    if (file) reader.readAsDataURL(file);
  };

  return (
    <div>
      <h2>Capture Plant</h2>
      {image ? (
        <img src={image} alt="Captured" style={{ width: '100%', maxWidth: '400px' }} />
      ) : (
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width="100%"
          style={{ maxWidth: '400px' }}
        />
      )}
      <div>
        <button onClick={capture}>Capture</button>
        {image && <button onClick={() => setImage(null)}>Retake</button>}
        <input type="file" accept="image/*" onChange={handleFileUpload} />
      </div>
    </div>
  );
};

export default Camera;