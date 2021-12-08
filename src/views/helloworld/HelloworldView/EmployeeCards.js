import React from 'react';
import { Grid } from '@material-ui/core';

import ReactCardTableHelloworld from './ReactCardTableHelloworld';
import ReactSmallCardTableHelloworld from './ReactSmallCardTableHelloworld';

export default () => {
  return (
    <>
      <Grid container justifyContent="left" spacing={2}>
        {Array(5)
          .fill({})
          .map((_, idx) => {
            let card_body_img = `https://source.unsplash.com/random/300×300?q=${idx}`;
            return (
              <Grid key={idx} item xs={4} md={3} xl={2}>
                <ReactSmallCardTableHelloworld card_body_img={card_body_img} />
              </Grid>
            );
          })}
      </Grid>

      <Grid container justifyContent="left" spacing={2}>
        {Array(10)
          .fill({})
          .map((_, idx) => {
            let card_body_img = `https://source.unsplash.com/random/300×300?q=${idx}`;
            return (
              <Grid key={idx} item xs={6} md={4} xl={3}>
                <ReactCardTableHelloworld card_body_img={card_body_img} />
              </Grid>
            );
          })}
      </Grid>
    </>
  );
};
