// colorUtils.js

export const colorOptions = [
    { value: '#FFFFFF', label: 'alb' }, // White
    { value: '#FFF9D4', label: 'crem' }, // crem deschis vision
    { value: '#FFEE8B', label: 'galben' }, // galben vision+
    { value: '#F5C4C2', label: 'roz' }, // roz onyx
    { value: '#FA928E', label: 'roz2' }, // roz onyx plus
    { value: '#66D171', label: 'verdeEmerald' }, // verde emerald
    { value: '#BCC89B', label: 'verdeColor' }, // verde emerald
    { value: '#00A759', label: 'verdeBifocal' }, // verde emerald
    { value: '#BCD800', label: 'verdeBifocalInvisible' }, // verde emerald
    { value: '#F27E00', label: 'orange' }, // Orange
    { value: '#00A3D4', label: 'albastru' }, // albastru blue
    { value: '#FBE116', label: 'mustar' }, // galben mustar uniq
    { value: '#BA77D3', label: 'violet' }, // violet retina drive
    { value: '#D9D9DA', label: 'gri' }, // gri retina


    { value: 'linear-gradient(135deg, #b0b0b0 25%, #ffffff 50%, #b0b0b0 75%)', label: 'silver' }, // Shining Silver
    { value: 'linear-gradient(135deg, #ffd700 25%, #fffacd 50%, #ffd700 75%)', label: 'gold' }, // Shining Gold

];

export const getHSLValue = (colorLabel) => {
    const color = colorOptions.find(option => option.label === colorLabel);
    return color ? color.value : 'hsl(0, 0%, 100%)'; // Default to white if not found
}
