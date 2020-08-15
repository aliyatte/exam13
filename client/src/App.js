import React, {Component} from 'react';
import AppToolbar from "./components/UI/Toolbar/AppToolbar";
import Routes from "./Routes";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { ToastContainer } from "react-toastify";

class App extends Component {
  render() {
    return (
      <>
        <CssBaseline/>
        <AppToolbar/>
        <ToastContainer autoClose={2000} />
        <Container maxWidth="xl">
          <Routes/>
        </Container>
      </>
    );
  }
}

export default App;