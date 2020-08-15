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

class Books extends Component {
  componentDidMount() {
    this.props.fetchBooks(this.props.match.params.id);
    this.props.fetchCategories();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.props.fetchBooks(this.props.match.params.id);
    }
  }

  render() {
    console.log(this.props.categories);
    console.log(this.props.match.params.id);
    const drawerContent = (
      <MenuList>
        <MenuItem
          component={RouterNavLink}
          to="/" exact
          activeClassName="Mui-selected"
        >
          All books
        </MenuItem>

        {this.props.categories.map(category => (
          <MenuItem
            key={category._id}
            component={RouterNavLink}
            to={"/category/" + category._id}
            activeClassName="Mui-selected"
          >
            {category.title} ({category.bookCount})
          </MenuItem>
        ))}

        {this.props.authors.map(author => (
          <MenuItem
            key={author._id}
            component={RouterNavLink}
            to={"/author/" + author._id}
            activeClassName="Mui-selected"
          >
            {author.name} ({author.bookCount})
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
                  Add book
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
                cover={book.cover}
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
  categories: state.categories.categories,
});

const mapDispatchToProps = dispatch => ({
  fetchBooks: categoryId => dispatch(fetchBooks(categoryId)),
  fetchCategories: () => dispatch(fetchCategories()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Books);