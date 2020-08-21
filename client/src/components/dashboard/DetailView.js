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

  useEffect(() => {
    if (props.unit) {
      // Could be a better/faster alternative but OK for now
      setAssessments(
        props.user.assessments.filter((assessment) => {
          return assessment.unit === props.unit.name;
        })
      );
    }
  }, [props.unit, props.user.assessments.length]);

  if (!props.unit) {
    return <div>No unit selected</div>;
  }

  return (
    <div>
      <div className={classes.header}>
        <Typography variant="h4">{props.unit.name}</Typography>
        <UnitMenu />
      </div>
      <Divider style={{ marginTop: "8px", marginBottom: "8px" }} />
      <Typography variant="h6">
        Current grade: {props.unit.currentGrade || "N/A"}
      </Typography>
      <Typography variant="h6">Unit progress: {props.unit.progress}</Typography>
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
