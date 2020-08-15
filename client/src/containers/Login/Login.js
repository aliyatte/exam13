import React, {useState} from 'react';
import FormElement from "../../components/UI/Form/FormElement";
import {loginUser} from "../../store/actions/usersActions";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.users.loginError);
  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const inputChangeHandler = event => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    })
  };

  const submitFormHandler = event => {
    event.preventDefault();

    dispatch(loginUser({...state}));
  };

  return (
    <>
      <Grid container justify="center">
        <Grid item xs={12} md={10} lg={4}>
          <Box pt={2} pb={2}>
            <Typography variant="h4">Login</Typography>
          </Box>

          <form onSubmit={submitFormHandler}>
            <Grid container direction="column" spacing={2}>
              {error && (
                <Grid item xs>
                  <Alert severity="error">{error.error}</Alert>
                </Grid>
              )}

              <Grid item xs>
                <FormElement
                  propertyName="username"
                  title="Username"
                  value={state.username}
                  onChange={inputChangeHandler}
                  type="text"
                  autoComplete="current-username"
                  placeholder="Enter username you registered with"
                />
              </Grid>
              <Grid item xs>
                <FormElement
                  propertyName="password"
                  title="Password"
                  value={state.password}
                  onChange={inputChangeHandler}
                  type="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                />
              </Grid>

              <Grid item xs>
                <Button type="submit" color="primary" variant="contained">
                  Sign in
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;