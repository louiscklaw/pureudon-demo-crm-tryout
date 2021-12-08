import React, { memo, useContext } from 'react';
import { Typography, makeStyles } from '@material-ui/core';

import Highlighter from 'react-highlight-words';

import { AppContext } from 'src/AppContext';

const useStyles = makeStyles((theme) => ({
  highlight_text: { backgroundColor: '#f1c40f', fontSize: '2rem' },
}));

const Body1 = ({ children, ...rest }) => {
  const classes = useStyles();

  let { word_to_highlight } = useContext(AppContext);

  return (
    <>
      <Typography {...rest}>
        <Highlighter
          highlightClassName={classes.highlight_text}
          searchWords={word_to_highlight ? word_to_highlight.split(' ') : []}
          autoEscape={true}
          textToHighlight={children}
        />
      </Typography>
    </>
  );
};

export default memo(Body1);
