import React from 'react';

const BusContext = React.createContext();

const BusContextProvider = ({ children }) => {
  return <BusContext.Provider value={{}}>{children}</BusContext.Provider>;
};

export { BusContext, BusContextProvider };
