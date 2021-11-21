import React from 'react';
import { SnackbarProvider } from 'notistack';

export default ({ children }) => {
  return (
    <>
      <SnackbarProvider autoHideDuration={3000} maxSnack={3} anchorOrigin={{ horizontal: 'center', vertical: 'top' }}>
        {children}
      </SnackbarProvider>
    </>
  );
};
