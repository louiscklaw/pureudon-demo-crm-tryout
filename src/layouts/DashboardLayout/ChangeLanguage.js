import React from 'react';
import Popover from '@material-ui/core/Popover';

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

import PopupState, {
  bindToggle,
  bindPopper,
  bindPopover,
} from 'material-ui-popup-state';

import TranslateIcon from '@material-ui/icons/Translate';
import PublicIcon from '@material-ui/icons/Public';
import { LANGUAGE_PREF_KEY } from 'src/constants';

import { useTranslation } from 'react-i18next';

export default function ChangeLang() {
  const { t } = useTranslation();

  const changeLanguage = (lang) => {
    localStorage.setItem(LANGUAGE_PREF_KEY, lang);
    window.location.reload();
  };

  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <IconButton
            color="inherit"
            variant="contained"
            {...bindToggle(popupState)}>
            <Badge color="primary">
              <TranslateIcon />
            </Badge>
          </IconButton>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}>
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
          </Popover>
        </div>
      )}
    </PopupState>
  );
}
