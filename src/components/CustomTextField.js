import React from 'react';
import TextField from '@mui/material/TextField';

function CustomTextField(props) {
  const { id, name, label, value, error, touched, onChange, onBlur, helperText } = props;

  return (
    <TextField
      fullWidth
      id={id}
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={touched && !!error}
      helperText={touched && error}
    {...props}

    />
  );
}

export default CustomTextField;
