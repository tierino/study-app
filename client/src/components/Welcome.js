/* Unauthenticated users will see this component */

import React, { useEffect } from "react";
import { connect } from "react-redux";

function Welcome(props) {
  // If user is signed in, redirect them to the homepage
  useEffect(() => {
    if (props.user) {
      props.history.push("/home");
    }
  }, [props.history, props.user]);

  return (
    <div>
      <p>Hi, you are not signed in :(</p>
      <a href="/auth/google">
        <button>Sign in with Google</button>
      </a>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
  };
}

export default connect(mapStateToProps)(Welcome);
