/* This is a HOC that ensures the user must be signed in to access the
   component it wraps */

import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";

export default (ComposedComponent) => {
  class RequireAuth extends Component {
    componentWillMount() {
      this.shouldNavigateAway();
    }

    componentWillUpdate() {
      this.shouldNavigateAway();
    }
    shouldNavigateAway() {
      if (!this.props.signedIn) {
        // ** Problem here **
        // this is updating the URL correctly, but the Landing
        // component isn't mounting
        this.props.history.push("/");
      }
    }
    render() {
      return <ComposedComponent {...this.props} />;
    }
  }
  function mapStateToProps(state) {
    return { signedIn: state.auth.user };
  }
  return connect(mapStateToProps)(RequireAuth);
};
