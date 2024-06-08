import React from 'react';

const Circle = ({ product, imgSrc }) => {
  const secondaryColor = product?.secondaryProductColor || 'hsl(0, 0%, 50%)'; // Default to gray if undefined
  const primaryColor = product?.primaryProductColor || 'hsl(0, 0%, 50%)'
  const isGradient = primaryColor.includes('linear-gradient');
  let borderColor = secondaryColor;

  if (isGradient) {
    if (primaryColor === 'linear-gradient(135deg, #ffd700 25%, #fffacd 50%, #ffd700 75%)') {
      borderColor = 'hsl(60, 100%, 75%)'; // Light opened yellow for gold gradient
    } else if (primaryColor === 'linear-gradient(135deg, #b0b0b0 25%, #ffffff 50%, #b0b0b0 75%)') {
      borderColor = 'hsl(180, 100%, 50%)'; // Specific turquoise for silver gradient
    } else {
      borderColor = 'hsl(174, 100%, 80%)'; // Light beautiful turquoise for other gradients
    }
  }

  return (
    <div style={{
      width: '50px', // Circle diameter
      height: '50px',
      backgroundColor: 'transparent', // Transparent fill color
      border: `2px solid ${borderColor}`, // Set border color, fallback if gradient
      borderRadius: '50%', // Makes the div a circle
      margin: '0px', // Margin for spacing
      overflow: 'hidden', // Ensures the image fits within the circle
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {imgSrc ? <img src={imgSrc} alt="" style={{ width: '45%', height: '45%', marginTop: '20%' }} /> : null}
    </div>
  );
}

export default Circle;
