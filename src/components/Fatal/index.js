import React from 'react';
import '../../styles/components/Fatal.css';

export const Fatal = ({ message }) => {
  return (
    <div className="Fatal">
      {/* <h3>URL error. pardon us, we're trying to reach again your petition</h3> */}
      <p>{message}</p>
    </div>
  )
}
