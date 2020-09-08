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
        this.props.history.push("/");
        this.props.history.go();
      }
    }
    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { signedIn: state.auth.user };
  }

  return withRouter(connect(mapStateToProps)(RequireAuth));
};
