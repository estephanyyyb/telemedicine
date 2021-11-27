import React , {useState, useEffect, Component} from 'react';
import telemedicineLogo from '../../images/telemedicineLogo2.png';
import userIcon from '../../images/userIcon1.png';
import { AmplifySignOut } from '@aws-amplify/ui-react';
import PropTypes from 'prop-types';
import styles from './DoctorRecordings.css'
// import AWS from 'aws-sdk';
import firebase from "firebase/app";
import 'firebase/storage';


const BUCKET = '';


const firebaseConfig = {
  apiKey: "AIzaSyAwxvSMHLyXiEKTBn4D-L8llyoYu-K8Yqw",
  authDomain: "telemedicine-c0afa.firebaseapp.com",
  projectId: "telemedicine-c0afa",
  storageBucket: "telemedicine-c0afa.appspot.com",
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

const DoctorRecordings = (props) => { 
  const heading = ['File', 'Time Created', 'Size', 'File URL'];
  const [body, setBodyArray] = useState([]); //declare body array
  const [name, setNameArray] = useState([]); //declare name array
  const [time, setTimeArray] = useState([]); //declare time array
  const [size, setSizeArray] = useState([]); //declare size array
  const [URL, setURLArray] = useState([]); //declare URL array
  const [user, setUser] = React.useState();
  const [show, setShow] = useState(false);
  const [value, setValue] = useState('');
  const [url, setUrl] = useState('');
  const [data, setData] = useState([]);
  const [image , setImage] = useState('');
  const upload = ()=>{
    if(image == null)
      return;
    // setUrl("Getting download link...");
    storage.ref(`/images/${image.name}`).put(image)
    .on("state_changed" , alert("success") , alert);

    //Get Link
    // storage.ref("images").child(image.name).getDownloadURL()
    // .then((url) => {
    //   setUrl(url);
    // })
    
  }
  
 //List Items in Storage
  useEffect(() => {
    storage.ref().child('images/').listAll()
    .then(res => {
      res.items.forEach((item) => {
       setNameArray(name => [...name, item.name])
      })
    })
    .catch(err=> {
      alert(err.message);
    })

  }, [])


  useEffect(()  => {
    storage.ref().child('images/').listAll()
    .then(res => {
      res.items.forEach((item) => {
        item.getMetadata()
        .then(res3 => {
          setSizeArray(time => [...time, res3.timeCreated]);
        })
      })
    })
  }, [])

//SIZE -------------------- SIZE
useEffect(()  => {
  storage.ref().child('images/').listAll()
  .then(res => {
    res.items.forEach((item) => {
      item.getMetadata()
      .then(res3 => {
        setSizeArray(size => [...size, res3.size]);
      })
    })
  })
}, [])



  //DOWNLOAD URLS
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


  function deleteObjectandRow() {
    // delete object and html row when button clicked
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
             {" Dr. " + props.currentUser}
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
       <button type="button" className="btn btn-secondary btn-sm">Messages</button>
       <button type="button" className="btn btn-secondary btn-sm">Appointments</button>
       <button type="button" className="btn btn-secondary btn-sm">Recordings</button>
       <span className="navbar-brand mb-0 h1"></span>
     </div>
   </div>
   <br/><br/>
       <h1><strong>Upload a new Recording</strong></h1>
        <center>
        <input type="file" onChange={(e)=>{setImage(e.target.files[0])}}/>
        <button onClick={upload}>Upload</button>
        <br/> <br/>
        <br/> <br/>
        <br/> <br/>

        {/* <div >
          <Table heading={heading} body={body} />,
        </div> */}

          <table>
                  <thead>
                      <tr>
                          {heading.map(head => <th>{head}</th>)}
                      </tr>
                  </thead>
                    <tr> 
                      {name.map(name => <td> {name} </td>)}
                      {/* {time.map(time => <td> {time} </td>)} */}
                      {size.map(size => <td> {size} </td>)}
                      {URL.map(URL => <td> {URL} </td>)}
                    </tr>
          </table>
        </center>
      </div>
    );






//     return (
//       <div>
//       {/* <PageHeader currentUser={props.currentUser}></PageHeader> */}
//       <div>
//     <nav className="navbar navbar-light bg-light">
//       <div className="container-fluid">
//         <a className="navbar-brand brand-text" href="/">
//           <img src={telemedicineLogo} alt="" width="25" height="25" className="d-inline-block align-text-top" />
//           Telemedicine
//         </a>
//         <div className="btn-group">
//           <button type="button" className="btn btn-light"><img className="d-inline-block align-text-top" src={userIcon} alt="" width="20" height="20" />
//             {" Dr. " + props.currentUser}
//           </button>
//           <button type="button" className="btn btn-light dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
//             <span className="visually-hidden">Toggle Dropdown</span>
//           </button>
//           <ul className="dropdown-menu">
//             <li><a className="dropdown-item" href="#">Profile</a></li>
//             <li><a className="dropdown-item" href="#">Another action</a></li>
//             <li><a className="dropdown-item" href="#">Something else here</a></li>
//             <li><hr className="dropdown-divider"></hr></li>
//             <li><a className="dropdown-item" href="#"><AmplifySignOut /></a></li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//     <div className="d-flex justify-content-evenly navbar primary-color">
//       <button type="button" className="btn btn-secondary btn-sm" href="/reports">Reports</button>
//       <button type="button" className="btn btn-secondary btn-sm">Messages</button>
//       <button type="button" className="btn btn-secondary btn-sm">Appointments</button>
//       <button type="button" className="btn btn-secondary btn-sm">Recordings</button>
//       <span className="navbar-brand mb-0 h1"></span>
//     </div>
//   </div>
//   <br/><br/>



}
  export {
    storage, firebase, DoctorRecordings as default
  }


//   class Table extends Component {
//     render() {
//         var heading = this.props.heading;
//         var body = this.props.body;
//         return (
//             <table style={{ width: 500 }}>
//                 <thead>
//                     <tr>
//                         {heading.map(head => <th>{head}</th>)}
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {body.map(row => <TableRow row={row} />)}
//                 </tbody>
//             </table>
//         );
//     }
// }
  
// class TableRow extends Component {
//     render() {
//         var row = this.props.row;
//         return (
//             <tr>
//                 {row.map(val => <td>{val}</td>)}
//             </tr>
//         )
//     }
// }
