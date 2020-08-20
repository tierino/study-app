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
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";

function Assessment(props) {
  const [complete, setComplete] = useState(props.assessment.isComplete);

  function handleAssessmentToggle(id) {
    axios.post("/units/toggle_assessment", {
      assessmentId: id,
      toggleType: !complete,
    });
    setComplete(!complete);
  }

  return (
    <ListItem
      button
      onClick={() => handleAssessmentToggle(props.assessment.id)}
      value={props.assessment.name}
    >
      <ListItemIcon>
        <Checkbox checked={complete} />
      </ListItemIcon>
      <ListItemText secondary={`${props.assessment.weight}%`}>
        {props.assessment.name}
      </ListItemText>
    </ListItem>
  );
}

export default Assessment;
