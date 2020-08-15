import {FETCH_BOOK_SUCCESS, FETCH_BOOKS_SUCCESS} from "../actions/booksActions";

const initialState = {
  books: [],
  book: null,
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKS_SUCCESS:
      return {...state, books: action.books};
    case FETCH_BOOK_SUCCESS:
      return {...state, book: action.book};
    default:
      return state;
  }
};

export default productsReducer;