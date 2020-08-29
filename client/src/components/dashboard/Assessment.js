import React, { useEffect, useState } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import axios from "axios";
import { reduxForm, Field } from "redux-form";
import shortid from "shortid";
import moment from "moment";

import AddAssessment from "./AddAssessment";
import UnitMenu from "./UnitMenu";
import { fetchUnit, fetchUser } from "../../actions";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import CheckIcon from "@material-ui/icons/Check";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import PieChartIcon from "@material-ui/icons/PieChart";
import Chip from "@material-ui/core/Chip";
import EventIcon from "@material-ui/icons/Event";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Popover from "@material-ui/core/Popover";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  gradeInput: {
    margin: 0,
  },
  gradePaper: {
    padding: theme.spacing(2),
  },
  submitGrade: {
    marginTop: theme.spacing(2),
  },
  chip: {
    marginRight: theme.spacing(1),
  },
}));

// Field renderer so Material-UI works with Redux Form
const renderNumField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    variant="outlined"
    label={label}
    type="number"
    fullWidth
    margin="normal"
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
);

function Assessment(props) {
  const classes = useStyles();

  // isComplete state
  const [complete, setComplete] = useState(props.assessment.isComplete);

  // Popover state
  const [anchorEl, setAnchorEl] = useState(null);

  // Grade state
  const [grade, setGrade] = useState(props.assessment.grade);

  const handleClick = (event) => {
    if (complete) {
      handleAssessmentToggle(props.assessment.id, null);
      props.fetchUser();
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "grade-popover" : undefined;

  function handleGradeSubmit(formProps) {
    const { enteredGrade } = formProps;
    if (enteredGrade) {
      // Send the data to the toggle handler
      setGrade(enteredGrade);
      handleAssessmentToggle(props.assessment.id, enteredGrade);
      props.fetchUser();
    }
    handleClose();
  }

  async function handleAssessmentToggle(id, grade) {
    // Toggle the assessment in the database
    await axios.post("/units/toggle_assessment", {
      assessmentId: id,
      grade,
      toggleType: !complete,
    });
    // And change component-level state
    //setComplete(!complete);
    props.fetchUnit(props.selectedUnit.name);
  }

  function renderAttributes() {
    if (!complete) {
      return (
        <div className={classes.attributeContainer}>
          <Chip
            className={classes.chip}
            size="small"
            label={`Weighted ${props.assessment.weight}%`}
            icon={<PieChartIcon />}
          />
          <Chip
            className={classes.chip}
            size="small"
            label={`Due ${moment(props.assessment.dueDate).format("MMM Do")}`}
            icon={<EventIcon />}
          />
        </div>
      );
    } else {
      return (
        <div className={classes.attributeContainer}>
          <Chip
            className={classes.chip}
            size="small"
            label={`Weighted ${props.assessment.weight}%`}
            icon={<PieChartIcon />}
          />
          <Chip
            className={classes.chip}
            size="small"
            label={`Received ${grade}%`}
            icon={<CheckIcon />}
          />
        </div>
      );
    }
  }

  async function handleDelete(id) {
    await axios.post("/units/remove_assessment", { assessmentId: id });
    props.fetchUnit(props.selectedUnit.name);
    props.fetchUser();
  }

  return (
    <div>
      <ListItem
        ContainerComponent="div"
        button
        onClick={handleClick}
        // onClick={() => handleAssessmentToggle(props.assessment.id)}
        value={props.assessment.name}
      >
        <ListItemIcon>
          <Checkbox color="primary" checked={complete} />
        </ListItemIcon>
        <ListItemText>
          {props.assessment.name}
          {renderAttributes()}
        </ListItemText>
        <ListItemSecondaryAction>
          <IconButton onClick={() => handleDelete(props.assessment.id)}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <form onSubmit={props.handleSubmit(handleGradeSubmit)}>
          <Paper className={classes.gradePaper} variant="outlined">
            <Field
              InputProps={{ inputProps: { min: 0, max: 100 } }}
              className={classes.gradeInput}
              name="enteredGrade"
              component={renderNumField}
              label="Grade (%)"
              autoComplete="off"
              autoFocus
            />

            <Button
              className={classes.submitGrade}
              size="small"
              fullWidth
              color="primary"
              variant="contained"
              type="submit"
            >
              OK
            </Button>
          </Paper>
        </form>
      </Popover>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    selectedUnit: state.selectedUnit,
  };
}

export default compose(
  connect(mapStateToProps, { fetchUnit, fetchUser }),
  reduxForm({ form: "grade" })
)(Assessment);
