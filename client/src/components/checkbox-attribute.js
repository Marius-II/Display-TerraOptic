import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

function CheckboxAttribute({
  name,
  label,
  checked,
  onChange
}) {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={checked}
          onChange={onChange}
          name={name}
          color="primary"
        />
      }
      label={label}
      sx={{ width: 'fit-content' }}
    />
  );
}

export default CheckboxAttribute;
