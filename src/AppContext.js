import React from 'react';
import { SnackbarProvider } from 'notistack';
import { AuthContextProvider } from './contexts/Auth';
import { UtilContextProvider } from './contexts/Util';
import { BusContextProvider } from './contexts/Bus';
import useDebouncedHighlight from './hooks/useDebouncedHighlight';

export const AppContext = React.createContext();

export default ({ children }) => {
  let [word_to_highlight, immed_value, setWordToHighlight] = useDebouncedHighlight();

  return (
    <>
      <AppContext.Provider value={{ word_to_highlight, immed_value, setWordToHighlight }}>
        <UtilContextProvider>
          <SnackbarProvider
            autoHideDuration={3000}
            maxSnack={3}
            anchorOrigin={{ horizontal: 'center', vertical: 'top' }}>
            <AuthContextProvider>
              <BusContextProvider>{children}</BusContextProvider>
            </AuthContextProvider>
          </SnackbarProvider>
        </UtilContextProvider>
      </AppContext.Provider>
    </>
  );
};
