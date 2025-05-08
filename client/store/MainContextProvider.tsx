import React, { useState, PropsWithChildren} from 'react';
import BrowserStorage from '../store/BrowserStorage';

type MainContextProviderProps = {}

import MainContext from './MainContext';

const storedUser = BrowserStorage.getUser()

const MainContextProvider = ({ children }: PropsWithChildren<MainContextProviderProps>) => {
  const [submissions, setSubmissions] = useState([] as any[]);
  const [userEmail, setUserEmail] = useState(storedUser.email || '');
  const [userId, updateUserId] = useState(storedUser.id || '');

  const addSubmissions = (newSubmissions: any[]) => {
    setSubmissions(prevItems => [...prevItems, ...newSubmissions]);
  };

  const getAllSubmissions = (newSubmissions: any[]) => {
    setSubmissions([...newSubmissions]);
  };

  const updateUserEmail = (email: string) => {
    setUserEmail(email)
  }

  return (
    <MainContext.Provider value={{
      submissions,
      userEmail,
      userId,
      getAllSubmissions,
      addSubmissions,
      updateUserEmail,
      updateUserId,
    }}>
      {children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;