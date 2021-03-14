/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { IClientUser, IDebit } from '../core/interfaces';
import { getAllDebits, getAllUsers } from './app-service';

interface Props {
  children?: React.ReactNode
}

const AppContext = React.createContext<{
  debits: IDebit[];
  users: IClientUser[]; 
  debitFormValue: {};
  setDebitFormValue: (value: any) => void,
  updateListDebits: () => void,
}>({
  debits: [],
  users: [],
  debitFormValue: {},
  setDebitFormValue: (value: any) => {},
  updateListDebits: () => {},
});

export function DebitContextProvider(props: Props) {
  const [value, setValue] = React.useState<{
    debits: IDebit[];
    users: IClientUser[];
  }>({
    debits: [],
    users: []
  });

  React.useEffect(() => {
    const getUsersAndDebits = async () => {
      const users: IClientUser[] = [];
      const debits: IDebit[] = [];
      
      const { data: resUsers } = await getAllUsers();
      if (resUsers) { users.push(...resUsers)}

      const { data: resDebits } = await getAllDebits();
      if (resDebits) { debits.push(...resDebits) }


      if (users.length > 0 || debits.length > 0) {
        setValue({
          ...value,
          debits,
          users,
        });
      }
    }
      getUsersAndDebits();
  }, []);

  const updateListDebits = async () => {
    const { data, success } = await getAllDebits();

    if (success) {
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