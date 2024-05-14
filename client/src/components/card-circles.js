import React from 'react';

const Circle = () => {
  return (
    <div style={{
      width: '50px', // Smaller size for multiple circles
      height: '50px',
      backgroundColor: 'transparent', // White fill color
      border: '2px solid white', // Border color for visibility
      borderRadius: '50%',
      margin: '0px' // Add margin for spacing
    }}></div>
  );
}

export default Circle;
