import React, { useState, PropsWithChildren} from 'react';

type MainContextProviderProps = {}

import MainContext from './MainContext';

const MainContextProvider = ({ children }: PropsWithChildren<MainContextProviderProps>) => {
  const [exampleValue, setExampleValue] = useState('');

  const updateExampleValue = (newValue: string) => {
    setExampleValue(newValue);
  };

  return (
    <MainContext.Provider value={{ exampleValue, updateExampleValue }}>
      {children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;