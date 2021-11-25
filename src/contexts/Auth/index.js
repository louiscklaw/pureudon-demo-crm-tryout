import React from 'react';
import ShowDebug from 'src/components/ShowDebug';

const LOGGED_IN = 'LOGGED_IN';
const NOT_LOGGED_IN = 'NOT_LOGGED_IN';
const LOCAL_STORAGE_JWT_NAME = 'jwt';

const AuthContext = React.createContext();

const AuthContextProvider = ({ children }) => {
  const [auth_state, setAuthState] = React.useState(NOT_LOGGED_IN);
  const [jwt, setJwt] = React.useState();

  React.useEffect(() => {
    if (jwt) {
      localStorage.setItem(LOCAL_STORAGE_JWT_NAME, jwt);
    } else {
      localStorage.removeItem(LOCAL_STORAGE_JWT_NAME);
    }
  }, [jwt]);

  React.useEffect(() => {
    setJwt(localStorage.getItem(LOCAL_STORAGE_JWT_NAME));
  }, []);

  return (
    <AuthContext.Provider
      value={{ setJwt, LOCAL_STORAGE_JWT_NAME, LOGGED_IN, NOT_LOGGED_IN, auth_state, setAuthState }}>
      <ShowDebug>{JSON.stringify(jwt)}</ShowDebug>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
