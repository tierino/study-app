/* Unauthenticated users will see this component */

import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Signup from "./auth/Signup";
import QuickSignIn from "./auth/QuickSignIn";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Hidden from "@material-ui/core/Hidden";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import EventIcon from "@material-ui/icons/Event";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  leftSide: {
    alignItems: "center",
    backgroundColor: "#78909c",
  },
  rightSide: {
    textAlign: "center",
  },
  headingsContainer: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  heading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    marginLeft: theme.spacing(0),
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  icon: {
    marginRight: theme.spacing(2),
    height: "40px",
    width: "40px",
  },
  signature: {
    marginTop: theme.spacing(4),
    display: "flex",
    justifyContent: "center",
  },
}));

function Landing(props) {
  const classes = useStyles();

  // If user is signed in, redirect them to the homepage
  useEffect(() => {
    console.log("mounted");
    if (props.user) {
      props.history.push("/home");
    }
  }, [props.history, props.user]);

  return (
    <CssBaseline>
      <Grid container component="main" className={classes.root}>
        <Hidden xsDown>
          {/* Left side */}
          <Grid item sm={5} md={6} className={classes.leftSide}>
            <div className={classes.headingsContainer}>
              <div className={classes.heading}>
                <Typography variant="h3">Welcome</Typography>
              </div>
              <div className={classes.heading}>
                <TrendingUpIcon className={classes.icon} />
                <Typography variant="h6">
                  Track your unit progress and grades.
                </Typography>
              </div>
              <div className={classes.heading}>
                <EventIcon className={classes.icon} />
                <Typography variant="h6">See upcoming assessments.</Typography>
              </div>
              <div className={classes.heading}>
                <InsertEmoticonIcon className={classes.icon} />
                <Typography variant="h6">
                  Keep everything in one place.
                </Typography>
              </div>
              <div className={classes.signature}>
                <Typography variant="caption">
                  Created by Tom Ierino.
                </Typography>
              </div>
            </div>
          </Grid>
        </Hidden>
        {/* Right side */}
        <Grid
          item
          xs={12}
          sm={7}
          md={6}
          className={classes.rightSide}
          component={Paper}
          elevation={6}
        >
          <QuickSignIn />
          <Signup />
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

export default withRouter(connect(mapStateToProps)(Landing));
