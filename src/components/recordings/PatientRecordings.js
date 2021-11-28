import React , {useState, useEffect, Component} from 'react';
import telemedicineLogo from '../../images/telemedicineLogo2.png';
import userIcon from '../../images/userIcon1.png';
import { AmplifySignOut } from '@aws-amplify/ui-react';
import PropTypes from 'prop-types';
import styles from './DoctorRecordings.css'
import firebase from "firebase/app";
import 'firebase/storage';
import { Link } from 'react-router-dom';


const firebaseConfig = {
  apiKey: "AIzaSyAwxvSMHLyXiEKTBn4D-L8llyoYu-K8Yqw",
  authDomain: "telemedicine-c0afa.firebaseapp.com",
  projectId: "telemedicine-c0afa",
  storageBucket: 'gs://telemedicine-c0afa.appspot.com/',
  messagingSenderId: "404118376728",
  appId: "1:404118376728:web:500e4dca21d7d18f62ce6d",
  measurementId: "G-4WQP69JN8X"
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); // if already initialized, use that one
}
const storage = firebase.storage();

const PatientRecordings = (props) => { 

  const heading = ['#', 'File', 'Time Created', 'Size(bytes)', 'File URL'];
  const [name, setNameArray] = useState(""); //declare name array
  const [time, setTimeArray] = useState(""); //declare time array
  const [size, setSizeArray] = useState(""); //declare size array
  const [URL, setURLArray] = useState(""); //declare URL array

  
//  List Items in Storage
  useEffect(() => {
    storage.ref().child('images/').listAll()
    .then(res => {
      res.items.forEach((item) => {
        setNameArray(name => [...name, item.name]);
        item.getMetadata()
        .then(res3 => {
          setTimeArray(time => [...time, res3.timeCreated]);
          setSizeArray(size => [...size, res3.size]);
        })
      })
    })
    .catch(err=> {
      alert(err.message);
    })

  }, [])


  // DOWNLOAD URLS
  useEffect(() => {
    storage.ref().child('images/').listAll()
    .then(res => {
        res.items.forEach(item => {
            item.getDownloadURL()
            .then(url => {
                setURLArray(URL => [...URL, url]);
            })
        })
    })
  }, [])

// Build Dynamic Table
const buildTable = () => {
  const tableID = document.querySelector('.recordings');
  var tableRows = tableID.getElementsByTagName('tr');
  var rowCount = tableRows.length;
  for (var x=rowCount-1; x>0; x--) {
    tableID.removeChild(tableRows[x]);
  }
  for(var i=0; i < name.length; i++){
    let recordingsRow = document.createElement('tr');
    recordingsRow.className = 'recordingsRow';
    let numColumn = document.createElement('td');
    numColumn.innerText = i;
    let fileNameColumn = document.createElement('td');
    fileNameColumn.innerText = name[i];
    let timeCreatedColumn = document.createElement('td');
    timeCreatedColumn.innerText = time[i];
    let sizeColumn = document.createElement('td');
    sizeColumn.innerText = size[i];
    // let urlColumn = document.createElement('a');
    // urlColumn.textContent = URL[i];
    // urlColumn.href = URL[i];
    let urlColumn = document.createElement('td');
    urlColumn.innerText = URL[i];

    recordingsRow.append(numColumn, fileNameColumn, timeCreatedColumn, sizeColumn, urlColumn);
    tableID.append(recordingsRow);
  }

}
  

    return (
      <div className="App">
      {/* <PageHeader currentUser={props.currentUser}></PageHeader> */}
       <div>
      <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
         <a className="navbar-brand brand-text" href="/">
           <img src={telemedicineLogo} alt="" width="25" height="25" className="d-inline-block align-text-top" />
           Telemedicine
         </a>
         <div className="btn-group">
           <button type="button" className="btn btn-light"><img className="d-inline-block align-text-top" src={userIcon} alt="" width="20" height="20" />
             {props.currentUser}
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
       <Link to="/reports"><button type="button" className="btn btn-secondary btn-sm">Reports</button></Link>
       <button type="button" className="btn btn-secondary btn-sm">Messages</button>
       <button type="button" className="btn btn-secondary btn-sm">Appointments</button>
       <Link to="/recordings/patient/"><button type="button" className="btn btn-secondary btn-sm">Recordings</button></Link>
       <span className="navbar-brand mb-0 h1"></span>
     </div>
   </div>
   <br/><br/>
   <h1><strong>Video Recordings</strong></h1>
        <center>
        <br/> <br/>
     
          <button onClick={buildTable}> Load Recordings </button>

          <table className='recordings'>
                  <thead>
                      <tr>
                          {heading.map(head => <th>{head}</th>)}
                      </tr>
                  </thead>
                  <tbody>

                  </tbody>
          </table>

        </center>
      
      </div>
      
    );


}
  export {
    storage, firebase, PatientRecordings as default
  }