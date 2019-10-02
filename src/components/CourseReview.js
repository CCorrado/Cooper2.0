import React from "react";
import { Route,  BrowserRouter as Router } from 'react-router-dom'
import PropTypes from "prop-types";
import classNames from 'classnames';
import { withStyles } from "@material-ui/core/styles";
import { Link } from 'react-router-dom'
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import Divider from '@material-ui/core/Divider';
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import green from '@material-ui/core/colors/green';
import orange from '@material-ui/core/colors/orange';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Select from 'react-select';

import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";

const styles = theme => ({
  root: {
    width: "100%"
  },
  rootgrid: {
    flexGrow: 1
  },
  heading: {
    fontSize: theme.typography.pxToRem(40),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  typo: {
    margin: theme.spacing.unit*3,

  },
  typo1: {
    margin: theme.spacing.unit,
    marginLeft:theme.spacing.unit*10,
    fontSize: theme.typography.pxToRem(15)
  },
  buttongroup:{
    marginLeft: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit,
  },
  likebutton: {
    backgroundColor: green[400],
  },
  dislikebutton: {
    backgroundColor: orange[700],
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  select: {
    width: "20%",
  },
  prog: {
    width: "60%",
  },
});
const apiserver = 'http://localhost:3200';
class CourseReview extends React.Component {
  state = {
    expanded: null,
    useful: null,
    easy: null,
    liked: null,
    instructor:[],
    instructorlist:[],
    instructorClear: null,
    instructorEngaging: null,
    coursecomment: '',
    inscomment:'',
  };
  componentDidMount() {
    const data = {
      course_name : this.props.data.course_name,
    };
    fetch(apiserver + '/getInstructorlist/', {
      method: "POST",
      body: JSON.stringify(data),
      headers: {"Content-Type": "application/json"}
    })
    .then(response => response.json())
    .then(total =>{
      let templist = [];
      for(let i = 0; i < total.length; i++) {
        let temp = {};
        temp.value = i;
        temp.label = total[i].Instructor;
        temp.engaging = total[i].engaging;
        temp.clear = total[i].clear;
        temp.rating = total[i].rating;
        templist.push(temp);
      }
       this.setState({instructorlist:templist})
    })
  }
  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };
  handleusefulClick =(e) => {
    if (e ==='yes') {
      this.setState({useful:true});
    }
    if (e==='no') {
      this.setState({useful:false});
    }
  };
  handleeasyClick =(e) => {
    if (e ==='yes') {
      this.setState({easy:true});
    }
    if (e==='no') {
      this.setState({easy:false});
    }
  };
  handlelikedClick =(e) => {
    if (e ==='yes') {
      this.setState({liked:true});
    }
    if (e==='no') {
      this.setState({liked:false});
    }
  };
  handleinstructorChange =(e) => {
    if (e === null) {
      this.setState({instructor:[]});
    }
    else {
      this.setState({instructor:[].concat(e)});
    }
  };
  handleInstructorClearClick =(e) => {
    if (e ==='yes') {
      this.setState({instructorClear:true});
    }
    if (e==='no') {
      this.setState({instructorClear:false});
    }
  };
  handleInstructorEngagingClick =(e) => {
    if (e ==='yes') {
      this.setState({instructorEngaging:true});
    }
    if (e==='no') {
      this.setState({instructorEngaging:false});
    }
  };
  handlesaveClick =() => {
    const data = {
      useful: this.state.useful ? this.props.data.useful + 1 : this.props.data.useful + 0,
      easy: this.state.easy ? this.props.data.easy + 1 : this.props.data.easy + 0,
      rating: this.props.data.rating > 0 ? this.props.data.rating + 1 : 1,
      student_id : sessionStorage.getItem('student_id'),
      course_name: this.props.data.course_name
    }
    fetch(apiserver + '/coursefeedback/', {
      method: "POST",
      body: JSON.stringify(data),
      headers: {"Content-Type": "application/json"}
    })
    .then(res => {
      const data1 = {
        course_name: this.props.data.course_name,
        comment:this.state.coursecomment
      }
      fetch(apiserver + '/coursecomment/', {
        method: "POST",
        body: JSON.stringify(data1),
        headers: {"Content-Type": "application/json"}
      })
      .then(res => {
        if (this.state.instructor.length > 0) {
          const data2 = {
            clear: this.state.instructorClear ? this.state.instructorlist[0].clear + 1 : this.state.instructorlist[0].clear + 0,
            engaging: this.state.instructorEngaging ? this.state.instructorlist[0].engaging + 1 : this.state.instructorlist[0].engaging + 0,
            rating: this.state.instructorlist[0].rating > 0 ? this.state.instructorlist[0].rating + 1 : 1,
            instructor: this.state.instructorlist[0].label,
          };
          console.log('data2');
          console.log(data2);
          fetch(apiserver + '/inscomment/', {
            method: "POST",
            body: JSON.stringify(data2),
            headers: {"Content-Type": "application/json"}
          })
          .then(res => {
            const data3 = {
              instructor: this.state.instructorlist[0].label,
              inscomment:this.state.inscomment
            };
            // fetch(apiserver + '/inscomment_ins/', {
            //   method: "POST",
            //   body: JSON.stringify(data2),
            //   headers: {"Content-Type": "application/json"}
            // })
          })
        }
      })
    })
  };
  handleInfoClick = () => {
    alert(this.props.data.course_name);
  }
  handleComment = () => event => {
      this.setState({coursecomment: event.target.value});
    };
  handleInsComment = () => event => {
      this.setState({inscomment: event.target.value});
    };
  render() {
    const { classes } = this.props;
    const { expanded } = this.state;
    const options = this.state.instructorlist;
    const useful = this.props.data.rating > 0 ? Math.floor(100*this.props.data.useful/this.props.data.rating) : 0;
    const easy = this.props.data.rating > 0 ? Math.floor(100*this.props.data.easy/this.props.data.rating) : 0;
    return (
      <React.Fragment key={'course'}>
        <ExpansionPanel
        key={this.props.key}
        expanded={expanded === "panel1"}
        onChange={this.handleChange("panel1")}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
            {this.props.data.course_name}
            </Typography>
            <Typography className={classes.secondaryHeading}>
            {this.props.data.course_name}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container spacing={0}>
              <Grid item xs={6}>
                <Typography className={classes.typo}>
                {this.props.data.summary}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                useful: <Progress className={classes.prog} percent={useful}/>
                easy: <Progress className={classes.prog} percent={easy}/>
                {this.props.data.rating > 0 ? this.props.data.rating : 0} ratings
              </Grid>
              <Divider />
              <Grid item xs={12}>
                <Grid container spacing={0}>
                  <Grid item xs={3}>
                    <Typography className={classes.typo1}>
                      useful?
                    </Typography>
                    <Typography className={classes.typo1}>
                      easy?
                    </Typography>
                    <Typography className={classes.typo1}>
                      liked it?
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Grid container spacing={0} className={classes.buttongroup}>
                        <Button variant="contained" size="small" className={this.state.useful&&classes.likebutton} onClick={() => this.handleusefulClick('yes')}>
                          <ThumbUpIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                          Yes
                        </Button>
                        <Button variant="contained" size="small" className={!(this.state.useful)&&classes.dislikebutton} onClick={() => this.handleusefulClick('no')}>
                          <ThumbDownIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                          No
                        </Button>
                    </Grid>
                    <Grid className={classes.buttongroup}>
                    <Button variant="contained" size="small" className={this.state.easy&&classes.likebutton} onClick={() => this.handleeasyClick('yes')}>
                      <ThumbUpIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                      Yes
                    </Button>
                      <Button variant="contained" size="small" className={!this.state.easy&&classes.dislikebutton} onClick={() => this.handleeasyClick('no')}>
                        <ThumbDownIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                        No
                      </Button>
                    </Grid>
                    <Grid className={classes.buttongroup}>
                    <Button variant="contained" size="small" className={this.state.liked&&classes.likebutton} onClick={() => this.handlelikedClick('yes')}>
                      <ThumbUpIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                      Yes
                    </Button>
                      <Button variant="contained" size="small" className={!this.state.liked&&classes.dislikebutton} onClick={() => this.handlelikedClick('no')}>
                        <ThumbDownIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                        No
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                    id="outlined-full-width"
                    style={{ margin: 8 }}
                    placeholder="You can write your comment here!"
                    helperText=""
                    fullWidth
                    onChange={this.handleComment()}
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                    shrink: true
                    }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} container spacing={0}>
                <Grid item xs={2}>
                  <Typography className={classes.button}>
                    Your Instructor was
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Select
                    isClearable='true'
                    options = { options }
                    className={classes.select}
                    onChange={this.handleinstructorChange}
                  >
                  </Select>
                </Grid>
              </Grid>
              {this.state.instructor.map(ins =>(
                <Grid container spacing={0} key={ins.value}>
                  <Grid item xs={3}>
                    <Typography className={classes.typo1}>
                      Clear?
                    </Typography>
                    <Typography className={classes.typo1}>
                      Engaging?
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Grid container spacing={0} className={classes.buttongroup}>
                        <Button variant="contained" size="small" className={this.state.instructorClear&&classes.likebutton} onClick={() => this.handleInstructorClearClick('yes')}>
                          <ThumbUpIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                          Yes
                        </Button>
                        <Button variant="contained" size="small" className={!(this.state.instructorClear)&&classes.dislikebutton} onClick={() => this.handleInstructorClearClick('no')}>
                          <ThumbDownIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                          No
                        </Button>
                    </Grid>
                    <Grid className={classes.buttongroup}>
                    <Button variant="contained" size="small" className={this.state.instructorEngaging&&classes.likebutton} onClick={() => this.handleInstructorEngagingClick('yes')}>
                      <ThumbUpIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                      Yes
                    </Button>
                      <Button variant="contained" size="small" className={!this.state.instructorEngaging&&classes.dislikebutton} onClick={() => this.handleInstructorEngagingClick('no')}>
                        <ThumbDownIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                        No
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                    id="outlined-full-width"
                    style={{ margin: 8 }}
                    placeholder="Comment about the professor!"
                    helperText=""
                    fullWidth
                    margin="normal"
                    onChange={this.handleInsComment()}
                    variant="outlined"
                    InputLabelProps={{
                    shrink: true
                    }}
                    />
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </ExpansionPanelDetails>
          <ExpansionPanelActions>

              <Link to={"moreinfo/" +this.props.data.course_name } >More Information</Link>

            <Button onClick={this.handlesaveClick} variant="contained" size="small" color="primary">
              save my feedback
            </Button>
          </ExpansionPanelActions>
        </ExpansionPanel>
      </React.Fragment>
    );
  }
}

CourseReview.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CourseReview);
