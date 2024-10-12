import React from 'react';
import '../difficultySelector.css';

const DifficultySelector = ({ value, onChange }) => {
  return (
    <div className="difficulty-selector">
      <div className="difficulty-options">
        <input
          type="radio"
          id="easy"
          name="difficulty"
          value="easy"
          checked={value === 'easy'}
          onChange={onChange}
        />
        <label className={`fancy-container ${value === 'easy' ? 'selected' : ''}`} htmlFor="easy">
          Easy
        </label>

        <input
          type="radio"
          id="medium"
          name="difficulty"
          value="medium"
          checked={value === 'medium'}
          onChange={onChange}
        />
        <label className={`fancy-container ${value === 'medium' ? 'selected' : ''}`} htmlFor="medium">
          Medium
        </label>

        <input
          type="radio"
          id="hard"
          name="difficulty"
          value="hard"
          checked={value === 'hard'}
          onChange={onChange}
        />
        <label className={`fancy-container ${value === 'hard' ? 'selected' : ''}`} htmlFor="hard">
          Hard
        </label>
      </div>
    </div>
  );
};

export default DifficultySelector;