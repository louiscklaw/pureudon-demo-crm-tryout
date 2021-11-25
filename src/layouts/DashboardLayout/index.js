import { Link as RouterLink, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import NavBar from './NavBar';
import TopBar from './TopBar';
import { AuthContext } from 'src/contexts/Auth';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%',
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256,
    },
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto',
  },
}));

export default () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const { jwt, LOGGED_IN, auth_state, setAuthState } = React.useContext(AuthContext);

  const [confirm_loaded, setConfirmLoaded] = useState(false);

  // React.useEffect(() => {
  //   if (jwt) {
  //     navigate(process.env.PUBLIC_URL + '/app/dashboard');
  //   } else {
  //     navigate(process.env.PUBLIC_URL + '/login');
  //   }
  // }, [confirm_loaded]);

  // React.useEffect(() => {
  //   setTimeout(() => setConfirmLoaded(true), 1000);
  // }, []);

  return (
    <div className={classes.root}>
      <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <NavBar onMobileClose={() => setMobileNavOpen(false)} openMobile={isMobileNavOpen} />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
