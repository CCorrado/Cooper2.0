import React , { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar';
import deepPurple from '@material-ui/core/colors/deepPurple';

import green from '@material-ui/core/colors/green';

import CoursePanel from './CoursePanel';
import MyProfile from './MyProfile';
import { getCoursesFromOffset } from '../actions/index';
import NavBar from './NavBar';

const styles = theme => ({
  layout: {
    width: 'auto',
    marginTop: '72px',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  toolbarMain: {
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
  },
  appbar: {
    backgroundColor: '#FFF7E4',
    borderBottom: `solid 3px #998643`
  },
  mainFeaturedPost: {
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing.unit * 4,
  },
  mainGrid: {
    marginTop: theme.spacing.unit * 0,
  },
  footer: {
    marginTop: theme.spacing.unit * 1,
    padding: `${theme.spacing.unit * 6}px 0`,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  fabProgress: {
    color: green[500],
    position: 'relative',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  link: {
    underline: 'none',
  },
  purpleAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepPurple[500],
  },
});

const apiserver = 'http://localhost:3200';
const sections = [
  {link: '/grid', label: 'Scheduling'},
  {link: '/courses', label: 'Profile'},
  {link: '/explore', label: 'Explore Course'},
  {link: '/grid', label: 'Opinion'},
  {link: '/grid', label: 'About'},
];

function mapDispatchToProps(dispatch) {
  return {
    getCoursesFromOffset: offset => dispatch(getCoursesFromOffset(offset))
  };
}

const mapStateToProps = state => {

  return { courses: state.ajaxCourses, studentInfo: state.studentInfo, passedlist:[] };

};

class ConnectedMyCourses extends Component  {
    constructor(props) {
      super(props);
      this.state = { courses: [], total: 0, offset: 0, isLoading: false };
    }
    render () {
      if (sessionStorage.getItem('Access')) {
        const { classes } = this.props;
        console.log('My courses rendered.');
        return(
              <div>
                <NavBar />
                <React.Fragment key={'course'}>
                  <CssBaseline />
                  <div className={classes.layout}>
                    <main>
                      <Grid container spacing={24} className={classes.mainGrid}>
                        <Grid item xs={12} md={12}>
                          <Typography variant="h4" gutterBottom>
                            My Courses
                          </Typography>
                          <Divider />
                        </Grid>
                        <Grid item xs={12} md={12}>
                          <MyProfile />
                        </Grid>
                      </Grid>
                    </main>
                  </div>
                </React.Fragment>
              </div>
        );
      }
      return (
        <div className="container">
            <div className="container" >
                <NavBar />
            </div>
            <div className="container bg-white border border-warning" style= {{ margin: "72px 0px 10px 0px", borderRadius: 10, padding: "10px 20px 10px 20px"}}>
            <h4 className="text-warning text-center">Message</h4>    
            <h1 className="text-center">Authentication required</h1>
            <h5 className="text-warning text-center">Please login first to access your Courses </h5>
            </div>
        </div>
      );
    }
}

ConnectedMyCourses.propTypes = {
  classes: PropTypes.object.isRequired,
};

const MyCourses = connect(mapStateToProps, mapDispatchToProps)(ConnectedMyCourses);

export default withStyles(styles)(MyCourses);
