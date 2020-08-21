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

function Assessment(props) {
  // isComplete state (component-level state for less laggy feel)
  const [complete, setComplete] = useState(props.assessment.isComplete);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleAssessmentToggle(id) {
    axios.post("/units/toggle_assessment", {
      assessmentId: id,
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
        onClick={() => handleAssessmentToggle(props.assessment.id)}
        value={props.assessment.name}
      >
        <ListItemIcon>
          <Checkbox checked={complete} />
        </ListItemIcon>
        <ListItemText secondary={getSecondaryText()}>
          {props.assessment.name}
        </ListItemText>
        <TextField
          label="Grade"
          variant="outlined"
          style={{ marginRight: "24px" }}
        ></TextField>
        <ListItemSecondaryAction>
          <IconButton onClick={() => handleDelete(props.assessment.id)}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </div>
  );
}

export default connect(null, { fetchUser })(Assessment);
