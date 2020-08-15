import {FETCH_AUTHORS_SUCCESS} from "../actions/authorsActions";

const initialState = {
  authors: []
};

const categoriesReducer = (state = initialState, action) => {
  if (action.type === FETCH_AUTHORS_SUCCESS) {
    return {...state, authors: action.authors};
  }

  return state;
};

export default categoriesReducer;