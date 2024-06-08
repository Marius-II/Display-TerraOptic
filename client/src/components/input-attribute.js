import React from 'react';
import TextField from '@mui/material/TextField';

function InputAttribute({
  name,
  label,
  type = 'text', // Default to 'text' type
  value,
  onChange,
  error = null,
  helperText = '',
  fullWidth = true, // Corrected to boolean
  multiline = false, // New prop for multiline
  rows = 1, // Default rows for multiline
}) {
  return (
    <TextField
      variant="outlined"
      type={type}
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      error={!!error} // Converts error to a boolean, if it's not already
      helperText={error || helperText}
      fullWidth={fullWidth}
      margin="normal"
      multiline={multiline} // Multiline prop
      rows={rows} // Number of rows for multiline
    />
  );
}

export default InputAttribute;
