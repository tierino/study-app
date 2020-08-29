/*****************************************************************
 * Shows upcoming assessments for all units.
 *****************************************************************/

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import shortid from "shortid";
import numeral from "numeral";
import moment from "moment";

import Assessment from "./Assessment";
import AddAssessment from "./AddAssessment";
import { ReactComponent as Hat } from "../../images/gradcap.svg";
import UnitMenu from "./UnitMenu";
import { fetchUnit, fetchUser, fetchAssessments } from "../../actions";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Alert from "@material-ui/lab/Alert";
import RefreshIcon from "@material-ui/icons/Refresh";
import DeleteIcon from "@material-ui/icons/Delete";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({}));

function Upcoming(props) {
  const classes = useStyles();

  function renderUpcoming() {
    let upcoming = [];

    upcoming = props.user.assessments.filter((assessment) => {
      // Only get assessments with due dates in the future
      return assessment.dueDate - Date.now() > 0;
    });

    if (upcoming.length > 0) {
      return upcoming
        .slice(Math.max(upcoming.length - 5, 0))
        .map((assessment) => {
          return (
            <div key={shortid.generate()}>
              <ListItem>
                <ListItemIcon>
                  <ArrowRightIcon />
                </ListItemIcon>
                <ListItemText
                  primary={`${assessment.name} (${moment(
                    assessment.dueDate
                  ).fromNow()})`}
                  secondary={`${moment(assessment.dueDate).format(
                    "MMM Do"
                  )} · ${assessment.unit}`}
                />
              </ListItem>
              <Divider variant="middle" />
            </div>
          );
        });
    } else {
      return (
        <Typography variant="caption" style={{ color: "grey" }}>
          <i>Your upcoming assessments for all units will appear here.</i>
        </Typography>
      );
    }
  }

  return (
    <div>
      <Typography>UPCOMING</Typography>
      <List>{renderUpcoming()}</List>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
  };
}

export default connect(mapStateToProps, {})(Upcoming);
