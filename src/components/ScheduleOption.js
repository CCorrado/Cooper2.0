import React, { Component } from 'react';

import PropTypes from "prop-types";

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Select from '@material-ui/core/Select'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import HelpIcon from '@material-ui/icons/Help';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    root:{
      display: 'flex',
      flexWrap: 'wrap'
    },
    grid:{
        marginTop:theme.spacing.unit*5
    },
    nativeSelect:{
        width:'100%',
        backgroundColor: theme.palette.background.paper,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
    button: {
      margin: theme.spacing.unit,
    },
});

const bgColor = 'rgba(255, 255, 255, 0.7)';


class ScheduleOption extends Component {
  constructor(props) {
    super(props);
    this.state = { term: 'Fall 2019', labelWidth: 0 };
  }

  componentDidMount() {
  }

  handleChange = event => {
    this.setState( { [event.target.name]: event.target.value } );
  }

  render() {
    const { classes } = this.props;

    return (  <AppBar
                component="div"
                className={classes.secondaryBar}
                color= "{bgColor}"
                position="static"
                elevation={0}
              >
                <Toolbar>
                  <Grid container alignItems="center" spacing={8}>
                    <Grid item>
                      <Select value={ this.state.term }
                            onChange={ this.handleChange }
                            displayEmpty
                            name="term"
                            className={classes.selectEmpty}
                      >
                        <MenuItem value={0}> Fall 2019 </MenuItem>
                      </Select>
                    </Grid>
                    <Grid item>
                      <Button className={classes.button} variant="outlined" color="inherit" size="small">
                          SAVE SCHEDULES
                      </Button>
                    </Grid>
                    <Grid item>
                        <Button className={classes.button} variant="outlined" color="inherit" size="small">
                            SCHEDULING OPTIONS
                        </Button>
                    </Grid>
                  </Grid>
                </Toolbar>
              </AppBar>
            );
  }
}

ScheduleOption.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ScheduleOption);