import React, { useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { reduxForm, Field } from "redux-form";

import requireAuth from "../requireAuth";
import UnitList from "./UnitList";
import AddUnit from "./AddUnit";
import DetailView from "./DetailView";
import Upcoming from "./Upcoming";
import AccountMenu from "./AccountMenu";
import { fetchUser, fetchUnit } from "../../actions";

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import DeleteIcon from "@material-ui/icons/Delete";

const drawerWidth = 240;
const dashHeight = 640;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: dashHeight,
  },
  halfHeight: {
    height: dashHeight / 2 - 12,
  },
  noUnitsContainer: {
    marginTop: theme.spacing(32),
    textAlign: "center",
  },
}));

function Homee(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  useEffect(() => {
    if (props.units) {
      props.fetchUnit(props.user.units[0].name);
    }
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const halfHeightPaper = clsx(classes.paper, classes.halfHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Study App
          </Typography>
          <AccountMenu />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <UnitList />
        </List>
        <Divider />
        <List></List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={7} lg={8}>
              <Paper className={fixedHeightPaper}>
                {props.user.units.length > 0 ? (
                  <DetailView />
                ) : (
                  <div className={classes.noUnitsContainer}>
                    <Typography variant="h5">It's empty in here...</Typography>
                    <Typography>Get started by adding some units!</Typography>
                    <AddUnit />
                  </div>
                )}
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={5} lg={4}>
              <Grid container direction="column" spacing={3}>
                <Grid item xs={12}>
                  <Paper className={halfHeightPaper}>
                    <Upcoming />
                  </Paper>
                </Grid>
                {/* Recent Orders */}
                <Grid item xs={12}>
                  <Paper className={halfHeightPaper}>OVERVIEW</Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
        <div style={{ textAlign: "center" }}>
          <Typography style={{ color: "grey" }}>
            Hello, {props.user.givenName}.
          </Typography>
        </div>
      </main>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    selectedUnit: state.selectedUnit,
  };
}

// Wrap in requireAuth HOC
export default connect(mapStateToProps, { fetchUser, fetchUnit })(
  requireAuth(Homee)
);
