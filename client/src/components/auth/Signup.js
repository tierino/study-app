import React, { useEffect } from "react";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";

import * as actions from "../../actions";

function Signup(props) {
  // If user is signed in, redirect them to the homepage
  useEffect(() => {
    if (props.user) {
      props.history.push("/home");
    }
  }, [props.history, props.user]);

  function onSubmit(formProps) {
    props.signup(formProps, () => {
      props.history.push("/home");
    });
  }

  return (
    <form onSubmit={props.handleSubmit(onSubmit)}>
      <fieldset>
        <label>First name</label>
        <Field name="name" type="text" component="input" autoComplete="off" />
      </fieldset>
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
      <button>Sign up</button>
    </form>
  );
}

function mapStateToProps(state) {
  return { user: state.auth.user, error: state.auth.error };
}
export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: "signup" })
)(Signup);
