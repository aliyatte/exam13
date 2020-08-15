import React from 'react';
// import {useSelector} from "react-redux";
import {Route, Switch} from "react-router-dom";
import Login from "./containers/Login/Login";
import Registration from "./containers/Registration/Registration";
import MainPage from "./containers/MainPage/MainPage";

// const ProtectedRoute = ({isAllowed, ...props}) => (
//   isAllowed ? <Route {...props}/> : <Redirect to="/login"/>
// );

const Routes = () => {
  // const user = useSelector(state => state.users.user);

  return (
    <Switch>
      <Route path='/' exact component={MainPage} />
      <Route path="/registration" exact component={Registration} />
      <Route path="/login" exact component={Login} />
      {/*<ProtectedRoute isAllowed={user} path="/profile" exact component={UserProfile} />*/}
      {/*<ProtectedRoute isAllowed={user && user.role === 'admin'} path="/products/new" exact component={NewProduct} />*/}
    </Switch>
  );
};

export default Routes;