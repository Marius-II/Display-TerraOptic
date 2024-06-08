import React from 'react';

const CardTitle = ({ product }) => {
  const primaryColor = product?.primaryProductColor || 'white';
  const isGradient = primaryColor.includes('linear-gradient');
  const borderColor = isGradient ? 'black' : primaryColor; // Fallback to black or any solid color

  return (
    <div style={{
      padding: '10px', // Combined padding
      border: `2px solid ${borderColor}`, // Set border color, fallback if gradient
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: primaryColor, // Use the product's primary color for background
      color: 'black', // Text color for contrast
      fontSize: '20px', // Larger font size
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', // Subtle shadow for a 3D effect
      gridColumn: 'span 5', // Span five columns in the grid
      gridRow: 'span 1', // Span one row in the grid
      margin: '0', // Remove any default margin
      boxSizing: 'border-box', // Ensure padding and border are included in the element's total width and height
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 10% 100%)', // Oblique left edge
    }}>
      {product.productName}
    </div>
  );
}

export default CardTitle;
