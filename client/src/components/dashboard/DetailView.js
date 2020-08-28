import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import shortid from "shortid";
import numeral from "numeral";

import Assessment from "./Assessment";
import AddAssessment from "./AddAssessment";
import { ReactComponent as Hat } from "../../images/gradcap.svg";
import UnitMenu from "./UnitMenu";
import { fetchUnit, fetchUser, fetchAssessments } from "../../actions";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Alert from "@material-ui/lab/Alert";
import RefreshIcon from "@material-ui/icons/Refresh";
import DeleteIcon from "@material-ui/icons/Delete";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
  },
  alert: {
    marginBottom: theme.spacing(2),
  },
  placeholder: {
    marginTop: theme.spacing(16),
    alignContent: "center",
    textAlign: "center",
  },
}));

function DetailView(props) {
  const classes = useStyles();

  useEffect(() => {
    if (props.unit) {
      props.fetchAssessments(props.unit.name);
    }
  }, [props.unit]);

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
    return "N/A";
  }

  function renderAssessments() {
    if (props.assessments) {
      return props.assessments.map((assessment) => {
        return <Assessment key={shortid.generate()} assessment={assessment} />;
      });
    }
  }

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

  if (!props.unit) {
    return (
      <div className={classes.placeholder}>
        <Hat style={{ fill: "#78909c" }} />
        <Typography variant="h6">Select a unit to see it in detail!</Typography>
      </div>
    );
  }

  return (
    <div>
      <div className={classes.header}>
        <Typography variant="h4">{props.unit.name}</Typography>
        <UnitMenu unit={props.unit} />
      </div>
      <Divider style={{ marginTop: "8px", marginBottom: "8px" }} />
      <Typography variant="h5">
        Current grade {numeral(calcAverage()).format("0.00")}
      </Typography>
      <Typography variant="h5">Assessments</Typography>
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
})(DetailView);
