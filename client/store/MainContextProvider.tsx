import React, { useState, PropsWithChildren} from 'react';
import BrowserStorage from '../store/BrowserStorage';

type MainContextProviderProps = {}

import MainContext from './MainContext';

const storedUser = BrowserStorage.getUser()

const MainContextProvider = ({ children }: PropsWithChildren<MainContextProviderProps>) => {
  const [exampleValue, setExampleValue] = useState('');
  const [userEmail, setUserEmail] = useState(storedUser.email || '');

  const updateExampleValue = (newValue: string) => {
    setExampleValue(newValue);
  };

  const updateUserEmail = (email: string) => {
    setUserEmail(email)
  }

  return (
    <MainContext.Provider value={{
      exampleValue,
      userEmail,
      updateExampleValue,
      updateUserEmail,
    }}>
      {children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;