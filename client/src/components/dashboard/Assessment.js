import React, { useEffect, useState } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import axios from "axios";
import { reduxForm, Field } from "redux-form";
import shortid from "shortid";

import AddAssessment from "./AddAssessment";
import UnitMenu from "./UnitMenu";
import { fetchUser, selectUnit } from "../../actions";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CheckIcon from "@material-ui/icons/Check";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Popover from "@material-ui/core/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";

// Field renderer so Material-UI works with Redux Form
const renderNumField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
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
  // isComplete state (component-level state for less laggy feel)
  const [complete, setComplete] = useState(props.assessment.isComplete);

  // Popover state
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    if (complete) {
      handleAssessmentToggle();
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  function handleGradeSubmit(formProps) {
    // e.preventDefault();
    const { grade } = formProps;
    console.log(grade);
    if (grade.trim().length > 0 && !isNaN(grade)) {
      handleAssessmentToggle(props.assessment.id);
    }
    handleClose();
  }

  function handleAssessmentToggle(id) {
    axios.post("/units/toggle_assessment", {
      assessmentId: id,
      grade: null,
      toggleType: !complete,
    });
    // Invert complete
    setComplete(!complete);
  }

  function getSecondaryText() {
    if (!complete) {
      return `${props.assessment.weight}%`;
    }
    return `${props.assessment.weight}% · Complete (${props.assessment.grade}%)`;
  }

  async function handleDelete(id) {
    await axios.post("/units/remove_assessment", { assessmentId: id });
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
          <Checkbox checked={complete} />
        </ListItemIcon>
        <ListItemText secondary={getSecondaryText()}>
          {props.assessment.name}
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
        <Paper style={{ padding: "8px" }}>
          <form onSubmit={props.handleSubmit(handleGradeSubmit)}>
            <Field
              name="grade"
              component={renderNumField}
              label="Grade"
              autoComplete="off"
              autoFocus
            />
            <Button type="submit">Ok</Button>
          </form>
        </Paper>
      </Popover>
    </div>
  );
}

export default compose(
  connect(null, { fetchUser }),
  reduxForm({ form: "grade" })
)(Assessment);
