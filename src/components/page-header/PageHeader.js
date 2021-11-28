import React from 'react';
import PropTypes from 'prop-types';
import style from '../../App.module.css';
import telemedicineLogo from '../../images/telemedicineLogo2.png';
import userIcon from '../../images/userIcon1.png';

import { AmplifySignOut } from '@aws-amplify/ui-react';

export default class PageHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if(this.props.currentUser['signInUserSession']['accessToken']['payload']['cognito:groups'][0] === 'doctors') {
      return <RenderDoctorView currentUser={this.props.currentUser}></RenderDoctorView>
    }
    else if(this.props.currentUser['signInUserSession']['accessToken']['payload']['cognito:groups'][0] === 'patients') {
      return <RenderPatientView currentUser={this.props.currentUser}></RenderPatientView>
    }
    else if(this.props.currentUser['signInUserSession']['accessToken']['payload']['cognito:groups'][0] === 'nurses') {
      return <RenderNurseView currentUser={this.props.currentUser}></RenderNurseView>
    }
    else if(this.props.currentUser['signInUserSession']['accessToken']['payload']['cognito:groups'][0] === 'admins') {
      return <RenderAdminView currentUser={this.props.currentUser}></RenderAdminView>
    }
  }
}
const RenderDoctorView = (props) => {
  return (
    <div>
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand brand-text" href="/">
          <img src={telemedicineLogo} alt="" width="25" height="25" className="d-inline-block align-text-top" />
          Telemedicine
        </a>
        <div className="btn-group">
          <button type="button" className="btn btn-light"><img className="d-inline-block align-text-top" src={userIcon} alt="" width="20" height="20" />
            {" Dr. " + props.currentUser.attributes.family_name}
          </button>
          <button type="button" className="btn btn-light dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
            <span className="visually-hidden">Toggle Dropdown</span>
          </button>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="">Profile</a></li>
            <li><a className="dropdown-item" href="/">Home</a></li>
            <li><a className="dropdown-item" href="#">Something else here</a></li>
            <li><hr className="dropdown-divider"></hr></li>
            <li><a className="dropdown-item" href="#"><AmplifySignOut /></a></li>
          </ul>
        </div>
      </div>
    </nav>
    <div className="d-flex justify-content-evenly navbar primary-color">
      <a type="button" className="btn btn-secondary btn-sm" href="/reports">Reports</a>
      <a type="button" className="btn btn-secondary btn-sm" href="/chat">Chat</a>
      <a type="button" className="btn btn-secondary btn-sm" href="/appointments">Appointments</a>
      <a type="button" className="btn btn-secondary btn-sm" href="/recordings">Recordings</a>
      <span className="navbar-brand mb-0 h1"></span>
    </div>
  </div>);
}

const RenderPatientView = (props) => {
  return (
    <div className="App">
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand brand-text" href="/">
            <img src={telemedicineLogo} alt="" width="25" height="25" className="d-inline-block align-text-top" />
            Telemedicine
          </a>
          <div className="btn-group">
            <button type="button" className="btn btn-light"><img className="d-inline-block align-text-top" src={userIcon} alt="" width="20" height="20" />{" " + props.currentUser.attributes.given_name}</button>
            <button type="button" className="btn btn-light dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
              <span className="visually-hidden">Toggle Dropdown</span>
            </button>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">Profile</a></li>
              <li><a className="dropdown-item" href="/">Home</a></li>
              <li><a className="dropdown-item" href="#">Something else here</a></li>
              <li><hr className="dropdown-divider"></hr></li>
              <li><a className="dropdown-item" href="#"><AmplifySignOut /></a></li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="d-flex justify-content-evenly navbar primary-color">
        <a type="button" className="btn btn-secondary btn-sm" href={"/report/patient/" + props.currentUser.attributes.sub}>Reports</a>
        <a type="button" className="btn btn-secondary btn-sm" href="/chat">Chat</a>
        <a type="button" className="btn btn-secondary btn-sm" href="/appointments">Appointments</a>
        <a type="button" className="btn btn-secondary btn-sm" href="/recordings/patient">Recordings</a>
        <span className="navbar-brand mb-0 h1"></span>
      </div>
    </div>
  );
}

const RenderNurseView = (props) => {
  return (
    <div className="App">
          <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
              <a className="navbar-brand brand-text" href="/">
                <img src={telemedicineLogo} alt="" width="25" height="25" className="d-inline-block align-text-top" />
                Telemedicine
              </a>
              <div className="btn-group">
                <button type="button" className="btn btn-light"><img className="d-inline-block align-text-top" src={userIcon} alt="" width="20" height="20" />{" Nurse " + props.currentUser.attributes.given_name}</button>
                <button type="button" className="btn btn-light dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                  <span className="visually-hidden">Toggle Dropdown</span>
                </button>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Profile</a></li>
                  <li><a className="dropdown-item" href="/">Home</a></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                  <li><hr className="dropdown-divider"></hr></li>
                  <li><a className="dropdown-item" href="#"><AmplifySignOut /></a></li>
                </ul>
              </div>
            </div>
          </nav>
          <div className="d-flex justify-content-evenly navbar primary-color">
            <a type="button" className="btn btn-secondary btn-sm" href="/reports">Reports</a>
            <a type="button" className="btn btn-secondary btn-sm" href="/chat">Chat</a>
            <a type="button" className="btn btn-secondary btn-sm" href="/appointments">Appointments</a>
            <span className="navbar-brand mb-0 h1"></span>
          </div>
    </div>)
}

const RenderAdminView = (props) => {
  return (
    <div className="App">
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand brand-text" href="/">
            <img src={telemedicineLogo} alt="" width="25" height="25" className="d-inline-block align-text-top" />
            Telemedicine
          </a>
          <div className="btn-group">
            <button type="button" className="btn btn-light"><img className="d-inline-block align-text-top" src={userIcon} alt="" width="20" height="20" />{" " + props.currentUser.attributes.given_name}</button>
            <button type="button" className="btn btn-light dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
              <span className="visually-hidden">Toggle Dropdown</span>
            </button>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">Profile</a></li>
              <li><a className="dropdown-item" href="/">Home</a></li>
              <li><a className="dropdown-item" href="#">Something else here</a></li>
              <li><hr className="dropdown-divider"></hr></li>
              <li><a className="dropdown-item" href="#"><AmplifySignOut /></a></li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="d-flex justify-content-evenly navbar primary-color">
        <a type="button" className="btn btn-secondary btn-sm" href="/reports">Reports</a>
        <a type="button" className="btn btn-secondary btn-sm" href="/chat">Chat</a>
        <a type="button" className="btn btn-secondary btn-sm" href="/appointments">Appointments</a>
        <a type="button" className="btn btn-secondary btn-sm" href="/recordings">Recordings</a>
        <span className="navbar-brand mb-0 h1"></span>
      </div>
    </div>);
}
PageHeader.propTypes = {};

PageHeader.defaultProps = {};