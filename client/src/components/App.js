/* Main starting point */

import React, { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "../actions";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import Welcome from "./Welcome";
import Homee from "./dashboard/Homee";
import Signin from "./auth/Signin";
import Signup from "./auth/Signup";

const App = (props) => {
  useEffect(() => {
    props.fetchUser();
  }, []);

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: "dark",
          primary: { main: "#78909c" },
          secondary: { main: "#ff5722" },
        },
      }),
    []
  );

  if (props.user === undefined) {
    // What the user sees while the app is fetching auth state, i.e. checking
    // if they are signed in or not.
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Route exact path="/" component={Welcome}></Route>
        <Route exact path="/home" component={Homee}></Route>
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
