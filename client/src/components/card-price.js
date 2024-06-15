import React from 'react';
import { getHSLValue } from './colorUtils'

const PriceBox = ({ product }) => {
  const primaryColorLabel = product?.primaryProductColor || 'alb';
  const primaryColor = getHSLValue(primaryColorLabel);
  const isGradient = primaryColor.includes('linear-gradient');
  const borderColor = isGradient ? 'white' : primaryColor; // Fallback to black or any solid color

  return (
    <div style={{
      padding: '10px', // Combined padding
      borderRadius: '10px', // Rounded corners
      border: `2px solid ${borderColor}`, // Set border color, fallback if gradient
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: borderColor, // White text color for contrast
      fontSize: '45px', // Larger font size
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', // Subtle shadow for a 3D effect
      gridColumn: 'span 2', // Span two columns in the grid
      gridRow: 'span 2', // Span two rows in the grid
      height: '120px', // Fixed height of the grid cell
      width: '110px', // Fixed width of the grid cell
      margin: '0', // Remove any default margin
      boxSizing: 'border-box', // Ensure padding and border are included in the element's total width and height
    }}>
      {product.price}
    </div>
  );
}

export default PriceBox;
