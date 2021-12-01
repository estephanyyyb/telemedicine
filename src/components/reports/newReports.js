import React, { useState, useEffect, Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/storage';
import PageHeader from '../page-header/PageHeader';
import { initializeApp } from '@firebase/app';
import styles from './Reports.module.css';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const firebaseConfig = {
  apiKey: "AIzaSyDgxKxiGZv8nLVb-w6bYIHTlGy6aQDJp9g",
  authDomain: "telemedicine-report.firebaseapp.com",
  projectId: "telemedicine-report",
  storageBucket: "telemedicine-report.appspot.com",
  messagingSenderId: "725043276876",
  appId: "1:725043276876:web:0623c4d48dacf249aa58e9",
  measurementId: "G-9JBVMYYDV3"
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
else {
  firebase.app();
}

var storage = firebase.storage();

const NewReports = (props) => {
  const [Url, setUrl] = useState('');
  const [data, setData] = useState([]);
  const [image, setImage] = useState('');

  const upload = () => {
    if (image == null)
      return;
    setUrl("Click to Download Report")

    //this is what sends files to Firebase Storage
    storage.ref(`/images/${image.name}`).put(image)
      .on("state_changed", alert("success"), alert, () => {

        // Getting Download Link
        storage.ref("images").child(image.name).getDownloadURL()
          .then((url) => {
            setUrl(url);
          })
      });
  }




  //Lists all of the files in Storage
  const listItem = () => {
    storage.ref().child('images/').listAll()
      .then(res => {
        res.items.forEach((item) => {
          setData(arr => [...arr, item.name]);
        })
      })
      .catch(err => {
        alert(err.message);
      })
  }
  return (
    <div className="App">
      <PageHeader currentUser={props.currentUser}></PageHeader>
      <div className={styles['name2']}>
                Patient Reports Upload
            </div>
      <div className={styles['mainContainer2']}>
        <center>
          <div className={styles['uploadStuff']}><input type="file" onChange={(e) => { setImage(e.target.files[0]) }} /></div>
          <div className={styles['uploadButton']}><button style={{height: '40px', width: '550px', fontSize:'20px', backgroundColor:'#7ec4e8', border:'1px solid gray', fontWeight:'bold'}} onClick={upload}>
            Click to Upload Report</button></div>


          <br /> <br />
          <br />

          <div className={styles['urlLink']}><a href={Url}>{Url}</a></div>
          <br /> <br />
          <div className={styles['uploadButton']}><button 
            style={{height:'80px', marginTop: '0px', marginBottom:'20px', width:'300px', fontSize:'20px', backgroundColor:'#7ec4e8', border:'1px solid gray', fontWeight:'bold'}} 
            onClick={listItem}>Click to View All Reports in the System</button></div>
          
          {
            // data.map((val) => (
            //   <h2>{val}</h2>
            // ))
            <div style={{ marginLeft: '0px', marginRight: '0px', marginTop: '0px', marginBottom: '30px' }} className="home__table">
                
                        <TableBody >
                            {data.map((val) => (
                                <TableRow key={val}>
                                    <TableCell style={{width:'800px'
                                          ,  fontSize:'20px', fontWeight:'bold', textAlign: 'center'}} ><div className={styles['rows1']}>{val}</div></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        {/* {name.map(name => <td> {name} </td>)} */}
                        {/* {time.map(time => <td> {time} </td>)} */}
                        {/* {size.map(size => <td> {size} </td>)} */}
                        {/* {URL.map(URL => <td> {URL} </td>)} */}
                    
            </div>
          }

        </center>
      </div>
    </div>
  );
}



export {
  storage, firebase, NewReports as default
}