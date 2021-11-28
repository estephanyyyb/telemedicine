import { ChatEngine } from 'react-chat-engine';
import { Button, Navbar, Nav } from 'react-bootstrap'
import './App.css';
import ChatFeed from './components/ChatFeed';
import Container from 'react-bootstrap/Container'
import AutoForm from './components/AutoForm';
import telemedicineLogo from '../../images/telemedicineLogo2.png';
import { AmplifySignOut } from '@aws-amplify/ui-react';
import PropTypes from 'prop-types';
import userIcon from '../../images/userIcon1.png';
import { Auth, Amplify } from 'aws-amplify'
import user from '../../App.js'

const ChatApp = (props) => {
	var username = window.$user.attributes.email;
	if (!localStorage.getItem('username')) return <AutoForm />
	if (localStorage.getItem('username') != username) return <AutoForm />
	return (


<div>
	<center>
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand brand-text" href="/">
          <img src={telemedicineLogo} alt="" width="25" height="25" className="d-inline-block align-text-top" />
          Telemedicine
        </a>
        <div className="btn-group">
           <button type="button" className="btn btn-light"><img className="d-inline-block align-text-top" src={userIcon} alt="" width="20" height="20" />
            {" " +window.$user.attributes.given_name}
          </button>
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
      <button type="button" className="btn btn-secondary btn-sm">Chat</button>
      <button type="button" className="btn btn-secondary btn-sm">Appointments</button>
      <button type="button" className="btn btn-secondary btn-sm">Recordings</button>
      <span className="navbar-brand mb-0 h1"></span>
    </div>
</center>
	<br />

		<ChatEngine 
			height="80vh"
			projectID="5d047ac1-31af-4d94-89c9-e1db8f373e59"
			userName={username}
			userSecret={localStorage.getItem('password')}
			renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
		/>
</div>
	);
};

export default ChatApp;