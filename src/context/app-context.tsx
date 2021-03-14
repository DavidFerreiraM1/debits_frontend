/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { getAllDebits, getAllUsers } from './app-service';

interface Props {
  children?: React.ReactNode
}

const AppContext = React.createContext({
  debits: [],
  users: [],
  debitFormValue: {},
  setDebitFormValue: (value: any) => {},
  updateListDebits: () => {},
});

export function DebitContextProvider(props: Props) {
  const [value, setValue] = React.useState({
    debits: [],
    users: [],
  });

  React.useEffect(() => {
      updateListUser();
      updateListDebits();
  }, []);

  const updateListUser = () => {
    const users: any = [];
    getAllUsers()
      .then(res => {
        if (res.success && res.data) {
          users.push(...res.data);
          setValue({
            ...value,
            users,
          });
        };
      });
  }

  const updateListDebits = async () => {
    const { data, success } = await getAllDebits();

    if (success && data) {
      const debits: any = data;
      setValue({
        ...value,
        debits,
      });
    }
  }

  const [debitFormValue, setDebitFormValue] = React.useState({
    id: '',
    user: '',
    reason: '',
    debitValue: '',
    debitData: '',
  });

  return (
    <AppContext.Provider value={{
      debits: value.debits,
      users: value.users,
      debitFormValue,
      setDebitFormValue,
      updateListDebits
    }}>
      {props.children}
    </AppContext.Provider>
  )
}

export const useDebitContext = () => React.useContext(AppContext);