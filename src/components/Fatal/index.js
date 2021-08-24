import React from 'react';
import '../../styles/components/Fatal.css';

export const Fatal = (props) => {
  return (
    <div className="Fatal">
      <h3>URL error. pardon us, we're trying to reach again your petition</h3>
      <p>{props.message}</p>
    </div>
  )
}
