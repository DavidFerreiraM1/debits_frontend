import React from 'react';
import { useFormik } from 'formik';
import { Button, Grid, InputLabel, TextField as MuiTextFiled  } from '@material-ui/core';
import AutoComplete from '@material-ui/lab/Autocomplete';

import { useDebitContext } from '../../context/app-context';
import { IClientUser, IDebit } from '../../core/interfaces';
import { createDebit } from './service';
import { formatMoney } from '../../utils/form-data-format';

export function DebitForm() {
  const { users: contextUsers, updateListDebits } = useDebitContext();

  const [user, setUser] = React.useState<{ label: string, value: number }>({ label: '', value: 0 });
  const [userOptions, setUserOptions] = React.useState<{ label: string, value: number }[]>([]);

  React.useEffect(() => {
    if(contextUsers.length > 0) {
      const options: any = contextUsers.map((user: IClientUser) => {
        return ({ label: user.name, value: user.id });
      });
  
      setUserOptions(options);
    }
  }, [contextUsers]);

  const postNewDebit = async (data: IDebit) => {
    const { value } = user;
      const res = await createDebit({
        ...data,
        userId: value
      });

      if (!res.success) {
        console.log('deu ruim');
      } else {
        updateListDebits();
      }
  };

  const formik = useFormik({
    initialValues: {
      reason: '',
      debitValue: 24568,
      debitData: '',
    },
    onSubmit: (v) => {
      console.log('SUBMIT', v);
    }
  });

  return (
    <form>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <InputLabel>User</InputLabel>
          <AutoComplete
            id="users"
            options={userOptions}
            getOptionLabel={(opt) => opt.label}
            onChange={(event, { label, value }: any) => setUser({ label, value })}
            renderInput={
              (params) => <MuiTextFiled {...params} value={user} variant="outlined" fullWidth />
            }
          />
        </Grid>
        <Grid item xs={12}>
        <InputLabel>Motivo</InputLabel>
          <MuiTextFiled
            fullWidth
            variant="outlined"
            id="reason"
            name="reason"
            value={formik.values.reason}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <InputLabel>Valor</InputLabel>
          <MuiTextFiled
            fullWidth
            type="number"
            variant="outlined"
            id="debitValue"
            name="debitValue"
            value={formik.values.debitValue}
            onChange={(event) => formik.setValues({
              ...formik.values,
              debitValue: parseFloat(event.target.value),
            })}
          />
        </Grid>
        <Grid item xs={6}>
          <InputLabel>Data</InputLabel>
          <MuiTextFiled
            fullWidth
            variant="outlined"
            id="debitData"
            name="debitData"
            value={formik.values.debitData}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <Button type="submit">Ok</Button>
        </Grid>
      </Grid>
    </form>
  )
}