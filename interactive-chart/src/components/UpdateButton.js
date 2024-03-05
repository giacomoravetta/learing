// UpdateButton.js
import React from 'react';
import '../css/UpdateButton.css';

const UpdateButton = ({ onUpdate }) => {
  return <button className="update-button" onClick={onUpdate}>Run animation</button>;
};

export default UpdateButton;
