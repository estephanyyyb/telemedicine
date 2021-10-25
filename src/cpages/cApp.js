import { ChatEngine } from 'react-chat-engine';
import { Button, Navbar, Nav } from 'react-bootstrap'
import './App.css';
import ChatFeed from './components/ChatFeed';
import Container from 'react-bootstrap/Container'
import AutoForm from './components/AutoForm';
import { Auth, Amplify } from 'aws-amplify'


Auth.currentAuthenticatedUser().then((user) => {
  var hatt = ('user email = ' + user.attributes.username);
});
const ChatApp = () => {
	if (!localStorage.getItem('username')) return <AutoForm />
	
	return (
	<div>

    <h1 class="titleword">Messages</h1>	 
	<br />
	<center>
	<Navbar bg="primary" variant="dark">
		<Container>
		<Nav className="me-auto">
			<Nav.Link href="/" className="navbaritem">Home</Nav.Link> 
			<Nav.Link href="/messages" className="navbaritem">Messages</Nav.Link>
			<Nav.Link href="/about" className="navbaritem">About</Nav.Link>
			<Nav.Link href="/recordings" className="navbaritem">Recordings</Nav.Link>
		</Nav>
		</Container>
	</Navbar>
	</center>
	<br />
		<ChatEngine 
			height="80vh"
			projectID="5d047ac1-31af-4d94-89c9-e1db8f373e59"
			userName={localStorage.getItem('username')}
			userSecret={localStorage.getItem('password')}
			renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
		/>
		</div>
	);
};

export default ChatApp;