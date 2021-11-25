import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Avatar, Box, Card, CardContent, Grid, Typography } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import MoneyIcon from '@material-ui/icons/Money';

import useStyles from './styles';
import get_all from 'src/api/datatypes/get_all';
import { useTranslation } from 'react-i18next';

import useDatatypesCount from 'src/hooks/useDatatypesCount';

import Loading from './Loading';

const Budget = ({ className, ...rest }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  let [datatypes_length, setDatatypesLength] = React.useState();
  let [is_loading, setIsLoading] = React.useState(true);

  let { data } = useDatatypesCount();

  React.useEffect(() => {
    if (datatypes_length) {
    } else {
      setIsLoading(false);
    }
  }, [datatypes_length]);

  React.useEffect(() => {
    setDatatypesLength(data?.total);
  }, [data]);

  if (is_loading)
    return (
      <Card className={clsx(classes.root, className)} {...rest}>
        <CardContent style={{ height: '100%' }}>
          <Loading />
        </CardContent>
      </Card>
    );

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              {t('num_of_datatypes')}
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {JSON.stringify(datatypes_length)}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <MoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box mt={2} display="flex" alignItems="center">
          <ArrowDownwardIcon className={classes.differenceIcon} />
          <Typography className={classes.differenceValue} variant="body2">
            12%
          </Typography>
          <Typography color="textSecondary" variant="caption">
            Since last month
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

Budget.propTypes = {
  className: PropTypes.string,
};

export default Budget;
