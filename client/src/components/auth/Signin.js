import React, { useEffect } from "react";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import { connect, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";

import * as actions from "../../actions";
import { ReactComponent as Hat } from "../../images/gradcap.svg";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";

const MAX_EMAIL_LEN = 320;
const MAX_PW_LEN = 100;

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  title: {
    marginBottom: theme.spacing(1),
  },
  form: {
    textAlign: "center",
  },
  submit: {
    margin: theme.spacing(2, 0, 3),
  },
  textField: {
    "&:-webkit-autofill": {
      WebkitBoxShadow: "0 0 0px 1000px black inset !important",
    },
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

// Field renderer so Material-UI works with Redux Form
const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    label={label}
    fullWidth
    variant="outlined"
    margin="normal"
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
);

function Signin(props) {
  const classes = useStyles();

  // If user is signed in, redirect them to the homepage
  useEffect(() => {
    if (props.user) {
      props.history.push("/home");
    }
  }, []);

  function onSubmit(formProps) {
    formProps.email = formProps.email.trim();
    formProps.password = formProps.password.trim();

    // Callback navigates user to '/home' path when they sign in
    props.signin(formProps, () => {
      props.history.push("/home");
    });
  }

  return (
    <CssBaseline>
      <div className={classes.root}>
        <Container component="main" maxWidth="xs" className={classes.form}>
          <Hat style={{ height: "80", width: "80", fill: "#78909c" }} />
          <Typography component="h1" variant="h5" className={classes.title}>
            Sign in
          </Typography>
          <form onSubmit={props.handleSubmit(onSubmit)}>
            <Field
              className={classes.textField}
              name="email"
              component={renderTextField}
              label="Email"
              autoComplete="off"
              inputProps={{
                maxLength: MAX_EMAIL_LEN,
              }}
              autoFocus
              required
            />
            <Field
              className={classes.textField}
              name="password"
              component={renderTextField}
              label="Password"
              type="password"
              inputProps={{
                maxLength: MAX_PW_LEN,
              }}
              required
            />

            <Typography variant="body2" style={{ color: "red" }}>
              {props.authError}
            </Typography>
            <Button
              type="submit"
              className={classes.submit}
              variant="contained"
              fullWidth
            >
              Sign in
            </Button>
            <Typography variant="body2">
              Don't have an account? Create one{" "}
              <Link href="/signup" style={{ color: "#4791db" }}>
                here
              </Link>
              .
            </Typography>
          </form>
        </Container>
      </div>
    </CssBaseline>
  );
}

function mapStateToProps(state) {
  return { user: state.auth.user, authError: state.auth.error };
}

export default withRouter(
  compose(
    connect(mapStateToProps, actions),
    reduxForm({ form: "signin" })
  )(Signin)
);
