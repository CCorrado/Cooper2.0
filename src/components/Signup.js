import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from 'prop-types';

import {Grid, Avatar, Button, CssBaseline, FormControl, Input, InputLabel, Paper, Typography} from '@material-ui/core';
import VerifiedUserOutlinedIcon from '@material-ui/icons/VerifiedUserOutlined';
import withStyles from '@material-ui/core/styles/withStyles';


const styles = theme => ({
    main: {
        width: '300px',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            height: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 12,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar1: {
        marginTop: theme.spacing.unit * 2,
        backgroundColor: theme.palette.primary.main,
    },
    avatar2: {
        marginTop: theme.spacing.unit * 2,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '80%', // Fix IE 11 issue.
        marginBottom: theme.spacing.unit * 5,
    },
    submit: {
        marginTop: theme.spacing.unit * 4,
    },
});

class Signup extends React.Component {
  
    constructor(props) {
        super(props);
        this.state ={
            name : "",
            email : "",
            pass : "",
            phone : "",
            conf_pass : "",
            formErrors : {name: '', pass: '', phone: ''},
            nameValid : false,
            passValid : false,
            phoneValid : false,
            formValid : false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateField(fieldId, value) {
        var fieldValidateErrors = this.state.formErrors;
        var nameValid = this.state.nameValid;
        var passValid = this.state.passValid;
        var phoneValid =  this.state.phoneValid;
        var passCompare = false;
        var number = /[0-9]/;

        switch(fieldId) {
            case 'name':
                nameValid = value.length >= 3;
                fieldValidateErrors.name = nameValid ? '' : 'User name is too short.';
                break;
            case 'pass':
                passCompare = value === this.state.conf_pass;
                break;
            case 'conf_pass':
                passCompare = value === this.state.pass;
                break;
            case 'phone':
                phoneValid = value.length === 10;
                fieldValidateErrors.phone = phoneValid ? '' : 'Phone number is not incorrect.';
                break;
            default:
                break;
        }

        if (fieldId === 'pass' || fieldId === 'conf_pass') {
            if (passCompare) {
                fieldValidateErrors.pass = '';
                if (value.length > 7 && value.length < 15) {
                    if (number.test(value)) {
                        passValid = true;
                    } else {
                        passValid = false;
                        fieldValidateErrors.pass = 'Password not include number.';
                    }
                } else {
                    passValid = false;
                    fieldValidateErrors.pass = 'Password length is too short.';
                }      
            } else {
                passValid = false;
                fieldValidateErrors.pass = 'Password is incorrect.';
            }
        }
            
        this.setState({formErrors: fieldValidateErrors, 
                        nameValid: nameValid, 
                        passValid: passValid,
                        phoneValid: phoneValid}, this.validateForm);
    }

    validateForm() {
        this.setState({formValid : this.state.nameValid && this.state.passValid && this.state.phoneValid});
    }

    handleChange(event) {
        const targetId = event.target.id;
        const targetValue = event.target.value;
        this.setState(
            {[targetId] : targetValue}, 
            () => { this.validateField(targetId, targetValue) }
        );
    }

    handleSubmit(event) {
        event.preventDefault();

        var formErrors = this.state.formErrors;
        var error;
        var errorText = '';

        for(error in formErrors) {
            if (formErrors[error] !== '') {
                errorText += formErrors[error] + '\n';
            } 
        }

        if (errorText !== '') {
            alert(errorText);
        }

        const request = {
            method : 'POST',
            body : JSON.stringify({
                name: this.state.name,
                phone: this.state.phone,
                email: this.state.email,
                password: this.state.pass,
            }),
            headers : {"Content-Type" : "application/json"}
        }

        fetch("http://localhost:3200/signup", request)
            .then(res => res.json())
            .then(data => { 
                if(data.msg === 'success') {
                    sessionStorage.setItem('student_id', data.student_id);
                    sessionStorage.setItem('student_name', data.student_name);

                    this.props.history.push("/courses");
                } else {
                    this.props.history.push("/signup");
                } 
            })
    }

    render() {

        const { classes } = this.props;

        return (
            <main className={classes.main} >
                <CssBaseline />
                <Paper className={classes.paper}  >
                    <Avatar className={this.state.formValid ? classes.avatar1 : classes.avatar2}>
                        <VerifiedUserOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">Sign Up</Typography>
                    <form className={classes.form} onSubmit={this.handleSubmit}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="name">User name</InputLabel>
                            <Input id="name" autoComplete="username" minLength="20" autoFocus value={this.state.name} onChange={this.handleChange}/>
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="phone">Phone Number</InputLabel>
                            <Input id="phone" type="tel" minLength="10" autoComplete="tel-national" value={this.state.phone} onChange={this.handleChange}/>
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">Email Address</InputLabel>
                            <Input id="email" autoComplete="email" value={this.state.email} onChange={this.handleChange}/>
                        </FormControl>
                        <Grid container spacing={24}>
                            <Grid item xs={12} sm={6}>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="pass">Password</InputLabel>
                                    <Input type="password" id="pass" autoComplete="current-password" value={this.state.pass} onChange={this.handleChange}/>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="conf_pass">Confirm password</InputLabel>
                                    <Input type="password" id="conf_pass" autoComplete="current-password" value={this.state.conf_pass} onChange={this.handleChange}/>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color={this.state.formValid ? 'primary' : 'secondary'}
                            // disabled={!this.state.formValid}
                            className={classes.submit}>
                            Sign Up
                        </Button>
                      </form>
                  </Paper>
              </main>
          );
      }
  }

Signup.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter((withStyles(styles)(Signup)))