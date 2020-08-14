/* Main starting point */

import React, { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "../actions";

import Welcome from "./Welcome";
import Home from "./Home";
import Signin from "./auth/Signin";
import Signup from "./auth/Signup";

const App = (props) => {
  useEffect(() => {
    props.fetchUser();
  }, []);

  if (props.user === undefined) {
    // What the user sees while the app is fetching auth state, i.e. checking
    // if they are signed in or not.
    return <div>Loading...</div>;
  }

  return (
    <div>
      <BrowserRouter>
        <Route exact path="/" component={Welcome}></Route>
        <Route exact path="/home" component={Home}></Route>
        <Route exact path="/signin" component={Signin}></Route>
        <Route exact path="/signup" component={Signup}></Route>
      </BrowserRouter>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    user: state.auth.user,
  };
}

export default connect(mapStateToProps, { fetchUser })(App);
