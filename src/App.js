import React from 'react';
import logo from './logo.svg';
import './App.css';
import { AmplifySignOut } from '@aws-amplify/ui-react'
import Amplify from '@aws-amplify/core';
import { AmplifyAuthenticator,  AmplifySignIn, AmplifySignUp, AmplifyForgotPassword } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import awsconfig from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';
import telemedicineLogo from './images/telemedicineLogo2.png';
import userIcon from './images/userIcon1.png'
import reportsIcon from './images/Reports.png'
import appointmentIcon from './images/appointmentIcon.png'
import meetingIcon from './images/meetingIcon.png'
import chatIcon from './images/chatIcon.png'
import addUserIcon from './images/addUserIcon.png'
import removeUserIcon from './images/removeUserIcon.png'
import editUserIcon from './images/editUserIcon.png'

import ChatApp from "./cpages/cApp";

import { Component } from 'react';
import { Auth } from 'aws-amplify';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

Amplify.configure(awsconfig);


const App = () => {
	
  
  const [authState, setAuthState] = React.useState();
  const [user, setUser] = React.useState();
  window.$user = user;

  React.useEffect(() => {

    return onAuthUIStateChange((nextAuthState, authData) => {

      setAuthState(nextAuthState);
      setUser(authData)
	  
    });
  }, []);

  function Home() {
    
    if (user['signInUserSession']['accessToken']['payload']['cognito:groups'][0] == 'patients') {
      return (
        <div className="App">

          <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
              <a className="navbar-brand brand-text" href="#">
                <img src={telemedicineLogo} alt="" width="25" height="25" className="d-inline-block align-text-top" />
                Telemedicine
              </a>
              <div className="btn-group">
                <button type="button" className="btn btn-light"><img className="d-inline-block align-text-top" src={userIcon} alt="" width="20" height="20" />{" " + user.attributes.given_name}</button>
                <button type="button" className="btn btn-light dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                  <span className="visually-hidden">Toggle Dropdown</span>
                </button>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Profile</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                  <li><hr className="dropdown-divider"></hr></li>
                  <li><a className="dropdown-item" href="#"><AmplifySignOut /></a></li>
                </ul>
              </div>
            </div>
          </nav>
          <div className="d-flex justify-content-evenly navbar primary-color">
            <button type="button" className="btn btn-secondary btn-sm">Reports</button>
            <button type="button" className="btn btn-secondary btn-sm">Messages</button>
            <button type="button" className="btn btn-secondary btn-sm">Appointments</button>
            <button type="button" className="btn btn-secondary btn-sm">Recordings</button>
            <span className="navbar-brand mb-0 h1"></span>
          </div>
          <div className="d-flex justify-content-evenly flex-column primary-color welcome-box">
            <div className="welcome-textbox">
              <h1>Welcome, {user.attributes.given_name}</h1>
            </div>
            <div className="beside">
              <div className="dot"><img id="center-icons1" src={reportsIcon} alt="" width="130" height="100" />
              </div>
              <div className="textbox">
                <a href="#"><h3>View your reports</h3></a>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-evenly flex-column primary-color info-box">
            <div className="beside">
              <div className="dot"><img id="center-icons2" src={appointmentIcon} alt="" width="105" height="100" />
              </div>
              <div className="textbox">
                <a href="#"><h3>Schedule an Appointment</h3></a>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-evenly flex-column primary-color info-box">
            <div className="beside">
              <div className="dot"><img id="center-icons2" src={meetingIcon} alt="" width="110" height="100" className="d-inline-block align-text-top" />
              </div>
              <div className="textbox">
                <a href="#"><h3>Join a Meeting</h3></a>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-evenly flex-column primary-color info-box">
            <div className="beside">
              <div className="dot"><img id="center-icons2" src={chatIcon} alt="" width="110" height="100" className="d-inline-block align-text-top" />
              </div>
              <div className="textbox">
                <a href="#"><h3>Chat with a Doctor</h3></a>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (user['signInUserSession']['accessToken']['payload']['cognito:groups'][0] == 'doctors') {
      return (
        <div className="App">
          <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
              <a className="navbar-brand brand-text" href="#">
                <img src={telemedicineLogo} alt="" width="25" height="25" className="d-inline-block align-text-top" />
                Telemedicine
              </a>
              <div className="btn-group">
                <button type="button" className="btn btn-light"><img className="d-inline-block align-text-top" src={userIcon} alt="" width="20" height="20" />{" Dr. " + user.attributes.given_name}</button>
                <button type="button" className="btn btn-light dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                  <span className="visually-hidden">Toggle Dropdown</span>
                </button>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Profile</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                  <li><hr className="dropdown-divider"></hr></li>
                  <li><a className="dropdown-item" href="#"><AmplifySignOut /></a></li>
                </ul>
              </div>
            </div>
          </nav>
          <div className="d-flex justify-content-evenly navbar primary-color">
            <button type="button" className="btn btn-secondary btn-sm">Reports</button>
            <button type="button" className="btn btn-secondary btn-sm">Messages</button>
            <button type="button" className="btn btn-secondary btn-sm">Appointments</button>
            <button type="button" className="btn btn-secondary btn-sm">Recordings</button>
            <span className="navbar-brand mb-0 h1"></span>
          </div>
          <div className="d-flex justify-content-evenly flex-column primary-color welcome-box">
            <div className="welcome-textbox">
              <h1>Welcome, {"Dr. " + user.attributes.given_name}</h1>
            </div>
            <div className="beside">
              <div className="dot"><img id="center-icons1" src={reportsIcon} alt="" width="130" height="100" />
              </div>
              <div className="textbox">
                <a href="#"><h3>View your reports</h3></a>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-evenly flex-column primary-color info-box">
            <div className="beside">
              <div className="dot"><img id="center-icons2" src={appointmentIcon} alt="" width="105" height="100" />
              </div>
              <div className="textbox">
                <a href="#"><h3>View Appointments</h3></a>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-evenly flex-column primary-color info-box">
            <div className="beside">
              <div className="dot"><img id="center-icons2" src={meetingIcon} alt="" width="110" height="100" className="d-inline-block align-text-top" />
              </div>
              <div className="textbox">
                <a href="#"><h3>Start a Meeting</h3></a>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-evenly flex-column primary-color info-box">
            <div className="beside">
              <div className="dot"><img id="center-icons2" src={chatIcon} alt="" width="110" height="100" className="d-inline-block align-text-top" />
              </div>
              <div className="textbox">
                <a href="#"><h3>Chat with Patient</h3></a>
              </div>
            </div>
          </div>
          <div className="lower-buttons-container">
            <button type="button" className="btn btn-secondary lower-buttons">View Patients</button>
            <button type="button" className="btn btn-secondary lower-buttons">View Staff</button>
          </div>
        </div>
      )
    }
    else if (user['signInUserSession']['accessToken']['payload']['cognito:groups'][0] == 'admin') {
      return (
        <div className="App">
          <nav class="navbar navbar-light bg-light">
            <div class="container-fluid">
              <a class="navbar-brand brand-text" href="#">
                <img src={telemedicineLogo} alt="" width="25" height="25" className="d-inline-block align-text-top" />
                Telemedicine
              </a>
              <div class="btn-group">
                <button type="button" class="btn btn-light"><img class="d-inline-block align-text-top" src={userIcon} alt="" width="20" height="20" />{" " + user.attributes.given_name}</button>
                <button type="button" class="btn btn-light dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                  <span class="visually-hidden">Toggle Dropdown</span>
                </button>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Profile</a></li>
                  <li><a class="dropdown-item" href="#">Another action</a></li>
                  <li><a class="dropdown-item" href="#">Something else here</a></li>
                  <li><hr class="dropdown-divider"></hr></li>
                  <li><a class="dropdown-item" href="#"><AmplifySignOut /></a></li>
                </ul>
              </div>
            </div>
          </nav>
          <div class="d-flex justify-content-evenly navbar primary-color">
            <button type="button" class="btn btn-secondary btn-sm">Reports</button>
            <button type="button" class="btn btn-secondary btn-sm">Messages</button>
            <button type="button" class="btn btn-secondary btn-sm">Appointments</button>
            <button type="button" class="btn btn-secondary btn-sm">Recordings</button>
            <span class="navbar-brand mb-0 h1"></span>
          </div>
          <div class="d-flex justify-content-evenly flex-column primary-color welcome-box">
            <div class="welcome-textbox">
              <h1>Welcome, {" " + user.attributes.given_name}</h1>
            </div>
            <div class="beside">
              <div class="dot"><img id="center-icons2" src={addUserIcon} alt="" width="105" height="100" />
              </div>
              <div class="textbox">
                <a href="#"><h3>Add User</h3></a>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-evenly flex-column primary-color info-box">
            <div class="beside">
              <div class="dot"><img id="center-icons2" src={removeUserIcon} alt="" width="105" height="100" />
              </div>
              <div class="textbox">
                <a href="#"><h3>Delete User</h3></a>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-evenly flex-column primary-color info-box">
            <div class="beside">
              <div class="dot"><img id="center-icons2" src={editUserIcon} alt="" width="110" height="100" class="d-inline-block align-text-top" />
              </div>
              <div class="textbox">
                <a href="#"><h3>Edit User</h3></a>
              </div>
            </div>
          </div>
          <div class="lower-buttons-container">
            <button type="button" class="btn btn-secondary lower-buttons">View Patients</button>
            <button type="button" class="btn btn-secondary lower-buttons">View Staff</button>
          </div>
        </div>
      )
    }
    else {
      return (
        <div>
          <h1>Unauthenticated User</h1>
          <AmplifySignOut />
        </div>
      )

    }
  }


  console.log('USER', user)
  var userGroup = '';


  //userGroup = user['signInUserSession']['accessToken']['payload']['cognito:groups'][0]
  

  return authState === AuthState.SignedIn && user ? (
    

    // if (authState === AuthState.SignedIn && user ) {


    <Router>
      
      <div>

        <Switch>

          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          {/* <Route path="/dashboard">
            <Dashboard />
          </Route>  */}
		<Route exact path="/messages" component={ChatApp}/>
        </Switch>

        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/messages">Messages</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          
          <AmplifySignOut />
        </ul>

        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}


      </div>

    </Router>

  ) : (
      <AmplifyAuthenticator>
        <AmplifyForgotPassword
          headerText="Forgot Password?"
          slot="forgot-password"
          usernameAlias="email"

        ></AmplifyForgotPassword>

        <AmplifySignUp headerText="To create an account, fill out all of the slots on this page." slot="sign-up"

          usernameAlias="email"

          formFields={[
            {
              type: "given_name",
              label: "Enter your First Name: ",
              placeholder: "First Name...",
              inputProps: { required: true }
            },
            {
              type: "middle_name",
              label: "Enter your Middle Name: ",
              placeholder: "middle name..."
            },
            {
              type: "family_name",
              label: "Enter your Last Name: ",
              placeholder: "Last Name",
              inputProps: {required: true}
            },
            {
              type: "address",
              label: "Enter your Address: ",
              placeholder: "Address..",
              inputProps: {required: true}
            },
            {
              type: "gender",
              label: "What gender are you?"
            },

            {

              type: "birthdate",

              label: "Enter your birthdate: ",

              placeholder: "MM/DD/YYYY"

            },
            {

              type: "email",

              label: "Enter Email Address: ",

              placeholder: "Type your email...",

              inputProps: { required: true, autocomplete: "username" },

            },

            {

              type: "password",

              label: "Enter Password: ",

              placeholder: "Type password...",

              inputProps: { required: true, autocomplete: "new-password" },

            },

            {
              type: "phone_number",
              label: "Enter Phone Number: ",
            },

            



          ]} />

        <AmplifySignIn headerText="Welcome to Telemedicine!" slot="sign-in" usernameAlias="email" />
		
      </AmplifyAuthenticator>
  )

}



function About() {
  return (
    
    <div>
      <h2>About</h2>
    </div>
  );
}


export default (App);


