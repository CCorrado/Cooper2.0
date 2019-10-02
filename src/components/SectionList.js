import React from "react";
import { withRouter} from 'react-router-dom';
import PropTypes from "prop-types";
import classNames from 'classnames';
import { Link } from 'react-router-dom'
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
  },
  table: {
    minWidth: 700,
  },
  row: {
  },
});

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.common.black,
    fontSize: 18,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

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

function formatAMPM(time) {
  if (time !== 'NA') {
    let hours = parseInt(time.substring(0, 2));
    let minutes= parseInt(time.substring(3, 5));
    let ampm  = hours > 12 ? 'pm': 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0'+minutes : minutes;

    let strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
}

class SectionList extends React.Component {

  state = {
    expanded: null,
    useful: null,
    easy: null,
    liked: null,
    instructor:[],
    instructorClear: null,
    instructorEngaging: null,
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  handleaddClick =(course_id) => {
    const data = {
      student_id : sessionStorage.getItem('student_id'),
      course_id : course_id
    };

    fetch(apiserver + '/shortlist/', {
      method: "POST",
      body: JSON.stringify(data),
      headers: {"Content-Type": "application/json"}
    })
    .then(response => response.json())
    .then(result => this.props.history.push('/courses'))
  };

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;
    const useful = this.props.data.rating > 0 ? Math.floor(100*this.props.data.useful/this.props.data.rating) : 0;
    const easy = this.props.data.rating > 0 ? Math.floor(100*this.props.data.easy/this.props.data.rating) : 0;
    console.log('SectionList')
    console.log(this.props.data);

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
                      {this.props.data.rating > 0 ? this.props.data.rating : 0} ratings
                    </Grid>

                  </div>
                </Grid>
              </Grid>
              <Grid container spacing={0} direction="row">
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <CustomTableCell align="center">Section</CustomTableCell>
                      <CustomTableCell align="center">Enrolled</CustomTableCell>
                      <CustomTableCell align="center">Meeting</CustomTableCell>
                      <CustomTableCell align="center">Time</CustomTableCell>
                      <CustomTableCell align="center">Instructor</CustomTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.props.data.sections.map(row=>(
                      <TableRow className={classes.row} key={row.id}>
                        <CustomTableCell component="th" scope="row"  align="center">
                          {row.section}
                        </CustomTableCell>
                        <CustomTableCell component="th" scope="row"  align="center">
                          {row.Cur_Enroll}/{row.MaxEnrollment}
                        </CustomTableCell>
                        <CustomTableCell component="th" scope="row"  align="center">
                          {row.Meeting_day}
                        </CustomTableCell>
                        <CustomTableCell component="th" scope="row"  align="center">
                          {formatAMPM(row.start_time)} - {formatAMPM(row.end_time)}
                        </CustomTableCell>
                        <CustomTableCell  align="center">{row.Instructor}</CustomTableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
          <ExpansionPanelActions>
            <Link to={"moreinfo/" +this.props.data.course_name } >More Information</Link>
            <Button color="secondary" variant="contained" onClick={() => this.handleaddClick(this.props.data.course_id)} size="small" >
              Add To My ShortList
            </Button>
          </ExpansionPanelActions>
        </ExpansionPanel>
      </React.Fragment>
    );
  }
}

SectionList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(SectionList));