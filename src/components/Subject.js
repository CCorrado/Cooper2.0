import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from "@material-ui/core/styles";
import { changeSelectedSubject } from '../actions/index';
import { getCoursesBySubID } from '../actions/index';
import Select from 'react-select';
import PropTypes from "prop-types";
import { Grid } from '@material-ui/core';

function mapDispatchToProps(dispatch) {
  return {
    changeSelectedSubject: sub_id => dispatch(changeSelectedSubject(sub_id)),
    getCoursesBySubID: sub_id => dispatch(getCoursesBySubID(sub_id))
  };
}

const styles = theme => ({
    grid:{
        marginTop:theme.spacing.unit*5
    },
    nativeSelect:{
        width:'100%',
        backgroundColor: theme.palette.background.paper,
    },
    root: {
      flexGrow: 1,
      margin: theme.spacing.unit
    },
});

class ConnectedSubject extends Component {

  constructor(props) {
    super(props);
    this.state = { subjects: [], selectedSubject: ""};
  }

  componentDidMount() {
    fetch('http://localhost:3200/subjects')
          .then(response => response.json())
          .then(subjects => this.setState({subjects}))
  }

  handleSubjectChange = (sub_id) => {
    this.props.changeSelectedSubject(sub_id);
    this.props.getCoursesBySubID(sub_id);
  }

  render() {
    const { classes } = this.props;
    const options = this.state.subjects.map( subject => { return {value: subject.id, label: subject.sub_name} } );

    return (<Grid className={classes.grid}>
              <Select options = { options } 
                      onChange = { option => this.handleSubjectChange(option.value) }>
              </Select>
            </Grid>);
  }
}

ConnectedSubject.propTypes = {
  classes: PropTypes.object.isRequired
};

const Subject = connect(null, mapDispatchToProps)(ConnectedSubject);

export default withStyles(styles) (Subject);