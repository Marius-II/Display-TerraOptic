import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function DropdownAttribute({
  name,
  label,
  value,
  onChange,
  options,  // options should be an array of { value, label }
  fullWidth = true
}) {
  return (
    <FormControl fullWidth={fullWidth} margin="normal">
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        onChange={onChange}
        label={label}
        name={name}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default DropdownAttribute;
