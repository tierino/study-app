/*****************************************************************
 * Detailed overview of the selected unit. Manage assessments and
 * weighted average.
 *****************************************************************/

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import shortid from "shortid";
import numeral from "numeral";

import Assessment from "./Assessment";
import AddUnit from "./AddUnit";
import AddAssessment from "./AddAssessment";
import { ReactComponent as Hat } from "../../images/gradcap.svg";
import UnitMenu from "./UnitMenu";
import { fetchUnit, fetchUser, fetchAssessments } from "../../actions";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import Divider from "@material-ui/core/Divider";
import Alert from "@material-ui/lab/Alert";
import RefreshIcon from "@material-ui/icons/Refresh";
import DeleteIcon from "@material-ui/icons/Delete";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import TimelineIcon from "@material-ui/icons/Timeline";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
  header: {
    marginTop: theme.spacing(2),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  alert: {
    marginBottom: theme.spacing(2),
  },
  noUnitSelected: {
    marginTop: theme.spacing(22),
    alignContent: "center",
    textAlign: "center",
  },
  gradeContainer: {
    textAlign: "center",
    marginTop: theme.spacing(2),
  },
  noAssessments: {
    marginTop: "8px",
    color: "grey",
  },
  noUnits: {
    marginTop: theme.spacing(30),
    textAlign: "center",
  },
}));

function UnitOverview(props) {
  const classes = useStyles();

  useEffect(() => {
    // Fetch assessments on mount
    if (props.unit) {
      props.fetchAssessments(props.unit.name);
    }
  }, [props.unit]);

  // Calculate the unit's average. Do this on the fly rather than storing
  // it in the database to reduce API requests.
  function calcAverage() {
    let sumWeights = 0;
    let sumProducts = 0;

    if (props.assessments) {
      props.assessments.map((assessment) => {
        if (assessment.isComplete) {
          sumWeights += parseFloat(assessment.weight);
        }
      });

      props.assessments.map((assessment) => {
        if (assessment.isComplete) {
          sumProducts +=
            parseFloat(assessment.grade) * parseFloat(assessment.weight);
        }
      });

      if (sumWeights > 0) {
        return sumProducts / sumWeights;
      }
    }
    return "Grade not available";
  }

  // Render the list of assessments for the selected unit
  function renderAssessments() {
    if (props.assessments) {
      if (props.assessments.length > 0) {
        return props.assessments.map((assessment) => {
          return (
            <Assessment key={shortid.generate()} assessment={assessment} />
          );
        });
      } else {
        return (
          <div className={classes.noAssessments}>
            <Typography variant="caption">
              <i>You haven't added any assessments for this unit.</i>
            </Typography>
          </div>
        );
      }
    } else {
      return <CircularProgress />;
    }
  }

  // Render alert for assessment weights that total > 100
  function renderAlert() {
    let sumWeights = 0;
    if (props.assessments) {
      props.assessments.map((assessment) => {
        sumWeights += parseFloat(assessment.weight);
      });
    }

    if (sumWeights > 100)
      return (
        <Alert className={classes.alert} severity="warning">
          Assessment weights for this unit total over 100.
        </Alert>
      );
  }

  // If there are no units, show this (new user will see this)
  if (props.user.units.length === 0) {
    return (
      <div className={classes.noUnits}>
        <Typography variant="h6">It's empty in here...</Typography>
        <Typography variant="body2">
          Get started by adding some units!
        </Typography>
        <br />
        <AddUnit />
      </div>
    );
  }
  // If no selectedUnit is in app state, show this. This is shown after a
  // unit is deleted
  else if (!props.unit) {
    return (
      <div className={classes.noUnitSelected}>
        <Hat style={{ fill: "#78909c" }} />
        <Typography>Select a unit to see it in detail!</Typography>
      </div>
    );
  }
  // Normal overview
  return (
    <div>
      <Typography>UNIT OVERVIEW</Typography>
      <div className={classes.header}>
        <Typography variant="h5">{props.unit.name}</Typography>
        <UnitMenu unit={props.unit} />
      </div>
      <Divider style={{ marginTop: "8px", marginBottom: "8px" }} />
      <div className={classes.gradeContainer}>
        <TimelineIcon color="primary" />
        <Tooltip title="Your weighted average" placement="top">
          <Typography variant="h4" color="primary">
            {numeral(calcAverage()).format("0.00")}
          </Typography>
        </Tooltip>
      </div>
      <Typography variant="h6">Assessments</Typography>
      {renderAssessments()}
      {renderAlert()}
      <AddAssessment />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    unit: state.selectedUnit,
    assessments: state.unitAssessments,
  };
}

export default connect(mapStateToProps, {
  fetchUnit,
  fetchUser,
  fetchAssessments,
})(UnitOverview);
