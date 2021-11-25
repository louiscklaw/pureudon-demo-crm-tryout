import React from 'react';
import { useNavigate } from 'react-router';
import Page from 'src/components/Page';
import { AuthContext } from 'src/contexts/Auth';

import { useStyles } from './styles';

const LoginView = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const { LOCAL_STORAGE_JWT_NAME, LOGGED_IN, NOT_LOGGED_IN, auth_state, setAuthState } = React.useContext(AuthContext);

  React.useEffect(() => {
    setAuthState(NOT_LOGGED_IN);
    localStorage.removeItem(LOCAL_STORAGE_JWT_NAME);
    setTimeout(() => {
      navigate(`${process.env.PUBLIC_URL}/login`);
    }, 1000);
  }, []);

  return (
    <Page className={classes.root} title="Logout">
      Logout
      <a href={`${process.env.PUBLIC_URL}/login`}>back to login</a>
    </Page>
  );
};

export default LoginView;
