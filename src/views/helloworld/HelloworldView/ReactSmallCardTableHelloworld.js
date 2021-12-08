import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Card, Grid } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { AppContext } from 'src/AppContext';
import Body1 from 'src/components/Typography/Body1';

const useStyles = makeStyles((theme) => ({
  root: { display: 'flex' },
  details: { display: 'flex', flexDirection: 'column' },
  content: { flex: '1 0 auto' },
  cover: { width: 151 },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: { height: 38, width: 38 },
}));

export default () => {
  const classes = useStyles();
  const theme = useTheme();
  let { word_to_highlight } = React.useContext(AppContext);

  return (
    <Card className={classes.root}>
      <Grid container>
        <Grid item xs={4} style={{ backgroundImage: `url(https://source.unsplash.com/random/300×300)` }}>
          {/* <CardMedia
            className={classes.cover}
            image="https://source.unsplash.com/random/300×300"
            title="Live from space album cover"
          /> */}
        </Grid>
        <Grid item xs={8}>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Body1 variant="body1" gutterBottom>
                123321
              </Body1>
              <Typography variant="body2" gutterBottom>
                Mac Miller
              </Typography>
            </CardContent>
          </div>
        </Grid>
      </Grid>
    </Card>
  );
};
