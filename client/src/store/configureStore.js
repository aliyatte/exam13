import { createBrowserHistory } from "history";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { connectRouter, routerMiddleware } from "connected-react-router";
import usersReducer from "./reducers/usersReducer";
import { loadFromLocalStorage, localStorageMiddleware } from "./localStorage";
import mainReducer from "./reducers/mainReducer";
import authorsReducer from "./reducers/authorsReducer";
import categoriesReducer from "./reducers/categoriesReducer";
import booksReducer from "./reducers/booksReducer";

export const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  router: connectRouter(history),
  main: mainReducer,
  users: usersReducer,
  authors: authorsReducer,
  categories: categoriesReducer,
  books: booksReducer,
});

const middleware = [
  thunkMiddleware,
  routerMiddleware(history),
  localStorageMiddleware,
];

const enhancers = composeEnhancers(applyMiddleware(...middleware));

const persistedState = loadFromLocalStorage();

const store = createStore(rootReducer, persistedState, enhancers);

export default store;