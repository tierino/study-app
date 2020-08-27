import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/Edit";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Menu from "@material-ui/core/Menu";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import Dialog from "@material-ui/core/Dialog";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    "&:focus": {
      outline: "0px",
    },
  },
  menuContent: {
    color: "white",
  },
  menu: {
    //marginTop: theme.spacing(5),
    transform: "translateX(-0.5%) translateY(3.5%)",
  },
  avatar: {
    marginRight: theme.spacing(2),
    color: "#78909c",
    backgroundColor: "#fafafa",
  },
}));

function AccountMenu(props) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  // Signout dialog state
  const [signoutDialogOpen, setSignoutDialogOpen] = React.useState(false);

  function handleSignoutDialogOpen() {
    setSignoutDialogOpen(true);
  }

  function handleSignoutDialogClose() {
    setSignoutDialogOpen(false);
  }

  // Menu state
  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose(event) {
    setAnchorEl(null);
  }

  return (
    <div className={classes.root}>
      <Dialog
        maxWidth="xs"
        fullWidth={true}
        open={signoutDialogOpen}
        onClose={handleSignoutDialogClose}
      >
        <DialogTitle>Are you sure you want to sign out?</DialogTitle>
        <Divider />
        <DialogActions>
          <Button onClick={handleSignoutDialogClose}>Cancel</Button>
          <a href="/auth/signout" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="secondary">
              Sign out
            </Button>
          </a>
        </DialogActions>
      </Dialog>
      <Button
        startIcon={<AccountCircleIcon />}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        {props.user.givenName}
      </Button>
      <Menu
        className={classes.menu}
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          Change username
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            handleSignoutDialogOpen();
          }}
        >
          <ListItemIcon>
            <ExitToAppIcon color="secondary" />
          </ListItemIcon>
          <Typography color="secondary">Sign out</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}

function mapStateToProps(state) {
  return { user: state.auth.user };
}

export default connect(mapStateToProps)(AccountMenu);
