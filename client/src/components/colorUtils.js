// colorUtils.js

export const colorOptions = [
    { value: 'hsl(0, 0%, 100%)', label: 'alb' }, // White
    { value: 'hsl(30, 100%, 87%)', label: 'crem' }, // Cream
    { value: 'hsl(60, 100%, 50%)', label: 'galben' }, // Yellow
    { value: 'hsl(0, 0%, 100%)', label: 'roz' }, // Pink
    { value: 'hsl(30, 100%, 50%)', label: 'orange' }, // Orange
    { value: 'hsl(240, 100%, 70%)', label: 'albastru' }, // Blue
    { value: 'hsl(120, 100%, 50%)', label: 'verde' }, // Green
    { value: 'hsl(45, 100%, 55%)', label: 'mustar' }, // Mustard
    { value: 'hsl(0, 0%, 50%)', label: 'gri' }, // Gray
    { value: 'linear-gradient(135deg, #b0b0b0 25%, #ffffff 50%, #b0b0b0 75%)', label: 'silver' }, // Shining Silver
    { value: 'linear-gradient(135deg, #ffd700 25%, #fffacd 50%, #ffd700 75%)', label: 'gold' }, // Shining Gold
    { value: 'hsl(270, 100%, 50%)', label: 'violet' }, // Violet
];

export const getHSLValue = (colorLabel) => {
    const color = colorOptions.find(option => option.label === colorLabel);
    return color ? color.value : 'hsl(0, 0%, 100%)'; // Default to white if not found
}
