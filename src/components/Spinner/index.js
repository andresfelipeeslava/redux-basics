import React from 'react';
import '../../styles/components/Spinner.css';

export const Spinner = () => (
  <div className="Spinner">
    <h3>Cargando</h3>
    <div className="lds-grid">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);
