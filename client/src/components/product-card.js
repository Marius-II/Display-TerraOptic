import React from 'react';
import { Card, CardContent, Typography, CardActions, Button, Box } from '@mui/material';
import Circle from './card-circles.js';

function ProductCard({ product }) {
    return (
        <Card sx={{
            width: 345,             // Fixed width of the card
            height: 400,            // Fixed height of the card
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
                <Typography gutterBottom variant="h5" component="div" sx={{ color: 'white' }}>
                    {product.productName}
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 1, backgroundColor: 'black', padding: '3px' }}>
                    <Circle />
                    <Circle />
                    <Circle />
                    ${product.price}
                </Box>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 1, backgroundColor: 'black', padding: '3px' }}>
                    <Circle />
                    <Circle />
                    <Circle />
                    ${product.price}
                </Box>
                <Typography variant="body2" color="white">
                    {product.description}
                </Typography>

            </CardContent>
            <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button size="small" sx={{ color: 'white' }}>Save</Button>
                <Button size="small" sx={{ color: 'white' }}>Details</Button>
            </CardActions>
        </Card>
    );
}

export default ProductCard;
