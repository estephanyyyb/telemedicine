import React from 'react';
import logo from './logo.svg';
import './App.css';
import { withAuthenticator, AmplifySignOut, AmplifyAuthenticator, AmplifySignIn, AmplifySignUp } from '@aws-amplify/ui-react'
import awsconfig from './aws-exports';
import Amplify from 'aws-amplify';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';

Amplify.configure(awsconfig);

const App = () => (
  <AmplifyAuthenticator>
    <AmplifySignIn headerText="Welcome to Telemedicine!" slot="sign-in" />
    <AmplifySignUp headerText="To sign up, fill out all of the slots on this page." slot="sign-up" />

    <div>
      My App
      <AmplifySignOut />
    </div>
  </AmplifyAuthenticator>
);

// const App = () => {
//   return (
//     <AmplifyAuthenticator usernameAlias="email">
//       <AmplifySignUp
//         slot="sign-up"
//         usernameAlias="email"
//         formFields={[
//           {
//             type: "email",
//             label: "Enter your email: ",
//             placeholder: "Enter your email address...",
//             inputProps: { required: true, autocomplete: "username" },
//           },
//           {
//             type: "password",
//             label: "Enter your password",
//             placeholder: "Enter password...",
//             inputProps: { required: true, autocomplete: "new-password" },
//           },
//           {
//             type: "phone_number",
//             label: "Enter your phone number: ",
//             placeholder: "Enter number...",
//           },
//         ]}
//         />
//         <AmplifySignIn slot="sign-in" usernameAlias="email" />
//     </AmplifyAuthenticator>
//   );
// };

// function App() {
//   return (
    
//   );
// }






export default App;
