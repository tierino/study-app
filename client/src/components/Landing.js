/* Unauthenticated users will see this component */

import React, { useEffect } from "react";
import { connect } from "react-redux";

import googleLogo from "../images/icons8-google-48.png";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Hidden from "@material-ui/core/Hidden";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  googleLogo: {
    width: 24,
    height: 24,
    marginRight: theme.spacing(1),
  },
}));

function Landing(props) {
  const classes = useStyles();

  // If user is signed in, redirect them to the homepage
  useEffect(() => {
    if (props.user) {
      props.history.push("/home");
    }
  }, [props.history, props.user]);

  return (
    <CssBaseline>
      <Grid container component="main" className={classes.root}>
        <Hidden xsDown>
          <Grid item sm={5} md={6}>
            <p>Hi, you are not signed in :(</p>
          </Grid>
        </Hidden>
        <Grid item xs={12} sm={7} md={6}>
          <a href="/signin" style={{ textDecoration: "none" }}>
            <button>Sign in</button>
          </a>
          <br />
          <a href="/signup" style={{ textDecoration: "none" }}>
            <button>Sign up</button>
          </a>
          <p>or</p>
          <a href="/auth/google" style={{ textDecoration: "none" }}>
            <Button variant="contained">
              <img src={googleLogo} className={classes.googleLogo} />
              Sign in with Google
            </Button>
          </a>
        </Grid>
      </Grid>
    </CssBaseline>
  );
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
  };
}

export default connect(mapStateToProps)(Landing);
