import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchUser } from "../../actions";

import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Menu from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
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
    transform: "translateX(-5%) translateY(4.5%)",
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

  // Delete dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

  function handleDeleteDialogOpen() {
    setDeleteDialogOpen(true);
  }

  function handleDeleteDialogClose() {
    setDeleteDialogOpen(false);
  }

  // Menu state
  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  async function handleDelete(assessmentName) {
    await axios.post("/units/delete_assessment", assessmentName);
    props.fetchUser();
  }

  return (
    <div className={classes.root}>
      <Dialog
        maxWidth="xs"
        fullWidth={true}
        open={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
      >
        <DialogTitle>Delete this unit?</DialogTitle>
        <Divider />
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>Cancel</Button>
          <Button onClick={handleDelete} variant="contained" color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
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
          Rename
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            handleDeleteDialogOpen();
          }}
        >
          <ListItemIcon>
            <DeleteIcon color="secondary" />
          </ListItemIcon>
          <Typography color="secondary">Delete</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}

function mapStateToProps(state) {
  return { user: state.auth.user };
}

export default connect(mapStateToProps, { fetchUser })(AccountMenu);
