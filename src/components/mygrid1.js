import React from "react";
import { connect } from 'react-redux';

import { generate } from '../actions/index';

import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar'

import Subject from './Subject';
import Course from './Course';
import CourseList from './CourseList';
import MySchedule from './Timetable';
import NavBar from './NavBar';

import 'react-week-calendar/dist/style.less';

// import logo from "../logo_beta.png";

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: '8%'
  },
  root1: {
    width: '100%',
    maxWidth: 360,
    color:'white'
  },
  paper1: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    backgroundColor: '#003262',
    // width:'100%',
    // height:'100%',
    minHeight: '100vh',
    Height: '100vh',
    position:'relative'
  },
  image: {
    width:'100%',
  },
  paper2: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    width: '100%',
    minHeight: '100vh',
    Height: '100vh'
  },
  button: {
    // width:'100%',
    marginTop: theme.spacing.unit * 5 ,
    backgroundColor: 'yellow',
  },
  bigAvatar: {
      margin: -3,
      width: 230,
      height: 230,
  },
});

const mapStateToProps = state => {

  return { selectedCourses: state.selectedCourses, commitedCourses: state.commitedCourses };

};

function mapDispatchToProps(dispatch) {
  return {
    generate: () => dispatch(generate())
  };
}

class ConnectedCenteredGrid extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <div className="App">
      <NavBar />
      <Grid className={classes.root}>
        <Grid container spacing={0}>
          <Grid item xs={3}></Grid>
          <Grid item xs={2} >
            <Paper className={classes.paper1}>
              <Avatar alt="Lets Love French Bulldog." src="/bulldog.jpg" className={classes.bigAvatar} />
              <Subject />
              <Course />
              <CourseList/>
              <Button variant="outlined" size="small" className={classes.button} onClick={() => { this.props.generate() }}>
                  GENERATE SCHEDULES
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={4}>
            <Paper className={classes.paper2}>
              <MySchedule data={this.props.commitedCourses}/>
            </Paper>
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
      </Grid>
      </div>
    );
  }


}

const CenteredGrid = connect(mapStateToProps, mapDispatchToProps)(ConnectedCenteredGrid);

CenteredGrid.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(CenteredGrid);
