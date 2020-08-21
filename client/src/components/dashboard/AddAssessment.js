import React from "react";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import shortid from "shortid";
import axios from "axios";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";

import { fetchUser, selectUnit } from "../../actions";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const MAX_NAME_LEN = 20;

// Field renderer so Material-UI works with Redux Form
const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    label={label}
    fullWidth
    margin="normal"
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
);

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

function AddAssessment(props) {
  // Local state
  const [open, setOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(Date.now());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function onSubmit(formProps) {
    const { assessmentName, weight } = formProps;
    if (assessmentName && weight) {
      await axios.post("/units/add_assessment", {
        id: shortid.generate(),
        unit: props.selectedUnit.name,
        name: assessmentName,
        weight,
        dueDate: selectedDate,
      });
      props.fetchUser();
    }
  }

  return (
    <div>
      <Button onClick={handleClickOpen}>Add assessment</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={props.handleSubmit(onSubmit)}>
          <DialogTitle id="form-dialog-title">Add an assessment</DialogTitle>
          <DialogContent>
            <Field
              name="assessmentName"
              component={renderTextField}
              label="Name"
              autoComplete="off"
              inputProps={{
                maxLength: MAX_NAME_LEN,
              }}
              autoFocus
              required
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-around">
                <KeyboardDatePicker
                  autoOk
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Due date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
            <Field
              name="weight"
              component={renderNumField}
              label="Weighting (%)"
              autoComplete="off"
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" onClick={handleClose} color="primary">
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    error: state.auth.error,
    selectedUnit: state.selectedUnit,
  };
}

export default compose(
  connect(mapStateToProps, { fetchUser, selectUnit }),
  reduxForm({ form: "addAssessment" })
)(AddAssessment);
