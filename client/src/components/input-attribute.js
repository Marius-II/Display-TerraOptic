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
  fullWidth = "true"
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

    />
  );
}

export default InputAttribute;
