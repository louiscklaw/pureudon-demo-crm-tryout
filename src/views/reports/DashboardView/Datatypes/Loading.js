import React from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import { useTranslation } from 'react-i18next';
import theme from 'src/theme';

import { Typography } from '@material-ui/core';

export default () => {
  let { t } = useTranslation();

  return (
    <>
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <div style={{ display: 'flex', flexFlow: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <div>
            <BeatLoader color={theme.palette.primary.main} loading={true} size={15} />
          </div>
          <div style={{ marginTop: '1rem' }}>
            <Typography variant={'p'}>{t('loading')}</Typography>
          </div>
        </div>
      </div>
    </>
  );
};
