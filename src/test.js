// import { API, graphqlOperation } from 'aws-amplify';
// import Amplify from 'aws-amplify';
// import awsExports from './aws-exports';
// import React, { useEffect, useState } from 'react';
// import { createMedications, createNotes, createLabs, deleteMedications } from "./graphql/mutations";
// import { listMedications, listNotes, listLabs } from "./graphql/queries";
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';
// import telemedicineLogo from './images/telemedicineLogo2.png';
// import userIcon from './images/userIcon1.png'
// import { AmplifySignOut } from '@aws-amplify/ui-react';
// import PropTypes from 'prop-types';
// import style from './test.css';


// Amplify.configure(awsExports);




// const initialState = { medicine: '', dosage: '' }
// const initialState2 = { description: '' }
// const initialState3 = { type: '', value: '' }

// const Test = (props) => {

//     const [formState, setFormState] = useState(initialState)
//     const [formState2, setFormState2] = useState(initialState2)
//     const [formState3, setFormState3] = useState(initialState3)
//     const [medications, setMedications] = useState([])
//     const [notes, setNotes] = useState([])
//     const [labs, setLabs] = useState([])

//     useEffect(() => {
//         fetchMedications()
//         fetchNotes()
//         fetchLabs()
//     }, [])

//     function setInput(key, value) {
//         setFormState({ ...formState, [key]: value })
//         setFormState2({ ...formState2, [key]: value })
//         setFormState3({ ...formState3, [key]: value })

//     }

//     async function fetchMedications() {
//         try {
//             const medicationData = await API.graphql(graphqlOperation(listMedications))
//             const medications = medicationData.data.listMedications.items

//             setMedications(medications)


//         }
//         catch (err) {
//             console.log('there was an error fetching medications')
//         }
//     }

//     async function fetchNotes() {
//         try {
//             const notesData = await API.graphql(graphqlOperation(listNotes))
//             const notes = notesData.data.listNotes.items

//             setNotes(notes)


//         }
//         catch (err) {
//             console.log('there was an error fetching notes')
//         }
//     }

//     async function fetchLabs() {
//         try {
//             const labsData = await API.graphql(graphqlOperation(listLabs))
//             const labs = labsData.data.listLabs.items

//             setLabs(labs)


//         }
//         catch (err) {
//             console.log('there was an error fetching Labs')
//         }
//     }

//     async function addMedications() {
//         try {
//             if (!formState.medicine || !formState.dosage) return
//             const medication = { ...formState }
//             setMedications([...medications, medication])
//             setFormState(initialState)
//             await API.graphql(graphqlOperation(createMedications, { input: medication }))
//         }
//         catch (err) {
//             console.log('there was an error creating medication', err)
//         }

//     }

//     async function addNotes() {
//         try {
//             if (!formState2.description) return
//             const note = { ...formState2 }
//             setNotes([...notes, note])
//             setFormState2(initialState2)
//             await API.graphql(graphqlOperation(createNotes, { input: note }))
//         }
//         catch (err) {
//             console.log('there was an error creating note', err)
//         }

//     }

//     async function addLabs() {
//         try {
//             if (!formState3.type || !formState.value) return
//             const lab = { ...formState3 }
//             setLabs([...labs, lab])
//             setFormState3(initialState3)
//             await API.graphql(graphqlOperation(createLabs, { input: lab }))
//         }
//         catch (err) {
//             console.log('there was an error creating lab', err)
//         }

//     }


//     return (
//         <div className="App">
//             <nav className="navbar navbar-light bg-light">
//                 <div className="container-fluid">
//                     <a className="navbar-brand brand-text" href="/">
//                         <img src={telemedicineLogo} alt="" width="25" height="25" className="d-inline-block align-text-top" />
//                         Telemedicine
//                     </a>
//                     <div className="btn-group">
//                         <button type="button" className="btn btn-light"><img className="d-inline-block align-text-top" src={userIcon} alt="" width="20" height="20" />{" Nurse " + props.patientData.given_name}</button>
//                         <button type="button" className="btn btn-light dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
//                             <span className="visually-hidden">Toggle Dropdown</span>
//                         </button>
//                         <ul className="dropdown-menu">
//                             <li><a className="dropdown-item" href="#">Profile</a></li>
//                             <li><a className="dropdown-item" href="#">Another action</a></li>
//                             <li><a className="dropdown-item" href="#">Something else here</a></li>
//                             <li><hr className="dropdown-divider"></hr></li>
//                             <li><a className="dropdown-item" href="#"><AmplifySignOut /></a></li>
//                         </ul>
//                     </div>
//                 </div>
//             </nav>
//             <div className="d-flex justify-content-evenly navbar primary-color">
//                 <button type="button" className="btn btn-secondary btn-sm" href="/test">Reports</button>
//                 <button type="button" className="btn btn-secondary btn-sm">Messages</button>
//                 <button type="button" className="btn btn-secondary btn-sm">Appointments</button>
//                 <span className="navbar-brand mb-0 h1"></span>
//             </div>
//             <div className="title">
//                 Add Medication:
//             </div>

//             <input onChange={event => setInput('medicine', event.target.value)}
//                 value={formState.medicine}
//                 placeholder="medicine: e.g. tylenol" /> &ensp;
//             <input onChange={event => setInput('dosage', event.target.value)}
//                 value={formState.dosage}
//                 placeholder="dosage: e.g. 30mg" /> &ensp;

//             <button className="b" onClick={addMedications}>Add Medication</button>
//             <br /><br />
//             <div className="home__table">
//                 <TableContainer component={Paper}>
//                     <Table aria-label="simple table">
//                         <TableHead className="tbHead">
//                             <TableRow >
//                                 <TableCell ><h3>Medicine</h3></TableCell>
//                                 <TableCell ><h3>Dosage</h3></TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody className="tBody">
//                             {medications.map((row) => (
//                                 <TableRow key={row?.medicine}>
//                                     <TableCell component="th" scope="row">
//                                         {row?.medicine}
//                                     </TableCell>
//                                     <TableCell >{row?.dosage}</TableCell>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             </div>





//             {/*  {
//             medications.map((medication, index)=>(
//                 <div key = {medication.id ? medication.id : index}>
//                 <p>
//                 {medication.medicine}
//                 </p>
//                 <p>
//                 {medication.dosage}
//                 </p>
//                 </div>

//             ))
//         }
//  */}


//             <br />
//             <div className="title">Add Note:</div>
//             <input onChange={event => setInput('description', event.target.value)}
//                 value={formState2.description}
//                 placeholder="Add Note" /> &ensp;

//             <button onClick={addNotes}>Add Note</button>
//             <br /><br />
//             <div className="home__table">
//                 <TableContainer component={Paper}>
//                     <Table aria-label="simple table">
//                         <TableHead className="tbHead">
//                             <TableRow>
//                                 <TableCell ><h3>Notes</h3></TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody className="tBody">
//                             {notes.map((row) => (
//                                 <TableRow key={row?.description}>
//                                     <TableCell component="th" scope="row">
//                                         {row?.description}
//                                     </TableCell>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             </div>






//             {/*  {
//                 notes.map((note, index) => (
//                     <div key={note.id ? note.id : index}>
//                         <p>
//                             {note.description}
//                         </p>

//                     </div>

//                 ))
//             } */}
//             <br />
//             <div className="title">Add Lab</div>

//             <input onChange={event => setInput('type', event.target.value)}
//                 value={formState3.type}
//                 placeholder="Type" /> &ensp;
//             <input onChange={event => setInput('value', event.target.value)}
//                 value={formState3.value}
//                 placeholder="value" /> &ensp;

//             <button onClick={addLabs}>Add Lab</button>
//             <br /><br />

//             <div className="home__table">
//                 <TableContainer component={Paper}>
//                     <Table aria-label="simple table">
//                         <TableHead className="tbHead">
//                             <TableRow>
//                                 <TableCell ><h3>Type</h3></TableCell>
//                                 <TableCell ><h3>Value</h3></TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody className="tBody">
//                             {labs.map((row) => (
//                                 <TableRow key={row?.type}>
//                                     <TableCell component="th" scope="row">
//                                         {row?.type}
//                                     </TableCell>
//                                     <TableCell >{row?.value}</TableCell>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             </div>

//             {/* {
//                 labs.map((lab, index) => (
//                     <div key={lab.id ? lab.id : index}>
//                         <p>
//                             {lab.type}
//                         </p>
//                         <p>
//                             {lab.value}
//                         </p>
//                     </div>

//                 ))
//             } */}
            
           
//         </div>
//     )
// }






// export default Test;