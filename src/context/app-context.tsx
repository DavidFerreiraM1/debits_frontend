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
  idDebitToUpdate: string;
  setIdDebitToUpdate: (val: string) => void;
  updateListDebits: () => void,
}>({
  debits: [],
  users: [],
  idDebitToUpdate: '',
  setIdDebitToUpdate: (val: string) => {},
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

  const [idDebitToUpdate, setIdDebitToUpdate] = React.useState('');
  const handleIdDebitToUpdate = (val: string) => {
    setIdDebitToUpdate(val);
  }

  return (
    <AppContext.Provider value={{
      debits: value.debits,
      users: value.users,
      setIdDebitToUpdate: handleIdDebitToUpdate,
      idDebitToUpdate,
      updateListDebits
    }}>
      {props.children}
    </AppContext.Provider>
  )
}

export const useDebitContext = () => React.useContext(AppContext);