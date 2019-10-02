import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";

import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import CourseInShortlist from './CourseInShortlist';
import CourseReview from './CourseReview';


const apiserver = 'http://localhost:3200';
const styles = theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  }
});

class MyProfile extends React.Component {
  state = {
    shortlistopen: false,
    termlist1open: false,
    termlist2open: false,
    shortlist:[],
    passedlist:[],
  };

  componentDidMount() {
    const data = {
      student_id : sessionStorage.getItem('student_id'),
    };
    console.log('MyProfile is mounted');
    fetch(apiserver + '/getshortlist/', {
      method: "POST",
      body: JSON.stringify(data),
      headers: {"Content-Type": "application/json"}
    })
    .then(response => response.json())
    .then(total => {
      this.setState({shortlist: total})
      fetch(apiserver + '/passedcourselist/', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {"Content-Type": "application/json"}
      })
      .then(response => response.json())
      .then(total => this.setState({passedlist:total}))
    });
  }

  handleClick = (e) => {
    if (e =='shortlist') {
      this.setState(state => ({ shortlistopen: !state.shortlistopen }));
    }
    if (e =='termlist1') {
      this.setState(state => ({ termlist1open: !state.termlist1open }));
    }
    if (e =='termlist2') {
      this.setState(state => ({ termlist2open: !state.termlist2open }));
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <List
        component="nav"

        className={classes.root}
      >
        <ListItem button onClick={() => this.handleClick('shortlist')}>
          <ListItemText inset primary="ShortList" />
          {this.state.shortlistopen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.shortlistopen} timeout="auto" unmountOnExit>
        {this.state.shortlist.map(course => (<CourseInShortlist key={course.course_name} data={course}/>))}
        </Collapse>
        <ListItem button onClick={() => this.handleClick('termlist1')}>
          <ListItemText inset primary="Spring 2019" />
          {this.state.termlist1open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.termlist1open} timeout="auto" unmountOnExit>
        {this.state.passedlist.map(course => (<CourseReview key={course.course_name} data={course}/>))}
        </Collapse>
      </List>
    );
  }
}

MyProfile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MyProfile);
