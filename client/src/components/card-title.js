import React, { useEffect, useState } from 'react';
import { getHSLValue } from './colorUtils'; // Adjust the path as needed

const CardTitle = ({ product }) => {
  const [fontSize, setFontSize] = useState('20px');

  useEffect(() => {
    const calculateFontSize = (text) => {
      const baseSize = 35; // Base font size for short text
      const minSize = 15;  // Minimum font size
      const maxSize = 20;  // Maximum font size
      const maxLength = 35; // Length at which font size should be minimum

      if (text.length > maxLength) {
        return `${minSize}px`;
      } else {
        const size = baseSize - (text.length / maxLength) * (baseSize - minSize);
        return `${Math.max(minSize, Math.min(maxSize, size))}px`;
      }
    };

    setFontSize(calculateFontSize(product.productName));
  }, [product.productName]);

  const primaryColorLabel = product?.primaryProductColor || 'alb';
  const primaryColor = getHSLValue(primaryColorLabel);
  const isGradient = primaryColor.includes('linear-gradient');
  const borderColor = isGradient ? 'black' : primaryColor; // Fallback to black or any solid color

  return (
    <div style={{
      padding: '10px', // Combined padding
      paddingLeft: '30px', // Adjusted padding to move text to the right
      borderRadius: '10px',
      border: `2px solid ${borderColor}`, // Set border color, fallback if gradient
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: primaryColor, // Use the product's primary color for background
      color: 'black', // Text color for contrast
      fontSize: fontSize, // Dynamic font size based on text length
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', // Subtle shadow for a 3D effect
      gridColumn: 'span 5', // Span five columns in the grid
      gridRow: 'span 1', // Span one row in the grid
      margin: '0', // Remove any default margin
      boxSizing: 'border-box', // Ensure padding and border are included in the element's total width and height
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 10% 100%)', // Oblique left edge
      width: '100%', // Ensure the width is fixed
      height: '50px' // Ensure the height is fixed
    }}>
      {product.productName}
    </div>
  );
}

export default CardTitle;
