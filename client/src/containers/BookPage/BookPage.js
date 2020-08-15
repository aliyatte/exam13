import React, {Component} from 'react';
import {deleteBook, fetchBook} from "../../store/actions/booksActions";
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import config from "../../config";

class BookPage extends Component {
  componentDidMount() {
    this.props.fetchBook(this.props.match.params.id);
  }

  render() {
    if (!this.props.book) {
      return null;
    }

    const cardStyles = {
      width: 300,
      margin: 'auto',
    };

    const imageStyles = {
      height: 300,
      width: '100%',
      objectFit: 'cover',
    };

    const cover = config.apiURL + '/' + this.props.book.image;

    return (
      <Grid container direction="column" spacing={1} style={{marginTop: '20px', marginBottom: '20px'}}>
        {this.props.user && this.props.user.role === 'admin' && (
          <Grid item style={{marginLeft: 'auto'}}>
            <Button
              color="secondary"
              variant="outlined"
              onClick={() => this.props.deleteBook(this.props.book._id)}
            >
              Delete a book
            </Button>
          </Grid>
        )}

        <Grid item container className="main" style={{paddingTop: "20px"}}>
          <Grid item container xs={7} direction="column" className="info">
            <Box py={2}>
              <Typography variant="h4" className="title">
                {this.props.book.title}
              </Typography>
            </Box>
            <Box py={2}>
              <Typography variant="h4" className="title">
                Author: {this.props.book.author.name}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1" className="description">
                {this.props.book.description}
              </Typography>
            </Box>
            <Box pt={2}>
              <Typography variant="body1" className="description">
                Price: {this.props.book.price} KGS
              </Typography>
            </Box>
          </Grid>
          <Grid item container xs={5} direction="column" className="photo">
            <Paper variant="outlined">
              <Card styles={cardStyles}>
                <CardMedia
                  component="img"
                  image={cover}
                  title={this.props.book.title}
                  style={imageStyles}
                />
              </Card>
            </Paper>
          </Grid>
          <Divider />
        </Grid>

      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  book: state.books.book,
  user: state.users.user,
});

const mapDispatchToProps = dispatch => ({
  fetchBook: bookId => dispatch(fetchBook(bookId)),
  deleteBook: bookId => dispatch(deleteBook(bookId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookPage);