import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  Button,
  Fade,
  Paper,
  Typography,
  makeStyles,
  Popper,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import Logo from 'src/components/Logo';

import { LANGUAGE_PREF_KEY } from 'src/constants';

import useStyles from './styles';
import TranslateIcon from '@material-ui/icons/Translate';

import PublicIcon from '@material-ui/icons/Public';

import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import { useTranslation } from 'react-i18next';

const TopBar = ({ className, onMobileNavOpen, ...rest }) => {
  const classes = useStyles();
  const [notifications] = useState([]);
  const { t } = useTranslation();

  const changeLanguage = (lang) => {
    localStorage.setItem(LANGUAGE_PREF_KEY, lang);
    window.location.reload();
  };

  return (
    <AppBar className={clsx(classes.root, className)} elevation={0} {...rest}>
      <Toolbar>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Box flexGrow={1} />
        <Hidden mdDown>
          <PopupState variant="popper" popupId="demo-popup-popper">
            {(popupState) => (
              <div>
                <IconButton color="inherit" variant="contained" {...bindToggle(popupState)}>
                  <Badge color="primary">
                    <TranslateIcon />
                  </Badge>
                </IconButton>
                <Popper style={{ zIndex: '9999' }} {...bindPopper(popupState)} transition>
                  {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                      <Paper>
                        <div>
                          <Button size="large" onClick={(e) => changeLanguage('zh_TW')}>
                            <PublicIcon style={{ marginRight: '0.5rem' }} />
                            {t('chinese')}
                          </Button>
                        </div>
                        <div>
                          <Button size="large" onClick={(e) => changeLanguage('en_US')}>
                            <PublicIcon style={{ marginRight: '0.5rem' }} />
                            {t('english')}
                          </Button>
                        </div>
                      </Paper>
                    </Fade>
                  )}
                </Popper>
              </div>
            )}
          </PopupState>

          <IconButton color="inherit">
            <Badge badgeContent={notifications.length} color="primary" variant="dot">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func,
};

export default TopBar;
