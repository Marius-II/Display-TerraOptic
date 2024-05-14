import React, { useState } from 'react';
import { Typography, Slider, Box } from '@mui/material';

function SliderAttribute({ name, title, value, onChange, min, max, step }) {



    return (
        <div className='slider-container'>
            <Box
                display="flex"
                alignItems="center"
                sx={{
                    mb: 1, // shorthand for marginBottom using Material-UI's system properties
                    '&:not(:last-child)': {
                        mb: 1 // Reduces bottom margin except for the last item
                    }
                }}
                width="100%"
            >
                <Typography id={`slider-${title}`} gutterBottom sx={{ marginRight: 2, minWidth: '150px' }}>
                    {title}:
                </Typography>
                <Slider
                    name = {name}
                    value = {value}
                    step = {step}
                    marks
                    min = {min}
                    max = {max}
                    onChange = {onChange}

                />
                <Typography gutterBottom marginLeft={1}>{value}</Typography>
            </Box>
        </div>

    );
}

export default SliderAttribute;
