import React, { Component } from 'react';
import { connect } from 'react-redux';

import Select from 'react-select';
import PropTypes from "prop-types";
import { changeSelectedCourse } from '../actions/index';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    grid:{
        marginTop:theme.spacing.unit*5
    },
});

const mapStateToProps = state => {
  
  return { courses: state.courses };

};

function mapDispatchToProps(dispatch) {
  return {
    changeSelectedCourse: (course) => dispatch(changeSelectedCourse(course))
  };
}

class ConnectedCourse extends Component {
  constructor(props) {
    super(props);
    // this.state = { selectedCourse: '', courses: [] };
  }

  componentDidMount() {
  }

  handleCourseSelect = ( course ) => {
    this.props.changeSelectedCourse(course);
  }

  render() {
    const { classes } = this.props;
    const options = this.props.courses.map( course => { return {value: course, label: course.course_name } } );

    return (  <Select options = { options }
                      onChange = { option => this.handleCourseSelect(option.value) }
                      className = { classes.grid }
              >
              </Select>
            );
  }
}
ConnectedCourse.propTypes = {
  classes: PropTypes.object.isRequired
};
const Course = connect(mapStateToProps, mapDispatchToProps)(ConnectedCourse);
export default withStyles(styles)(Course);