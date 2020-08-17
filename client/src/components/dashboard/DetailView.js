import React, { useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";

import { fetchUser, selectUnit } from "../../actions";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

function DetailView(props) {
  const classes = useStyles();

  useEffect(() => {
    props.selectUnit(props.user.units[props.user.units.length - 1]);
  }, [props.user.units.length]);

  async function handleDelete(name) {
    await axios.post("/units/remove", { name: name });
    props.fetchUser();
  }

  if (!props.unit) {
    return <div>No unit selected</div>;
  }

  return (
    <div>
      <Typography variant="h4">{props.unit.name}</Typography>
      <Typography>Current grade: {props.unit.currentGrade}</Typography>
      <Typography>Unit progress: {props.unit.progress}</Typography>
      <Typography>Assessments: {props.unit.assessments}</Typography>
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
