import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link, NavLink as RouterNavLink} from "react-router-dom";
import ShowTo from "../../hoc/ShowTo";
import {fetchCategories} from "../../store/actions/categoriesActions";
import DrawerLayout from "../../components/UI/DrawerLayout/DrawerLayout";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import BookCard from "../../components/BookCard/BookCard";
import {fetchBooks} from "../../store/actions/booksActions";
import {fetchAuthors} from "../../store/actions/authorsActions";
import Box from "@material-ui/core/Box";

class Books extends Component {
  componentDidMount() {
    this.props.fetchBooks(this.props.match.params.id);
    this.props.fetchCategories();
    this.props.fetchAuthors();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      if (this.props.match.path === "/author/:id") {
        this.props.fetchBooks('author', this.props.match.params.id);
      } else if (this.props.match.path === "/category/:id") {
        this.props.fetchBooks('category', this.props.match.params.id);
      } else {
        this.props.fetchBooks(this.props.match.params.id);
      }
    }
  }

  render() {
    const drawerContent = (
      <MenuList>
        <MenuItem
          component={RouterNavLink}
          to="/" exact
          activeClassName="Mui-selected"
          style={{fontWeight: 'bold'}}
        >
          All books
        </MenuItem>

        <Box ml={2}>
          <Typography variant="body1" style={{fontWeight: 'bold'}}>
            Books by categories:
          </Typography>
        </Box>

        {this.props.categories && this.props.categories.map(category => (
          <MenuItem
            key={category._id}
            component={RouterNavLink}
            to={"/category/" + category._id}
            activeClassName="Mui-selected"
            // onClick={() => this.props.fetchBooks(category._id, null)}
          >
            {category.title} ({category.booksCount})
          </MenuItem>
        ))}

        <Box ml={2}>
          <Typography variant="body1" style={{fontWeight: 'bold'}}>
            Books by authors:
          </Typography>
        </Box>

        {this.props.authors && this.props.authors.map(author => (
          <MenuItem
            key={author._id}
            component={RouterNavLink}
            to={"/author/" + author._id}
            activeClassName="Mui-selected"
            // onClick={() => this.props.fetchBooks(author._id)}

          >
            {author.name} ({author.booksCount})
          </MenuItem>
        ))}
      </MenuList>
    );

    return (
      <DrawerLayout drawerContent={drawerContent}>
        <Grid container direction="column" spacing={2}>

          <Grid item container direction="row" justify="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h4">
                Books
              </Typography>
            </Grid>
            <Grid item>
              <ShowTo role="admin">
                <Button
                  color="primary"
                  component={Link}
                  to={"/books/new"}
                >
                  Add a book
                </Button>
              </ShowTo>
            </Grid>
          </Grid>

          <Grid item container direction="row" spacing={1}>
            {this.props.books.map(book => (
              <BookCard
                key={book._id}
                title={book.title}
                id={book._id}
                price={book.price}
                image={book.image}
              />
            ))}
          </Grid>
        </Grid>

      </DrawerLayout>
    );
  }
}

const mapStateToProps = state => ({
  books: state.books.books,
  book: state.books.book,
  categories: state.categories.categories,
  authors: state.authors.authors,
});

const mapDispatchToProps = dispatch => ({
  fetchBooks: (kind, id) => dispatch(fetchBooks(kind, id)),
  fetchCategories: () => dispatch(fetchCategories()),
  fetchAuthors: () => dispatch(fetchAuthors()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Books);