/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import { useFormik } from 'formik';
import { Button, Box, FormHelperText, Grid, InputLabel, TextField as MuiTextFiled  } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import AutoComplete from '@material-ui/lab/Autocomplete';

import 'date-fns';
import format from "date-fns/format";
import DateFnsUtils from '@date-io/date-fns';
import brlocale from 'date-fns/locale/pt-BR';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { KeyboardDatePicker } from '@material-ui/pickers';

import { useDebitContext } from '../../context/app-context';
import { IClientUser, IDebit } from '../../core/interfaces';
import { createDebit, getDebitById, updateDebit } from './service';
import { formatMoney } from '../../utils/form-data-format';
import { debitFormValidation } from './validation';
import { formStyles } from './styles';

class BrLocalizeUtil extends DateFnsUtils {
  getDatePickerHeaderText(date: any) {
    return format(date, "d MMM yyyy", { locale: this.locale });
  }
}

export function DebitForm() {
  const styles = formStyles();
  const [renderAlert, setRenderAlert] = React.useState<{
    severity: 'success' | 'error' | 'info' | 'warning' ,
    text: string,
    render: boolean
  }>({
    severity: 'success',
    text: '',
    render: false
  });

  const handlerRenderAlert = (
    severity: 'success' | 'error' | 'info' | 'warning' ,
    text: string,
  ) => {
    setRenderAlert({
      severity,
      text,
      render: true
    });
  }

  React.useEffect(() => {
    if (renderAlert.render) {
      setTimeout(() => {
        setRenderAlert({
          ...renderAlert,
          render: false
        })
      }, 2400);
    }
  }, [renderAlert]);

  const { idDebitToUpdate, setIdDebitToUpdate, users } = useDebitContext();
  React.useEffect(() => {
    const getDebit = async () => {
      if (idDebitToUpdate) {
        const { success, data } = await getDebitById(parseInt(idDebitToUpdate));
        if (data && success) {
          const getUser = (id: number) => {
            return users.find((usr: IClientUser) => usr.id === id);
          };
          const user: any = getUser(data.userId);
          formik.setValues({
            ...data,
            user: { label: user.name, value: user.id },
            debitValue: formatMoney(data.debitValue.toString()),
            debitDate: new Date(data.debitDate),
          });
        }
      }
    }

    if (idDebitToUpdate) {

      getDebit();
    } else {
      formik.resetForm();
    }
  
  }, [idDebitToUpdate]);

  const { users: contextUsers, updateListDebits } = useDebitContext();
  const [userOptions, setUserOptions] = React.useState<{ label: string, value: number }[]>([]);

  const formik = useFormik({
    initialValues: {
      user: { label: '', value: 0 },
      reason: '',
      debitValue: 'R$ 0,00',
      debitDate: new Date(),
    },
    validationSchema: debitFormValidation,
    validateOnChange: false,
    onSubmit: (values: any) => {
      postNewDebit({
        ...values,
        userId: values.user.value,
      });
    }
  });

  const postNewDebit = async (data: IDebit) => {
      const values: IDebit = {
        ...data,
        debitValue: parseFloat(
          data.debitValue
          .toString()
          .trim()
          .replace('R$', '')
          .replaceAll('.', '')
          .replaceAll(',', '')
        ),
        debitDate: format(new Date(data.debitDate), 'yyyy-MM-dd')
      }
      if (idDebitToUpdate) {
        const { success } = await updateDebit(parseInt(idDebitToUpdate), {...values});
        if (success) {
          formik.resetForm();
          updateListDebits();
          setIdDebitToUpdate('');
          handlerRenderAlert('success', 'As informações da dívida foram atualizadas!');
        } else {
          handlerRenderAlert('error', 'Não foi possível atualizar os dados da dívida!');
        }
      } else {
        const res = await createDebit({...values});
        if (!res.success) {
          handlerRenderAlert('error', 'Não foi possível salvar a dívida!');
        } else {
          formik.resetForm();
          updateListDebits();
          handlerRenderAlert('success', 'Dívida salva com sucesso!');
        }
      }

  };

  const cancelForm = () => {
    setIdDebitToUpdate('');
    formik.resetForm()
  }

  React.useEffect(() => {
    if(contextUsers.length > 0) {
      const options: any = contextUsers.map((user: IClientUser) => {
        return ({ label: user.name, value: user.id });
      });
  
      setUserOptions(options);
    }
  }, [contextUsers]);

  return (
    <form>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <InputLabel>User</InputLabel>
          <AutoComplete
            id="users"
            options={userOptions}
            getOptionLabel={(opt) => opt.label}
            getOptionSelected={(opt, val) => opt.value === val.value}
            onChange={(event, param: any) => {
              if (!param) {
                formik.setValues({
                  ...formik.values,
                  user: { label: '', value: 0 }
                });
              } else {
                formik.setValues({
                  ...formik.values,
                  user: { label: param.label, value: param.value }
                });
              }
            }}
            value={formik.values.user}
            renderInput={
              (params) => <MuiTextFiled {...params} variant="outlined" fullWidth />
            }
          />
          <FormHelperText id="user-errors">{formik.errors.user?.label}</FormHelperText>
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
          <FormHelperText id="reason-errors">{formik.errors.reason}</FormHelperText>
        </Grid>
        <Grid item xs={6}>
          <InputLabel>Valor</InputLabel>
          <MuiTextFiled
            fullWidth
            variant="outlined"
            id="debitValue"
            name="debitValue"
            value={formik.values.debitValue}
            onChange={(event) => formik.setValues({
              ...formik.values,
              debitValue: formatMoney(event.target.value),
            })}
          />
          <FormHelperText id="debitValue-errors">{formik.errors.debitValue}</FormHelperText>
        </Grid>
        <Grid item xs={6}>
          <MuiPickersUtilsProvider utils={BrLocalizeUtil} locale={brlocale}>
          <InputLabel>Data</InputLabel>
            <KeyboardDatePicker
              id="debitDdate"
              name="debitDate"
              disableToolbar
              fullWidth
              variant="dialog"
              size="medium"
              inputVariant="outlined"
              format="dd/MM/yyyy"
              margin="none"
              value={formik.values.debitDate}
              onChange={(date: any) => {
                formik.setValues({
                  ...formik.values,
                  debitDate: date
                });
              }}
            />
          </MuiPickersUtilsProvider>
          <FormHelperText id="debitDate-errors">{formik.errors.debitDate}</FormHelperText>
        </Grid>
        <Grid item xs={12}>
          <Box
            component="div"
            display="flex"
            justifyContent="flex-end"
          >
            <Box padding="0 8px">
              <Button
                variant="outlined"
                color="primary"
                onClick={cancelForm}
              >
                cancelar
              </Button>
            </Box>
            <Box paddingLeft="8px">
              <Button
                variant="contained"
                color="primary"
                onClick={() => formik.handleSubmit()}
                >
                { idDebitToUpdate ? 'Atualizar' : 'Concluir' }
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      {
        renderAlert.render && (
          <Alert className={styles.alert} severity={renderAlert.severity}>
            <AlertTitle>{renderAlert.severity ? 'Sucesso' : 'Erro'}</AlertTitle>
            {renderAlert.text}
          </Alert>
        )
      }
    </form>
  )
}