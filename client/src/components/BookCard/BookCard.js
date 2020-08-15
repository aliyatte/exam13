import React from 'react';
import {Link} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import {Card} from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import {makeStyles} from "@material-ui/core/styles";
import config from "../../config";

const useStyles = makeStyles({
  card: {
    height: '100%'
  },
  media: {
    height: 100,
    paddingTop: '56.25%', // 16:9
  },
});

const BookCard = (props) => {
  const classes = useStyles();

  let image;

  if (props.image) {
    image = config.apiURL + '/' + props.image;
  }

  return (
    <Grid item xs={12} sm={12} md={6} lg={4}>
      <Card className={classes.card}>
        <CardHeader title={props.title}/>
        <CardMedia image={image} title={props.title} className={classes.media}/>
        <CardContent>
          <strong style={{marginLeft: '10px'}}>
            {props.price} KGS
          </strong>
        </CardContent>
        <CardActions>
          <IconButton component={Link} to={'/books/' + props.id}>
            <ArrowForwardIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default BookCard;