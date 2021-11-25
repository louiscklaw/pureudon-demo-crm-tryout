import React from 'react';
import { SnackbarProvider } from 'notistack';
import { AuthContextProvider } from './contexts/Auth';
import { UtilContextProvider } from './contexts/Util';
import { BusContextProvider } from './contexts/Bus';

export default ({ children }) => {
  return (
    <>
      <UtilContextProvider>
        <SnackbarProvider autoHideDuration={3000} maxSnack={3} anchorOrigin={{ horizontal: 'center', vertical: 'top' }}>
          <AuthContextProvider>
            <BusContextProvider>{children}</BusContextProvider>
          </AuthContextProvider>
        </SnackbarProvider>
      </UtilContextProvider>
    </>
  );
};
