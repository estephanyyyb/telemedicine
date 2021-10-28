import React from 'react';
import { Auth, API } from 'aws-amplify';
import './App.css';
import Amplify from '@aws-amplify/core';
import { withAuthenticator, AmplifyAuthenticator, AmplifySignIn, AmplifySignOut, AmplifySignUp, AmplifyForgotPassword, AmplifyConfirmSignUp } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import awsconfig from './aws-exports';
import telemedicineLogo from './images/telemedicineLogo2.png';
import userIcon from './images/userIcon1.png'
import reportsIcon from './images/Reports.png'
import appointmentIcon from './images/appointmentIcon.png'
import meetingIcon from './images/meetingIcon.png'
import chatIcon from './images/chatIcon.png'
import addUserIcon from './images/addUserIcon.png'
import removeUserIcon from './images/removeUserIcon.png'
import editUserIcon from './images/editUserIcon.png'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import Profile from './components/Profile';
import Reports from './components/reports/Reports';
import PatientReport from './components/reports/PatientReport';
import ListOfPatientReports from './components/reports/ListOfPatientReports';
import DoctorRecordings from './components/recordings/DoctorRecordings';

Amplify.configure(awsconfig);

const App = () => {

  const [authState, setAuthState] = React.useState();
  const [user, setUser] = React.useState();

  React.useEffect(() => {

    return onAuthUIStateChange((nextAuthState, authData) => {

      setAuthState(nextAuthState);
      setUser(authData)
    });
  }, []);

  let nextToken;
  async function listUsers(limit) {
    let apiName = 'AdminQueries';
    let path = '/listUsersInGroup';
    let myInit = {
      queryStringParameters: {
        "groupname": "patients",
        "limit": limit,
        "token": nextToken,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
      },
    }
    const { NextToken, ...rest } = await API.get(apiName, path, myInit);
    nextToken = NextToken;
    console.log("data", rest);
    return rest;
  }
  


  function Home() {
    if ((user['signInUserSession']['accessToken']['payload']['cognito:groups'] === undefined) || (user['signInUserSession']['accessToken']['payload']['cognito:groups'] === 0)) {
      return (
        <div className="position-absolute top-0 start-50 translate-middle-x square-unauthorized h1-unauthorized">
          <h1>Welcome, {user.attributes.given_name}</h1>
          <br/>
          You have not been authorized. Please wait 24 to 48 hours to be able to access data.
          <br/> <br/>Sorry for the inconvenience. 
          <br /> <br/>
          <AmplifySignOut />
        </div>
      )
    }
    else if (user['signInUserSession']['accessToken']['payload']['cognito:groups'][0] === 'patients') {
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
                  <li><a className="dropdown-item" href="profile">Profile</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                  <li><hr className="dropdown-divider"></hr></li>
                  <li><a className="dropdown-item" href="#"><AmplifySignOut /></a></li>
                </ul>
              </div>
            </div>
          </nav>
          <div className="d-flex justify-content-evenly navbar primary-color">
            <button type="button" className="btn btn-secondary btn-sm" href={"/report/patient/" + user.attributes.sub}>Reports</button>
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
                <a href={"/report/patient/" + user.attributes.sub}><h3>View your reports</h3></a>
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
    } else if (user['signInUserSession']['accessToken']['payload']['cognito:groups'][0] === 'doctors') {
      return (
        <div className="App">
          <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
              <a className="navbar-brand brand-text" href="#">
                <img src={telemedicineLogo} alt="" width="25" height="25" className="d-inline-block align-text-top" />
                Telemedicine
              </a>
              <div className="btn-group">
                <button type="button" className="btn btn-light"><img className="d-inline-block align-text-top" src={userIcon} alt="" width="20" height="20" />{" Dr. " + user.attributes.family_name}</button>
                <button type="button" className="btn btn-light dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                  <span className="visually-hidden">Toggle Dropdown</span>
                </button>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="profile">Profile</a></li>
                  <li><hr className="dropdown-divider"></hr></li>
                  <li><a className="dropdown-item" href="#"><AmplifySignOut /></a></li>
                </ul>
              </div>
            </div>
          </nav>
          <div className="d-flex justify-content-evenly navbar primary-color">
            <button type="button" className="btn btn-secondary btn-sm" href="/reports">Reports</button>
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
                <a href="/reports"><h3>View your reports</h3></a>
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
              <a href="https://video-app-tele.herokuapp.com/" target="_blank"><h3>Start a Meeting</h3></a>
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
    else if (user['signInUserSession']['accessToken']['payload']['cognito:groups'][0] === 'nurses') {
      return (
        <div className="App">
          <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
              <a className="navbar-brand brand-text" href="#">
                <img src={telemedicineLogo} alt="" width="25" height="25" className="d-inline-block align-text-top" />
                Telemedicine
              </a>
              <div className="btn-group">
                <button type="button" className="btn btn-light"><img className="d-inline-block align-text-top" src={userIcon} alt="" width="20" height="20" />{" Nurse " + user.attributes.given_name}</button>
                <button type="button" className="btn btn-light dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                  <span className="visually-hidden">Toggle Dropdown</span>
                </button>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="profile">Profile</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                  <li><hr className="dropdown-divider"></hr></li>
                  <li><a className="dropdown-item" href="#"><AmplifySignOut /></a></li>
                </ul>
              </div>
            </div>
          </nav>
          <div className="d-flex justify-content-evenly navbar primary-color">
            <button type="button" className="btn btn-secondary btn-sm" href="/reports">Reports</button>
            <button type="button" className="btn btn-secondary btn-sm">Messages</button>
            <button type="button" className="btn btn-secondary btn-sm">Appointments</button>
            <span className="navbar-brand mb-0 h1"></span>
          </div>
          <div className="d-flex justify-content-evenly flex-column primary-color welcome-box">
            <div className="welcome-textbox">
              <h1>Welcome, {"Nurse " + user.attributes.given_name}</h1>
            </div>
            <div className="beside">
              <div className="dot"><img id="center-icons1" src={reportsIcon} alt="" width="130" height="100" />
              </div>
              <div className="textbox">
                <a href="/reports"><h3>View Patient Reports</h3></a>
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
    else if (user['signInUserSession']['accessToken']['payload']['cognito:groups'][0] === 'admin') {
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
            <button type="button" className="btn btn-secondary btn-sm" href="/reports">Reports</button>
            <button type="button" className="btn btn-secondary btn-sm">Messages</button>
            <button type="button" className="btn btn-secondary btn-sm">Appointments</button>
            <button type="button" className="btn btn-secondary btn-sm">Recordings</button>
            <span className="navbar-brand mb-0 h1"></span>
          </div>
          <div className="d-flex justify-content-evenly flex-column primary-color welcome-box">
            <div className="welcome-textbox">
              <h1>Welcome, {" " + user.attributes.given_name}</h1>
            </div>
            <div className="beside">
              <div className="dot"><img id="center-icons2" src={addUserIcon} alt="" width="105" height="100" />
              </div>
              <div className="textbox">
                <a href="#"><h3>Add User</h3></a>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-evenly flex-column primary-color info-box">
            <div className="beside">
              <div className="dot"><img id="center-icons2" src={removeUserIcon} alt="" width="105" height="100" />
              </div>
              <div className="textbox">
                <a href="#"><h3>Delete User</h3></a>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-evenly flex-column primary-color info-box">
            <div className="beside">
              <div className="dot"><img id="center-icons2" src={editUserIcon} alt="" width="110" height="100" className="d-inline-block align-text-top" />
              </div>
              <div className="textbox">
                <a href="#"><h3>Edit User</h3></a>
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
  }


  console.log('USER', user)
  var userGroup = '';
  return authState === AuthState.SignedIn && user ? (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/recordings" component={DoctorRecordings} />
          {/* <Route path="/about">
            <About />
          </Route> */}
          <Route path={"/report/patient/" + user.attributes.sub}>
            <PatientReport currentUser={user} patientData={user.attributes} />
          </Route>
          <Route path="/reports">
            <ListOfPatientReports sortFields={['FIRSTNAME', 'LASTNAME']} currentUser={user}/>
          </Route>
          <Route path="/profile">
            <Profile currentUser={user} userData={user.attributes}/>
          </Route>
        </Switch>
      </div>
    </Router>

  ) : (
    <AmplifyAuthenticator>
      <AmplifyForgotPassword
        headerText="Forgot Password?"
        slot="forgot-password"
        usernameAlias="email">
      </AmplifyForgotPassword>
      <AmplifySignUp headerText="To create an account, fill out all of the slots on this page." slot="sign-up"
        usernameAlias="email"
        formFields={[
          {
            type: "given_name",
            label: "Enter your First Name: ",
            placeholder: "Enter your first name",
            inputProps: { required: true }
          },
          {
            type: "middle_name",
            label: "Enter your Middle Name (optional): ",
            placeholder: "Enter your first name"
          },
          {
            type: "family_name",
            label: "Enter your Last Name: ",
            placeholder: "Enter your last name",
            inputProps: { required: true }
          },
          {
            type: "address",
            label: "Enter your Address:  ",
            placeholder: "Enter your address",
            inputProps: { required: true }
          },
          {
            type: "custom:city",
            label: "Enter City: ",
            placeholder: "Enter city",
            inputProps: {required: true},
          },
          {
            type: "custom:state",
            label: "Enter State: ",
            placeholder: "Enter state",
            inputProps: {required: true},
          },
          {
            type: "custom:zc",
            label: "Enter Zipcode: ",
            placeholder: "Enter zipcode",
            inputProps: {required: true},
          },
          {
            type: "birthdate",
            label: "Enter your Birthdate: ",
            placeholder: "MM/DD/YYYY",
            inputProps: {required: true}
          },
          {
            type: "email",
            label: "Enter your Email Address: ",
            placeholder: "Enter your email address",
            inputProps: { required: true, autocomplete: "username" },
          },
          {
            type: "gender",
            label: "Enter Gender: ",
            placeholder: "Female, Male, or Other",
            inputProps: {required: true},
          },
          {
            type: "custom:ethnicity",
            label: "Enter your Ethnicity: ",
            placeholder: "White, Hispanic, Asian, or Black/African American",
            inputProps: {required: true},
          },
          {
            type: "custom:marital-status",
            label: "Enter your Marital Status: ",
            placeholder: "Married, Single, Widowed, or Divorced",
            inputProps: {required: true},
          },
          {
            type: "password",
            label: "Enter Password:",
            placeholder: "Enter password",
            inputProps: { required: true, autocomplete: "new-password" },
          },
          {
            type: "phone_number",
            label: "Enter your Phone Number: ",
            inputProps: {required: true}
          },
          {
            type: "custom:provider",
            label: "Enter your Insurance Provider: ",
            placeholder: "e.g. Blue Shield or 'none'",
            inputProps: {required: true},
          }
        ]} />
      <AmplifySignIn headerText="Welcome to Telemedicine!" slot="sign-in" usernameAlias="email" />
      <AmplifySignOut buttonText="LOGOUT" />
      <AmplifyConfirmSignUp usernameAlias="email"
        headerText="Custom confirm Sign Up"
        slot="confirm-sign-up">
      </AmplifyConfirmSignUp>
    </AmplifyAuthenticator>
  )

}
export default App;