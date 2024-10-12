import React from 'react';
import '../checkbox.css'; // Create this CSS file for styling

const TimedQuizCheckbox = ({ checked, onChange }) => {
  return (
    <div className="checkbox-container">
      <input 
        type="checkbox" 
        id="timed-quiz" 
        checked={checked} 
        onChange={onChange} 
        className="custom-checkbox"
      />
      <label className={`fancy-container ${checked ? 'checked' : ''}`} htmlFor="timed-quiz"></label>
    </div>
  );
};

export default TimedQuizCheckbox;
