import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import FormElement from "../../components/UI/Form/FormElement";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {registerUser} from "../../store/actions/usersActions";

const Registration = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.users.registerError);
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

  const submitFormHandler = async (event) => {
    event.preventDefault();
    await dispatch(registerUser({...state}));
  };

  const getFieldError = fieldName => {
    try {
      return error.errors[fieldName].message;
    } catch (e) {
      return undefined;
    }
  };

  return (
    <>
      <Grid container justify="center">
        <Grid item xs={12} md={10} lg={4}>
          <Box pt={2} pb={2}>
            <Typography variant="h4">Registration</Typography>
          </Box>

          <form onSubmit={submitFormHandler}>
            <Grid container direction="column" spacing={2}>
              <Grid item xs>
                <FormElement
                  propertyName="username"
                  title="Username"
                  value={state.username}
                  onChange={inputChangeHandler}
                  error={getFieldError('username')}
                  placeholder="Enter username"
                  autoComplete="new-username"
                />
              </Grid>
              <Grid item xs>
                <FormElement
                  propertyName="password"
                  title="Password"
                  type="password"
                  value={state.password}
                  onChange={inputChangeHandler}
                  error={getFieldError('password')}
                  placeholder="Enter password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs>
                <Button type="submit" color="primary" variant="contained">
                  Register
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default Registration;