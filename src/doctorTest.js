import { API, graphqlOperation } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { createMedications, createNotes, createLabs, deleteMedications } from "./graphql/mutations";
import { listMedications, listNotes, listLabs } from "./graphql/queries";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import telemedicineLogo from './images/telemedicineLogo2.png';
import userIcon from './images/userIcon1.png'
import { AmplifySignOut } from '@aws-amplify/ui-react';
import PropTypes from 'prop-types';
import style from './test.css';

const initialState = { medicine: '', dosage: '' }
const initialState2 = { description: '' }
const initialState3 = { type: '', value: '' }

const DoctorTest = (props) => {

    const [formState, setFormState] = useState(initialState)
    const [formState2, setFormState2] = useState(initialState2)
    const [formState3, setFormState3] = useState(initialState3)
    const [medications, setMedications] = useState([])
    const [notes, setNotes] = useState([])
    const [labs, setLabs] = useState([])

    useEffect(() => {
        fetchMedications()
        fetchNotes()
        fetchLabs()
    }, [])

    function setInput(key, value) {
        setFormState({ ...formState, [key]: value })
        setFormState2({ ...formState2, [key]: value })
        setFormState3({ ...formState3, [key]: value })

    }

    async function fetchMedications() {
        try {
            const medicationData = await API.graphql(graphqlOperation(listMedications))
            const medications = medicationData.data.listMedications.items

            setMedications(medications)


        }
        catch (err) {
            console.log('there was an error fetching medications')
        }
    }

    async function fetchNotes() {
        try {
            const notesData = await API.graphql(graphqlOperation(listNotes))
            const notes = notesData.data.listNotes.items

            setNotes(notes)


        }
        catch (err) {
            console.log('there was an error fetching notes')
        }
    }

    async function fetchLabs() {
        try {
            const labsData = await API.graphql(graphqlOperation(listLabs))
            const labs = labsData.data.listLabs.items

            setLabs(labs)


        }
        catch (err) {
            console.log('there was an error fetching Labs')
        }
    }

    return (
        <div className="App">
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand brand-text" href="/">
                        <img src={telemedicineLogo} alt="" width="25" height="25" className="d-inline-block align-text-top" />
                        Telemedicine
                    </a>
                    <div className="btn-group">
                        <button type="button" className="btn btn-light"><img className="d-inline-block align-text-top" src={userIcon} alt="" width="20" height="20" />{" Doctor " + props.patientData.family_name}</button>
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
                <button type="button" className="btn btn-secondary btn-sm" href="/test">Reports</button>
                <button type="button" className="btn btn-secondary btn-sm">Messages</button>
                <button type="button" className="btn btn-secondary btn-sm">Appointments</button>
                <span className="navbar-brand mb-0 h1"></span>
            </div>
            <br/><br/>
            <div className="home__table">
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead className="tbHead">
                            <TableRow >
                                <TableCell ><h3>Medicine</h3></TableCell>
                                <TableCell ><h3>Dosage</h3></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="tBody">
                            {medications.map((row) => (
                                <TableRow key={row?.medicine}>
                                    <TableCell component="th" scope="row">
                                        {row?.medicine}
                                    </TableCell>
                                    <TableCell >{row?.dosage}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <br/><br/>
            
            <div className="home__table">
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead className="tbHead">
                            <TableRow>
                                <TableCell ><h3>Notes</h3></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="tBody">
                            {notes.map((row) => (
                                <TableRow key={row?.description}>
                                    <TableCell component="th" scope="row">
                                        {row?.description}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <br/><br/>
            
            <div className="home__table">
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead className="tbHead">
                            <TableRow>
                                <TableCell ><h3>Type</h3></TableCell>
                                <TableCell ><h3>Value</h3></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="tBody">
                            {labs.map((row) => (
                                <TableRow key={row?.type}>
                                    <TableCell component="th" scope="row">
                                        {row?.type}
                                    </TableCell>
                                    <TableCell >{row?.value}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            </div>
    )
}






export default DoctorTest;