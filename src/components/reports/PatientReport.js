import React, { useState, useEffect, Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/storage';
import PageHeader from '../page-header/PageHeader';
import { initializeApp } from '@firebase/app';
import styles from './Reports.module.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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

const PatientReport = (props) => {
    // const [Url, setUrl] = useState('');
    // const [data, setData] = useState([]);
    // const [image, setImage] = useState('');

    // //Lists all of the files in Storage
    // const listItem = () => {
    //     storage.ref().child('images/').listAll()
    //         .then(res => {
    //             res.items.forEach((item) => {
    //                 setData(arr => [...arr, item.name]);
    //             })
    //         })
    //         .catch(err => {
    //             alert(err.message);
    //         })
    // }
    const [URL, setURLArray] = useState([]); //declare URL array


    // useEffect(() => {
    //     storage.ref().child('images/').listAll()
    //     .then(res => {
    //       res.items.forEach((item) => {
    //        setNameArray(name => [...name, item.name])
    //       })
    //     })
    //     .catch(err=> {
    //       alert(err.message);
    //     })

    //   }, [])


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



    const fullName = props.patientData.given_name + " " + (props.patientData.middle_name ? props.patientData.middle_name + " " : " ") + props.patientData.family_name;
    const age = calculate_age(props.patientData.birthdate);
    const id = props.patientData.sub;


    return (
        <div className="App">
            <PageHeader currentUser={props.currentUser}></PageHeader>
            <div className="item1">
                <h1><strong>{fullName}</strong></h1>
            </div>

            <div className="item2">
                <table className="patient-info-table">
                    <thead>
                        <tr>
                            <th>Patient Name</th>
                            <th>Date of Birth</th>
                            <th>Age</th>
                            <th>Sex</th>
                            <th>Ethnicity</th>
                            <th>Marital Status</th>
                            <th>Phone Number</th>
                            <th>Provider</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{fullName}</td>
                            <td>{props.patientData.birthdate}</td>
                            <td>{age}</td>
                            <td>{props.patientData.gender}</td>
                            <td>{props.patientData["custom:ethnicity"]}</td>
                            <td>{props.patientData["custom:marital-status"]}</td>
                            <td>{props.patientData.phone_number}</td>
                            <td>{props.patientData["custom:provider"]}</td>
                        </tr>
                    </tbody>
                </table>
                <br /><br />


                <div className="home__table">
                    <div className="columnsMain">
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead className="tbHead">
                                    <TableRow >
                                        <TableCell className="tablecell1" ><div className="columns1">List of all of your Reports</div></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody className="tBody">
                                    {URL.map((URL) => (
                                        <TableRow key={URL}>
                                            <TableCell ><div className="rows1">{URL}</div></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                                {/* {name.map(name => <td> {name} </td>)} */}
                                {/* {time.map(time => <td> {time} </td>)} */}
                                {/* {size.map(size => <td> {size} </td>)} */}
                                {/* {URL.map(URL => <td> {URL} </td>)} */}
                            </Table>
                        </TableContainer>



                        {/* <div className="uploadButton2"><button onClick={listItem}>View Your Reports</button></div>
                    {
                        data.map((val) => (
                            <h2>{val}</h2>
                        ))
                    } */}
                    </div>
                </div>
            </div>

        </div>

    );
}

function calculate_age(dateofBirth) {
    var birthYear = dateofBirth.substring(dateofBirth.length - 4),
        currentYear = new Date().getFullYear(),
        age = currentYear - birthYear;

    return age;
}

PatientReport.propTypes = {};

PatientReport.defaultProps = {};

export default PatientReport;