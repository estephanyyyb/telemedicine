import React, { useState, useEffect, Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/storage';
import PageHeader from '../page-header/PageHeader';
import { initializeApp } from '@firebase/app';
import styles from './Reports.module.css';

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
      <div className={styles['main1']}>Upload a New Report</div>
      <div className={styles['mainContainer2']}>
        <center>
          <div className={styles['uploadStuff']}><input type="file" onChange={(e) => { setImage(e.target.files[0]) }} /></div>
          <div className={styles['uploadButton']}><button onClick={upload}>Upload Report</button></div>


          <br /> <br />
          <br />

          <div className={styles['urlLink']}><a href={Url}>{Url}</a></div>
          <br /> <br />
          <div className={styles['uploadButton']}><button onClick={listItem}>View Names of All Reports</button></div>
          {
            data.map((val) => (
              <h2>{val}</h2>
            ))
          }

        </center>
      </div>
    </div>
  );
}



export {
  storage, firebase, NewReports as default
}