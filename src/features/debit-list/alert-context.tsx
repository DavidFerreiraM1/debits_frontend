import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import { styles } from './styles';

interface Props {
  children?: React.ReactNode;
}

const AlertContext = React.createContext<{
  handleRenderAlert: (
  severity: 'success' | 'info' | 'warning' | 'error',
  text: string,
 ) => void
}>({
  handleRenderAlert: (
    severity: 'success' | 'info' | 'warning' | 'error',
    text: string,
   ) => {}
});

export function AlertContextProvider(props: Props) {
  const classes = styles();
  const [renderAlert, setRenderAlert] = React.useState<{
    severity: 'success' | 'info' | 'warning' | 'error',
    text: string,
    render: boolean,
  }>({
    severity: 'success',
    text: '',
    render: false
  });

  const handleRenderAlert = (
    severity: 'success' | 'info' | 'warning' | 'error',
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

  return (
    <AlertContext.Provider value={{
      handleRenderAlert,
    }}>
      {props.children}
      <React.Fragment>
      {
          renderAlert.render && (
            <Alert className={classes.alert} severity={renderAlert.severity}>
              <AlertTitle>{renderAlert.severity ? 'Sucesso' : 'Erro'}</AlertTitle>
              {renderAlert.text}
            </Alert>
          )
        }
      </React.Fragment>
    </AlertContext.Provider>
  )
}

export const useAlertContext = () => React.useContext(AlertContext);
