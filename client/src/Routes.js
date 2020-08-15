import React from 'react';
import {useSelector} from "react-redux";
import {Redirect, Route, Switch} from "react-router-dom";
import Login from "./containers/Login/Login";
import Registration from "./containers/Registration/Registration";
import Books from "./containers/Books/Books";
import NewBook from "./containers/NewBook/NewBook";
import BookPage from "./containers/BookPage/BookPage";

const ProtectedRoute = ({isAllowed, ...props}) => (
  isAllowed ? <Route {...props}/> : <Redirect to="/login"/>
);

const Routes = () => {
  const user = useSelector(state => state.users.user);

  return (
    <Switch>
      <Route path='/' exact component={Books} />
      <Route path="/category/:id" exact component={Books} />
      <Route path="/author/:id" exact component={Books} />
      <ProtectedRoute isAllowed={user && user.role === 'admin'} path="/books/new" exact component={NewBook} />
      <Route path="/registration" exact component={Registration} />
      <Route path="/login" exact component={Login} />
      <Route path='/books/:id' exact component={BookPage} />
    </Switch>
  );
};

export default Routes;