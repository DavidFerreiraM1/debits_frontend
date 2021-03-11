import React from 'react';
import { Field, FieldAttributes } from 'formik';
import { TextField as MuiTextField } from '@material-ui/core';

interface Props {
  name: string;
}

export function TextInput(props: Props) {
  return (
    <Field
      name={props.name}
    >
      {({ field }: FieldAttributes<any>) => {
        return (
          <MuiTextField
            {...field}
            variant="outlined"
            fullWidth
          />
        )
      }}
    </Field>
  )
}