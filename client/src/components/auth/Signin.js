import React, { useEffect } from "react";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";

import * as actions from "../../actions";

function Signin(props) {
  // If user is signed in, redirect them to the homepage
  useEffect(() => {
    if (props.user) {
      props.history.push("/home");
    }
  }, [props.history, props.user]);

  function onSubmit(formProps) {
    props.signin(formProps, () => {
      props.history.push("/home");
    });
  }

  return (
    <form onSubmit={props.handleSubmit(onSubmit)}>
      <fieldset>
        <label>Email</label>
        <Field name="email" type="text" component="input" autoComplete="off" />
      </fieldset>
      <fieldset>
        <label>Password</label>
        <Field
          name="password"
          type="password"
          component="input"
          autoComplete="off"
        />
      </fieldset>
      <div>{props.error}</div>
      <button>Sign in</button>
    </form>
  );
}

function mapStateToProps(state) {
  return { error: state.auth.error };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: "signin" })
)(Signin);
