import React, {Component} from 'react';
import {createBook} from "../../store/actions/booksActions";
import {fetchCategories} from "../../store/actions/categoriesActions";
import {fetchAuthors} from "../../store/actions/authorsActions";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import BookForm from "../../components/BookForm/BookForm";
import {connect} from "react-redux";

class NewBook extends Component {
  componentDidMount() {
    this.props.fetchCategories();
    this.props.fetchAuthors();
  }

  createBook = async bookData => {
    await this.props.createBook(bookData);
    this.props.history.push('/')
  };

  render() {
    // console.log(this.props.authors);
    return (
      <>
        <Box pb={2} pt={2}>
          <Typography variant="h4">Add new book</Typography>
        </Box>

        <BookForm
          onSubmit={this.createBook}
          categories={this.props.categories}
          authors={this.props.authors}
        />
      </>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories.categories,
  authors: state.authors.authors,
});

const mapDispatchToProps = dispatch => ({
  createBook: bookData => dispatch(createBook(bookData)),
  fetchCategories: () => dispatch(fetchCategories()),
  fetchAuthors: () => dispatch(fetchAuthors()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewBook);