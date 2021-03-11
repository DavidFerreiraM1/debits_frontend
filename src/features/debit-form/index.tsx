import React from 'react';
import { Form, Formik } from 'formik';
import { Button, Grid, InputLabel, TextField as MuiTextFiled  } from '@material-ui/core';
import AutoComplete from '@material-ui/lab/Autocomplete';
import { TextInput } from '../../components/form/text-input';
import { useDebitContext } from '../../context/app-context';
import { IClientUser, IDebit } from '../../core/interfaces';
import { createDebit } from './service';

export function DebitForm() {
  const { users: contextUsers, updateListDebits } = useDebitContext();

  const [user, setUser] = React.useState<{ label: string, value: number }>({ label: '', value: 0 });
  const [userOptions, setUserOptions] = React.useState<{ label: string, value: number }[]>([]);

  React.useEffect(() => {
    if(contextUsers.length) {
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

  return (
    <Formik
      initialValues={{
        reason: '',
        debitValue: '',
        debitData: '',
      }}
      onReset={(val) => {
        val.debitData = ''
      }}
      onSubmit={(val) => {
        postNewDebit({
          reason: val.reason,
          debitValue: parseInt(val.debitValue),
          debitDate: val.debitData,
          userId: user.value
        });
      }}
    >
      <Form>
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
            <TextInput
              name="reason"
            />
          </Grid>
          <Grid item xs={6}>
            <InputLabel>Valor</InputLabel>
            <TextInput
              name="debitValue"
            />
          </Grid>
          <Grid item xs={6}>
            <InputLabel>Data</InputLabel>
            <TextInput
              name="debitData"
            />
          </Grid>
          <Grid item xs={6}>
            <Button type="submit">Ok</Button>
          </Grid>
        </Grid>
      </Form>
    </Formik>
  )
}