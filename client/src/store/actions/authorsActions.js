import axiosApi from "../../axiosApi";

export const FETCH_AUTHORS_SUCCESS = 'FETCH_AUTHORS_SUCCESS';

export const fetchAuthorsSuccess = authors => ({type: FETCH_AUTHORS_SUCCESS, authors});

export const fetchAuthors = () => {
  return async dispatch => {
    const response = await axiosApi.get('/authors');

    dispatch(fetchAuthorsSuccess(response.data));
  }
};