import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import shortid from "shortid";

import Assessment from "./Assessment";
import AddAssessment from "./AddAssessment";
import UnitMenu from "./UnitMenu";
import { fetchUser, selectUnit } from "../../actions";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import DeleteIcon from "@material-ui/icons/Delete";
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
}));

function DetailView(props) {
  const classes = useStyles();

  const [assessments, setAssessments] = useState([]);
  const [average, setAverage] = useState("N/A");

  useEffect(() => {
    if (props.unit) {
      props.fetchUser();
      axios.get("/units/find", { params: { name: props.unit.name } });
      // Could be a better/faster alternative but OK for now
      setAssessments(
        props.user.assessments.filter((assessment) => {
          return assessment.unit === props.unit.name;
        })
      );
      //setAverage(calcAverage());
    }
  }, [props.unit, props.user.assessments.length]);

  function calcAverage() {
    let sumWeights = 0;
    let sumProducts = 0;

    assessments.map((assessment) => {
      if (assessment.isComplete) {
        sumWeights += parseFloat(assessment.weight);
      }
    });

    assessments.map((assessment) => {
      if (assessment.isComplete) {
        sumProducts +=
          parseFloat(assessment.grade) * parseFloat(assessment.weight);
      }
    });

    if (sumWeights > 0) {
      return sumProducts / sumWeights;
    }
    return "N/A";
  }

  if (!props.unit) {
    return <Typography>No unit selected</Typography>;
  }

  return (
    <div>
      <div className={classes.header}>
        <Typography variant="h4">{props.unit.name}</Typography>
        <UnitMenu unit={props.unit} />
      </div>
      <Divider style={{ marginTop: "8px", marginBottom: "8px" }} />
      <Typography variant="h6">Current grade: {calcAverage()}</Typography>
      <Typography variant="h6">Assessments</Typography>
      <div id="assessment-list">
        {assessments.map((assessment) => {
          return (
            <Assessment key={shortid.generate()} assessment={assessment} />
          );
        })}
      </div>
      <AddAssessment />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    unit: state.selectedUnit,
  };
}

export default connect(mapStateToProps, { fetchUser, selectUnit })(DetailView);
