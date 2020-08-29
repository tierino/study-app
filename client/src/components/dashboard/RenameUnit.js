import React from "react";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import axios from "axios";

import { fetchUser, fetchUnit } from "../../actions";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import MenuItem from "@material-ui/core/MenuItem";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

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

function RenameUnit(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function onSubmit(formProps) {
    const { newName } = formProps;
    if (newName.trim().length > 0) {
      await axios.post("/units/rename", {
        oldName: props.unit.name,
        newName,
      });
      await props.fetchUser();
      props.fetchUnit(newName);
    }
  }

  function renderButton() {
    return (
      <MenuItem button onClick={handleClickOpen}>
        <ListItemIcon>
          <EditIcon />
        </ListItemIcon>
        <ListItemText>Rename</ListItemText>
      </MenuItem>
    );
  }

  return (
    <div>
      {renderButton()}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={props.handleSubmit(onSubmit)}>
          <DialogTitle id="form-dialog-title">Enter the new name</DialogTitle>
          <DialogContent>
            <Field
              name="newName"
              component={renderTextField}
              label="New unit name"
              autoComplete="off"
              inputProps={{
                maxLength: MAX_NAME_LEN,
              }}
              autoFocus
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" onClick={handleClose} color="primary">
              Rename
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
    unit: state.selectedUnit,
  };
}

export default compose(
  connect(mapStateToProps, { fetchUser, fetchUnit }),
  reduxForm({ form: "renameUnit" })
)(RenameUnit);
