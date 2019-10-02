import React from "react";
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";

import {Link, Avatar, Button, CssBaseline, FormControl, Input, InputLabel, Paper, Typography} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
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
			margin: theme.spacing.unit * 3,
			backgroundColor: theme.palette.primary.main,
		},
		avatar2: {
			margin: theme.spacing.unit * 3,
			backgroundColor: theme.palette.secondary.main,
		},
		form: {
			width: '80%', // Fix IE 11 issue.
			marginTop: theme.spacing.unit,
			marginBottom: theme.spacing.unit * 5,
		},
		submit: {
			marginTop: theme.spacing.unit * 5,
		},
		link: {
			margin: theme.spacing.unit* 5,
		},
		typography: {
			marginTop: theme.spacing.unit* 3,
			marginLeft: theme.spacing.unit* 4,
		},

	});

class Signin extends React.Component {
	
	constructor(props) {
		super(props);
		this.state ={
			username : "",
			password : "",
			formErrors : {username:'', password:''},
			usernameValid : false,
			passwordValid : false,
			formValid : false
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		const targetId = event.target.id;
		const targetValue = event.target.value;
		this.setState(
			{[targetId] : targetValue},
			() => {this.validateField(targetId, targetValue)}
		);
	}

	validateField(fieldId, fieldValue) {
		var fieldValidateErrors = this.state.formErrors;
		var usernameValid = this.state.usernameValid;
		var passwordValid = this.state.passwordValid;
		var number = /[0-9]/;

		switch (fieldId) {
			case "username":
				if (fieldValue.length > 11 && fieldValue.length < 19) {
					usernameValid = true;
				} else {
					usernameValid = false;
					fieldValidateErrors.username = 'User name is too short or long.';
				}
				break;
			case "password":
				if (fieldValue.length > 8 && fieldValue.length < 15) {
					if (number.test(fieldValue)) {
                        passwordValid = true;
                    } else {
                        passwordValid = false;
                        fieldValidateErrors.pass = 'Password not include number.';
                    }
				} else {
					passwordValid = false;
					fieldValidateErrors.pass = 'Password is too short or long.';
				}
				break;
			default:
				break;
		}

		this.setState(
					{
						formErrors : fieldValidateErrors,
						usernameValid : usernameValid,
						passwordValid : passwordValid,
					}, this.validateForm);
	}

	validateForm() {
		this.setState({formValid : this.state.usernameValid && this.state.passwordValid});
	}

	handleSubmit(event) {
		event.preventDefault();

		const request = {
			method : 'POST',
			body : JSON.stringify({
				name: this.state.username,
				password: this.state.password,
			}),
			headers : {"Content-Type" : "application/json"}
		}

		fetch("http://localhost:3200/signin", request)
			.then(res => res.json())
			.then(data => {
				console.log(data);
				if ( data.msg === 'success' ) {
					sessionStorage.setItem('student_id', data.student_id);
                    sessionStorage.setItem('student_name', data.student_name);
                    
					this.props.history.push("/courses");
				} else {
					this.props.history.push("/signin");
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
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">Sign in</Typography>
					<form className={classes.form} onSubmit={this.handleSubmit}>
						<FormControl margin="normal" required fullWidth>
							<InputLabel htmlFor="username">User name</InputLabel>
							<Input id="username" autoComplete="username" autoFocus value={this.state.username} onChange={this.handleChange}/>
						</FormControl>
						<FormControl margin="normal" required fullWidth>
							<InputLabel htmlFor="password">Password</InputLabel>
							<Input id="password" type="password"  autoComplete="current-password" value={this.state.password} onChange={this.handleChange}/>
						</FormControl>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color={this.state.formValid ? 'primary' : 'secondary'}
							className={classes.submit}
							>
							Sign In
						</Button>
						<Typography className={classes.typography}>
							Don't you have account?
							<Link href="/driver/signup" className={classes.link}>
								Sign Up
							</Link>
						</Typography>
					</form>
				</Paper>
	    	</main>
	  	);
	}
}

Signin.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter((withStyles(styles)(Signin)))