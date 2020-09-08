/* Main starting point */

import React, { useEffect } from "react";
import { BrowserRouter, Route, Router } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "../actions";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import requireAuth from "./requireAuth";
import Landing from "./Landing";
import Home from "./Home";
import Signin from "./auth/Signin";
import Signup from "./auth/Signup";
import history from "./history";

import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: " 50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#424242",
    width: "100vw",
    height: "100vh",
  },
}));

const App = (props) => {
  const classes = useStyles();

  useEffect(() => {
    props.fetchUser();
  }, []);

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: "dark",
          primary: { main: "#78909c" },
          secondary: { main: "#e53935" },
        },
      }),
    []
  );

  if (props.user === undefined) {
    // What the user sees while the app is fetching auth state, i.e. checking
    // if they are signed in or not.
    return (
      <ThemeProvider theme={theme}>
        <div className={classes.loading}>
          <CircularProgress />
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Route exact path="/" component={Landing}></Route>
        <Route exact path="/home" component={Home}></Route>
        <Route exact path="/signin" component={Signin}></Route>
        <Route exact path="/signup" component={Signup}></Route>
      </BrowserRouter>
    </ThemeProvider>
  );
};

function mapStateToProps(state) {
  return {
    user: state.auth.user,
  };
}

export default connect(mapStateToProps, { fetchUser })(App);
