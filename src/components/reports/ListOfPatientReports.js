import React, { useState, useEffect, Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/storage';
import PageHeader from '../page-header/PageHeader';
import { initializeApp } from '@firebase/app';
import styles from './Reports.css';
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

const ListOfPatientReports = (props) => {
	const [URL, setURLArray] = useState([]);

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
	return (
		<div className="App">
			<PageHeader currentUser={props.currentUser}></PageHeader>

			<div className="home__table">
				<div className="columnsMain">
					<TableContainer component={Paper}>
						<Table aria-label="simple table">
							<TableHead className="tbHead">
								<TableRow >
									<TableCell className="tablecell1" ><div className="columns1">List of All Patient Reports</div></TableCell>
								</TableRow>
							</TableHead>
							<TableBody className="tBody">
								{URL.map((URL) => (
									<TableRow key={URL}>
										<TableCell ><div className="rows1">{URL}</div></TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</div>
			</div>
		</div>
	);
}

ListOfPatientReports.propTypes = {};

ListOfPatientReports.defaultProps = {};

export default ListOfPatientReports;