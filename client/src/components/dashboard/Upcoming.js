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

function Upcoming(props) {
  // Sort upcoming assessments by closest due date
  function sortByDate(upcoming) {
    const n = upcoming.length;
    // Selection sort
    for (let i = 0; i < n; i++) {
      let min = i;
      for (let j = i + 1; j < n; j++) {
        if (upcoming[min].dueDate > upcoming[j].dueDate) {
          min = j;
        }
      }
      if (min !== i) {
        let tmp = upcoming[i];
        upcoming[i] = upcoming[min];
        upcoming[min] = tmp;
      }
    }
    return upcoming;
  }

  function renderUpcoming() {
    let upcoming = [];

    // Get assessments with due dates in the future
    upcoming = props.user.assessments.filter((assessment) => {
      return assessment.dueDate - Date.now() > 0 && !assessment.isComplete;
    });

    if (upcoming.length > 0) {
      upcoming = sortByDate(upcoming);

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
        <div>
          <Typography variant="body2" style={{ color: "grey" }}>
            Nothing upcoming!
          </Typography>
          <Typography variant="caption" style={{ color: "grey" }}>
            When you have upcoming assessments for any units, they will appear
            here.
          </Typography>
        </div>
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
