import React from "react";
import { connect } from "react-redux";
import shortid from "shortid";

import AddUnit from "./AddUnit";

import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";

const useStyles = makeStyles((theme) => ({
  small: {
    backgroundColor: "#fafafa",
    //color: "white",
    fontWeight: "bold",
    width: theme.spacing(3),
    height: theme.spacing(3),
    fontSize: "1em",
  },
}));

function UnitList(props) {
  const classes = useStyles();

  function renderUnits() {
    return props.user.units.map((unit) => {
      return (
        <ListItem button key={shortid.generate()}>
          <ListItemIcon>
            <Avatar className={classes.small} color="primary">
              {unit.name.charAt(0).toUpperCase()}
            </Avatar>
          </ListItemIcon>
          <ListItemText>{unit.name}</ListItemText>
        </ListItem>
      );
    });
  }

  return (
    <div>
      <ListSubheader>UNITS</ListSubheader>
      {renderUnits()}
      <AddUnit />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
  };
}

export default connect(mapStateToProps)(UnitList);
