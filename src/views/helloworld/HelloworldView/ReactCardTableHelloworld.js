import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import { Box, AvatarGroup } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import FileCopyIcon from '@material-ui/icons/FileCopy';

import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import FaceIcon from '@material-ui/icons/Face';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

export default (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  return (
    <>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
        />
        <CardMedia className={classes.media} image={props.card_body_img} title="Paella dish" />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup
            of frozen peas along with the mussels, if you like.
          </Typography>
          <Box mt={'1rem'}>
            <Chip size="small" icon={<FaceIcon />} label="Hello" onDelete={handleDelete} color="primary" />
          </Box>
          <Box mt={'1rem'}>
            <AvatarGroup max={4}>
              <Avatar alt="Remy Sharp" src="https://source.unsplash.com/random/300×300" />
              <Avatar alt="Travis Howard" src="https://source.unsplash.com/random/300×300" />
              <Avatar alt="Cindy Baker" src="https://source.unsplash.com/random/300×300" />
              <Avatar alt="Agnes Walker" src="https://source.unsplash.com/random/300×300" />
              <Avatar alt="Trevor Henderson" src="https://source.unsplash.com/random/300×300" />
            </AvatarGroup>
          </Box>
        </CardContent>
        <CardActions mt={'1rem'} disableSpacing>
          <IconButton aria-label="add to favorites">
            <EditIcon />
          </IconButton>
          <IconButton aria-label="share">
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <FileCopyIcon />
          </IconButton>
          <IconButton
            className={clsx(classes.expand, { [classes.expandOpen]: expanded })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more">
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Method:</Typography>
            <Typography paragraph>
              Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 minutes.
            </Typography>
            <Typography paragraph>
              Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken,
              shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp
              to a large plate and set aside, leaving chicken and chorizo in the pan. Add pimentón, bay leaves, garlic,
              tomatoes, onion, salt and pepper, and cook, stirring often until thickened and fragrant, about 10 minutes.
              Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
            </Typography>
            <Typography paragraph>
              Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook without stirring,
              until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
              mussels, tucking them down into the rice, and cook again without stirring, until mussels have opened and
              rice is just tender, 5 to 7 minutes more. (Discard any mussels that don’t open.)
            </Typography>
            <Typography>Set aside off of the heat to let rest for 10 minutes, and then serve.</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
};
