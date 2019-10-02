import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Paper from "@material-ui/core/Paper";

import { deleteCourse } from '../actions/index';

const styles = theme => ({
  list: {
    marginTop: theme.spacing.unit*5,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

const mapStateToProps = state => {
  
  return { selectedCourses: state.selectedCourses };

};

function mapDispatchToProps(dispatch) {
  return {
    deleteCourse: (course_name) => dispatch(deleteCourse(course_name))
  };
}

class ConnectedCourseList extends Component {
 
  constructor(props) {
    super(props);
    this.state = { checked: [0] };
  }

  // handleToggle = value => () => {
  //   const { checked } = this.state;
  //   const currentIndex = checked.indexOf(value);
  //   const newChecked = [...checked];

  //   if (currentIndex === -1) {
  //     newChecked.push(value);
  //   } else {
  //     newChecked.splice(currentIndex, 1);
  //   }

  //   this.setState({
  //     checked: newChecked,
  //   });

  //   console.log(checked);
  // };

  handleCourseDelete = (course_name) => {
    console.log(course_name);
    this.props.deleteCourse(course_name);
  }

  render() {
    const { classes, selectedCourses} = this.props;
    
    console.log('asfdasfsaf');
    console.log(selectedCourses);

    if (selectedCourses.length) {
      return (
        <List className={classes.list}>

          { selectedCourses.map(section => (
              <ListItem key={section.course_name}>
                <ListItemText primary={`${section.course_name}`}/>
                <ListItemSecondaryAction>
                  <IconButton aria-label="Delete" onClick={ () => this.handleCourseDelete(section.course_name) }>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
          )) }

        </List>
      );
    }
    else return(
      <Paper></Paper>
    )
  }
}

ConnectedCourseList.propTypes = {
  classes: PropTypes.object.isRequired,
};

const CourseList = connect(mapStateToProps, mapDispatchToProps)(ConnectedCourseList);

export default withStyles(styles)(CourseList);

          // <Checkbox
          //   checked={this.state.checked.indexOf(course.id) !== -1}
          //   tabIndex={-1}
          //   disableRipple
          // />