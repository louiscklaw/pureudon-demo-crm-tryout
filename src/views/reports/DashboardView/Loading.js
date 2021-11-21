import React, { useEffect } from 'react';
import { useState } from 'react';
import { css } from '@emotion/react';
import BeatLoader from 'react-spinners/BeatLoader';
import { useTranslation } from 'react-i18next';
import theme from 'src/theme';

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
  Popper,
} from '@material-ui/core';

export default () => {
  let { t } = useTranslation();

  return (
    <>
      <div
        style={{
          height: '100vh',
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <div style={{ display: 'flex', flexFlow: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <div>
            <BeatLoader color={theme.palette.primary.main} loading={true} size={15} />
          </div>
          <div style={{ marginTop: '5rem' }}>
            <Typography variant={'h6'}>{t('loading')}</Typography>
          </div>
        </div>
      </div>
    </>
  );
};
