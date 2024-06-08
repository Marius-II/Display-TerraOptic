import React, { useState } from 'react';
import { Card, CardContent, Typography, CardActions, Button, Box } from '@mui/material';
import Circle from './card-circles.js';
import CardSlider from './card-slider.js';

// Importing images statically
import antireflexImg from '../assets/antireflex.png';
import antistaticImg from '../assets/antistatic.png';
import blueFilterImg from '../assets/blueFilter.png';
import oleophobicImg from '../assets/oleophobic.png';
import hardeningImg from '../assets/hardening.png';
import hydrophobicImg from '../assets/hydrophobic.png';
import PriceBox from './card-price.js';
import CardTitle from './card-title.js';

const imageSources = {
    antireflex: antireflexImg,
    antistatic: antistaticImg,
    blueFilter: blueFilterImg,
    oleophobic: oleophobicImg,
    hardening: hardeningImg,
    hydrophobic: hydrophobicImg
};

function ProductCard({ product }) {
    const [sliderValue, setSliderValue] = useState(product.initialValue || 50); // Initial slider value, can be adjusted as needed

    const handleSliderChange = (event, newValue) => {
        setSliderValue(newValue);
    };

    const getImageSrc = (attribute, key) => {
        return product[attribute] > 0 ? imageSources[key] : null;
    };

    return (
        <Card sx={{
            width: 345,             // Fixed width of the card
            height: 600,            // Fixed height of the card
            m: 1,
            border: 1,
            borderColor: 'grey.300',
            borderRadius: 2,
            boxShadow: 3,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: 'black',  // Card background color
            color: 'white'             // Text color inside the card
        }}>
            <CardContent>
                <CardTitle product= {product}/>
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(5, 1fr)',
                    gap: 1,
                    backgroundColor: 'black',
                    padding: '3px',
                    marginTop: '20px',
                    marginBottom: '10px'
                }}>
                    <Circle product={product} imgSrc={getImageSrc('hardening', 'hardening')} />
                    <Circle product={product} imgSrc={getImageSrc('antireflex', 'antireflex')} />
                    <Circle product={product} imgSrc={getImageSrc('hydrophobic', 'hydrophobic')} />
                    <Box sx={{ gridColumn: 'span 2', gridRow: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <PriceBox product={product} />
                    </Box>
                    <Circle product={product} imgSrc={getImageSrc('antistatic', 'antistatic')} />
                    <Circle product={product} imgSrc={getImageSrc('blueFilter', 'blueFilter')} />
                    <Circle product={product} imgSrc={getImageSrc('oleophobic', 'oleophobic')} />
                </Box>
                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', // Ensure the content is stacked vertically
                    width: '100%',
                    alignItems: 'flex-start', // Align content to the left
                    justifyContent: 'flex-start', // Justify content to the left
                    marginTop: '5px', // Adds a margin above the Box
                    marginBottom: '10px',
                    padding: 1, // Adds padding inside the Box
                    border: '2px solid white', // Adds a white border around the Box
                    borderRadius: '10px', // Rounded corners
                    boxSizing: 'border-box' // Ensure padding and border are included in the element's width and height
                }}>
                    <Typography 
                        variant="body2" 
                        color="white"
                        sx={{
                            wordWrap: 'break-word',
                            whiteSpace: 'normal',
                            width: '100%', // Ensures the text takes the full width of the Box
                            color: product.primaryColor // Ensure description text uses the primary color
                        }}
                    >
                        {product.description}
                    </Typography>
                </Box>

                <div style={{ marginTop: '10px', marginBottom: '10px'}}><span style={{ color: '#888888' }}>PROPRIETATI</span> </div>


                <Box sx={{ '& > *': { margin: 0, padding: 0 } }}>
                    <CardSlider
                        name="hardening-slider"
                        title="DURIFICARE"
                        value={product.hardening}
                        onChange={handleSliderChange}
                        min={0}
                        max={100}
                        step={20}
                    />
                    <CardSlider
                        name="antireflex-slider"
                        title="ANTIREFLEX"
                        value={product.antireflex}
                        onChange={handleSliderChange}
                        min={0}
                        max={100}
                        step={20}
                    />
                    <CardSlider
                        name="oleophobic-slider"
                        title="OLEOFOB"
                        value={product.oleophobic}
                        onChange={handleSliderChange}
                        min={0}
                        max={100}
                        step={20}
                    />
                    <CardSlider
                        name="hydrophobic-slider"
                        title="HIDROFOB"
                        value={product.hydrophobic}
                        onChange={handleSliderChange}
                        min={0}
                        max={100}
                        step={20}
                    />
                    <CardSlider
                        name="antistatic-slider"
                        title="ANTISTATIC"
                        value={product.antistatic}
                        onChange={handleSliderChange}
                        min={0}
                        max={100}
                        step={20}
                    />
                    <CardSlider
                        name="comfort-slider"
                        title="CONFORT"
                        value={product.comfort}
                        onChange={handleSliderChange}
                        min={0}
                        max={100}
                        step={20}
                    />
                </Box>

                <div style={{ marginTop: '10px' }}>
                    <div><span style={{ color: '#888888' }}>Personalizare:</span> {product.customization ? 'DA' : 'NU'}</div>
                    <div style={{ marginTop: '3px' }}><span style={{ color: '#888888' }}>Timp de livrare:</span> {product.deliveryTime}</div>
                </div>

            </CardContent>
            <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button size="small" sx={{ color: product.primaryColor }}>Save</Button>
                <Button size="small" sx={{ color: product.primaryColor }}>Details</Button>
            </CardActions>
        </Card>
    );
}

export default ProductCard;
