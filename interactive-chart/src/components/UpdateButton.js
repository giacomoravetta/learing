// UpdateButton.js
import React from 'react';
import '../css/UpdateButton.css'; // Import the CSS file here

const UpdateButton = ({ onUpdate }) => {
  return <button className="update-button" onClick={onUpdate}>Run animation</button>;
};

export default UpdateButton;
