import React, { Component } from 'react';

import { AuthenticationDetails, CognitoUser, CognitoUserPool} from 'amazon-cognito-identity-js';
import { USER_POOL_ID, CLIENT_ID} from './awsprofile'
import '../style/login.css';
import DashBoard from './DashBoard';
import NavBar from './NavBar';


class Login extends Component {
  state = {
    loggedIn: false,
    userId: '',
    loading: false
  }

  authenticateUser = (e) => {
    e.preventDefault();

    let username = e.target.username.value;
    let password = e.target.password.value;

    if(!username) {
      this.setState({
        loading: false,
        error: 'Please enter username.',
      })
      return;
    } else if(!password) {
      this.setState({
        loading: false,
        error: 'Please enter password.',
      })
      return;
    }

    this.setState({
      loading: true,
      error: '',
      username: username
    })

    let authenticationData = {
        Username : username,
        Password : password,
    };
    let authenticationDetails = new AuthenticationDetails(authenticationData);
    console.log(authenticationDetails, "autDea")
    let poolData = {
        UserPoolId : USER_POOL_ID,
        ClientId : CLIENT_ID,
    };
    let userPool = new CognitoUserPool(poolData);
    console.log(userPool, "userPool")
    let userData = {
        Username : username,
        Pool : userPool
    };
    let cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
            var accessToken = result.getIdToken().getJwtToken();
            sessionStorage.setItem('Access', accessToken);
            sessionStorage.setItem('Username', username);
            this.setState({
              loading: false,
              loggedIn: true,
            });
            const request = {
              method : 'POST',
              body : JSON.stringify({
                name: username,
                password: password,
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
                }
              })
        },

        onFailure: (err) => {
          this.setState({
            loading: false,
            error: err.message
          })
          alert(err.message || JSON.stringify(err));
          console.log('fail');

          ////////tempcode////////////////
          var accessToken = 'wetwetwetwetwetwet';
            sessionStorage.setItem('Access', accessToken);
            sessionStorage.setItem('Username', 'username');
            this.setState({
              loading: false,
              loggedIn: true,
            });
            const request = {
              method : 'POST',
              body : JSON.stringify({
                name: username,
                password: password,
              }),
              headers : {"Content-Type" : "application/json"}
            }
        
            fetch("http://localhost:3200/signin", request)
              .then(res => res.json())
              .then(data => {
                console.log(data);
                // if ( data.msg === 'success' ) {
                  sessionStorage.setItem('student_id', 1);
                            sessionStorage.setItem('student_name', 'student_name');
                            
                  this.props.history.push("/courses");
                // }
              })
              //////////////////////////////////
        },

        newPasswordRequired: function(userAttributes, requiredAttributes) {
          var newPassword = "newPassword1";
          delete userAttributes.email_verified;
          delete userAttributes.phone_number_verified;
          cognitoUser.completeNewPasswordChallenge(newPassword, userAttributes, this);
        }
    });
  }

  render() {
    const { username, loggedIn, loading, error} = this.state;
    if (sessionStorage.getItem('Access')) {
      const usernameStor = sessionStorage.getItem('Username')
      return (
        
          <DashBoard username = {usernameStor}/>
        
      )
    }
    return (
      <div className="App">
        <NavBar/>
        {
          !loggedIn ?
          (
            <div className="form-box">
              <form onSubmit={this.authenticateUser}>
                <div className="form-head">
                  Login
                </div>

                <div className="input-div">
                  <input placeholder="Username" type="text" name="username" />
                </div>
                <div className="input-div">
                  <input placeholder="Password" type="password" name="password" />
                </div>
                <div className="other-links">
                  <div className="link">
                    Forgot password?
                  </div>
                </div>
                {
                  error ?
                  <span className="error-message"> {error} </span>
                  : undefined
                }
                {
                  loading ?
                  <button className="button disabled">  <div className="loader"/> </button> 
                  : <button className="button" type="submit"> <div> Log In </div> </button>
                }
                
              </form>
            </div>
          ) : (
            <DashBoard username={username} />
          )
        }
      </div>
    );
  }
}

export default Login;
