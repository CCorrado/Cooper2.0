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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import green from '@material-ui/core/colors/green';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import CoursePanel from './CoursePanel';
import MyProfile from './MyProfile';
import { getCoursesFromOffset } from '../actions/index';
import NavBar from './NavBar';

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    marginTop: '72px',
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
  mainGrid: {
    marginTop: theme.spacing.unit * 0,
  },
  footer: {
    marginTop: theme.spacing.unit * 1,
    padding: `${theme.spacing.unit * 6}px 0`,
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



class CourseInfo extends Component  {

    constructor(props) {
      super(props);
      this.state = { course_name: '', commentlist:[], instructorlist:[]};
    }

    componentDidMount() {
      const { course_name } = this.props.match.params;
      this.setState({course_name:course_name});
      const data = {
        course_name : course_name,
      };

      fetch(apiserver + '/getCommentlist/', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {"Content-Type": "application/json"}
      })
      .then(response => response.json())
      .then(total =>{
        this.setState({commentlist:total});
        fetch(apiserver + '/getInstructorlist/', {
          method: "POST",
          body: JSON.stringify(data),
          headers: {"Content-Type": "application/json"}
        })
        .then(res => res.json())
        .then(result => this.setState({instructorlist:result}))
      })
    }

    render () {
      const { classes } = this.props;
      console.log(this.state.commentlist);
      

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
                          {this.state.course_name + "'s  comments"}
                        </Typography>
                        <Divider />
                      </Grid>
                      <Grid item xs={12} md={12}>
                      <List component="nav" className={classes.root}>

                      {this.state.commentlist.map(comment => (
                        <React.Fragment key = {comment.comment}>
                          <ListItem button divider>
                            <ListItemText primary={comment.comment} />
                          </ListItem>
                          <Divider/>
                        </React.Fragment>
                      ))}
                      </List>
                      <Typography variant="h4" gutterBottom>
                        professors
                      </Typography>
                      <List component="nav" className={classes.root}>

                      {this.state.instructorlist.map(instructor => (
                        <React.Fragment key = {instructor.Instructor}>
                          <Typography variant="h4" gutterBottom>
                            {instructor.Instructor}
                          </Typography>
                          <Grid item xs={6}>
                            clear: <Progress className={classes.prog} percent={instructor.rating > 0 ? Math.floor(100*instructor.clear/instructor.rating) : 0}/>
                            engaging: <Progress className={classes.prog} percent={instructor.rating > 0 ? Math.floor(100*instructor.engaging/instructor.rating) : 0}/>
                             {instructor.rating > 0 ? instructor.rating : 0}ratings
                          </Grid>
                          <Divider/>
                        </React.Fragment>
                      ))}
                      </List>

                      </Grid>
                    </Grid>
                  </main>
                </div>
              </React.Fragment>
        </div>
        );
    }

}

CourseInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CourseInfo);
