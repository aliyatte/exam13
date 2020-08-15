import axiosApi from "../../axiosApi";
import {toast} from "react-toastify";

export const FETCH_BOOKS_SUCCESS = 'FETCH_BOOKS_SUCCESS';
export const CREATE_BOOK_SUCCESS = 'CREATE_BOOK_SUCCESS';

export const FETCH_BOOK_SUCCESS = 'FETCH_BOOK_SUCCESS';

export const fetchBooksSuccess = books => ({type: FETCH_BOOKS_SUCCESS, books});
export const createBookSuccess = () => ({type: CREATE_BOOK_SUCCESS});
export const fetchBookSuccess = book => ({type: FETCH_BOOK_SUCCESS, book});

export const fetchBooks = categoryId => {
  return async (dispatch) => {
    let url = '/books';

    if (categoryId) {
      url += '?category=' + categoryId;
    }

    const response = await axiosApi.get(url);
    dispatch(fetchBooksSuccess(response.data));
  };
};

export const createBook = bookData => {
  return async (dispatch) => {
    await axiosApi.post('/books', bookData);
    dispatch(createBookSuccess());
    toast.success("Successfully added a book");

  };
};

export const fetchBook = bookId => {
  return async dispatch => {
    const response = await axiosApi.get(`/books/${bookId}`);
    dispatch(fetchBookSuccess(response.data));
  }
};

export const deleteBook = bookId => {
  return async (dispatch) => {
    await axiosApi.delete(`/books/${bookId}`);
    toast.success("Successfully deleted a book");
    dispatch(fetchBooks());
  }
};