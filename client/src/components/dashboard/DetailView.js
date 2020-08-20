import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import shortid from "shortid";

import AddAssessment from "./AddAssessment";
import UnitMenu from "./UnitMenu";
import { fetchUser, selectUnit } from "../../actions";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";

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

  async function handleDelete(name) {
    await axios.post("/units/remove", { name: name });
    props.fetchUser();
  }

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
      <Typography>Current grade: {props.unit.currentGrade}</Typography>
      <Typography>Unit progress: {props.unit.progress}</Typography>
      <Typography>
        Assessments:
        {assessments.map((assessment) => {
          return <li key={shortid.generate()}>{assessment.name}</li>;
        })}
      </Typography>
      <AddAssessment />
      <Button variant="contained" onClick={() => handleDelete(props.unit.name)}>
        Delete
      </Button>
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
