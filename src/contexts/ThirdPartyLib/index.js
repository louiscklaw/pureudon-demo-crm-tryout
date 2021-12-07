import React from 'react';
import { SnackbarProvider } from 'notistack';
import { QueryClient, QueryClientProvider } from 'react-query';

const ThirdPartyContext = React.createContext();
const queryClient = new QueryClient();

const ThirdPartyContextProvider = ({ children }) => {
  return (
    <ThirdPartyContext.Provider value={{}}>
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider autoHideDuration={3000} maxSnack={3} anchorOrigin={{ horizontal: 'center', vertical: 'top' }}>
          {children}
        </SnackbarProvider>
      </QueryClientProvider>
    </ThirdPartyContext.Provider>
  );
};

export { ThirdPartyContext, ThirdPartyContextProvider };
