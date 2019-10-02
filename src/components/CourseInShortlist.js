import React from "react";
import PropTypes from "prop-types";
import classNames from 'classnames';
import { withStyles } from "@material-ui/core/styles";
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import Divider from '@material-ui/core/Divider';
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import green from '@material-ui/core/colors/green';
import orange from '@material-ui/core/colors/orange';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Select from 'react-select';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";

const apiserver = 'http://localhost:3200';
const styles = theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(40),
    flexBasis: "33.33%",
    flexShrink: 0
  }
});



const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0,0,0,.125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  },
  expanded: {
    margin: 'auto',
  },
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0,0,0,.03)',
    borderBottom: '1px solid rgba(0,0,0,.125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(props => <MuiExpansionPanelSummary {...props} />);

ExpansionPanelSummary.muiName = 'ExpansionPanelSummary';

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing.unit * 2,
  },
}))(MuiExpansionPanelDetails);


class CourseInShortlist extends React.Component {

  state = {
    expanded: null,
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  handledelClick =(course_id) => {
    const data = {
      student_id : sessionStorage.getItem('student_id'),
      course_id : course_id
    };

    fetch(apiserver + '/delshortlist/', {
      method: "POST",
      body: JSON.stringify(data),
      headers: {"Content-Type": "application/json"}
    })
  };

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;
    const useful = this.props.data.rating > 0 ? Math.floor(100*this.props.data.useful/this.props.data.rating) : 0;
    const easy = this.props.data.rating > 0 ? Math.floor(100*this.props.data.easy/this.props.data.rating) : 0;
    return (
      <React.Fragment key={this.props.data.course_name}>
        <ExpansionPanel
          square
          expanded={expanded === 'panel1'}
          onChange={this.handleChange('panel1')}
        >
          <ExpansionPanelSummary>
            <Typography  className={classes.heading}>{this.props.data.course_name}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container direction="row">
              <Grid container spacing={0} direction="column">
                <Grid item xs={6} sm={6}>
                  <Typography>
                    {this.props.data.summary}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <div>
                    <Grid item xs={8}>
                      useful: <Progress percent={useful}/>
                      easy: <Progress percent={easy}/>
                    </Grid>
                    <Grid item xs={4}>
                      {this.props.data.rating > 0 ? this.props.data.rating : 0}ratings
                    </Grid>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
          <ExpansionPanelActions>
            <Button color="secondary" variant="contained" onClick={() => this.handledelClick(this.props.data.course_id)} size="small" >
              Delete in My ShortList
            </Button>
          </ExpansionPanelActions>
        </ExpansionPanel>
      </React.Fragment>
    );
  }
}

CourseInShortlist.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CourseInShortlist);
