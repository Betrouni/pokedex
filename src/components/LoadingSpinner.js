import React from 'react';

function LoadingSpinner() {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>Chargement des Pokémon...</p>
    </div>
  );
}

export default LoadingSpinner;