import React from 'react';
import { Typography, Slider, Box } from '@mui/material';

function CardSlider({ name, title, value, onChange, min, max, step }) {
    return (
        <div style={{ 
            marginTop: '1px',
            width: '100%',
            padding: '0px',
            }}>
            <Box
                display="flex"
                alignItems="center"
                sx={{
                    mb: 0, // shorthand for marginBottom using Material-UI's system properties
                    '&:not(:last-child)': {
                        mb: 0 // Reduces bottom margin except for the last item
                    }
                }}
                width="100%"
            >
                <Typography 
                    id={`slider-${title}`} 
                    gutterBottom 
                    sx={{ 
                        marginRight: 0, 
                        minWidth: '120px', 
                        color: '#ffffff', // Bright white text color
                    }}
                >
                    {title}
                </Typography>
                <Slider
                    name={name}
                    value={value}
                    step={step}
                    marks
                    min={min}
                    max={max}
                    onChange={onChange}
                    sx={{
                        color: '#ffeb3b', // Bright yellow slider color
                        '& .MuiSlider-thumb': {
                            backgroundColor: '#fff', // White slider thumb
                            width: 8,
                            height: 8,
                            borderRadius: 0, // Makes the thumb square
                        },
                        '& .MuiSlider-track': {
                            backgroundColor: '#ffeb3b', // Yellow slider track
                        },
                        '& .MuiSlider-rail': {
                            backgroundColor: '#ccc', // Light gray slider rail
                        }
                    }}
                />
                <Typography 
                    gutterBottom 
                    sx={{ 
                        marginLeft: '20px', 
                        color: '#ffffff' // Bright white text color
                    }}
                >
                    {value}
                </Typography>
            </Box>
        </div>
    );
}

export default CardSlider;
