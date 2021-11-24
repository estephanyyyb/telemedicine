import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from "aws-amplify";
import Amplify from 'aws-amplify';
import awsExports from './aws-exports';
import "@aws-amplify/ui/dist/style.css";
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
import style from './listusers.css';

const listUsers = `query listUsers {
    listUsers{
        items{
            id
            email
            given_name
            family_name
        }
    }
}`;

const initialState = { email: '', given_name: '', family_name: '' };

const ListUsers = (props) => {

    const [formState, setFormState] = useState(initialState);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetchUsers();
    }, []);

    async function fetchUsers() {
        try {
            const userData = await API.graphql(graphqlOperation(listUsers));
            const users = userData.data.listUsers.items;

            console.log(users);
            setUsers(users);
        } catch (err) {
            console.log('error fetching users');
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
                        <button type="button" className="btn btn-light"><img className="d-inline-block align-text-top" src={userIcon} alt="" width="20" height="20" />{props.patientData.given_name}</button>
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
                <button type="button" className="btn btn-secondary btn-sm" href="#">Reports</button>
                <button type="button" className="btn btn-secondary btn-sm">Messages</button>
                <button type="button" className="btn btn-secondary btn-sm">Appointments</button>
                <span className="navbar-brand mb-0 h1"></span>
            </div>


        <div className="home__table">
        <div className="columnsMain">
                 <TableContainer component={Paper}>
                     <Table aria-label="simple table">
                         <TableHead className="tbHead">
                             <TableRow >
                                 <TableCell className="tablecell1" ><div className="columns1">Name</div></TableCell>
                                 <TableCell className="tablecell1"><div className="columns1">Email</div></TableCell>
                                 <TableCell className="tablecell1"><div className="columns1">Group</div></TableCell>
                                 {/* <TableCell className="tablecell1"><div className="columns1">Last Name</div></TableCell> */}
                               
                             </TableRow>
                         </TableHead>
                         <TableBody className="tBody">
                             {users.map((row) => (
                                <TableRow  key={row?.user}>
                                    <TableCell ><div className="rows1">{row?.given_name + " " + row?.family_name}</div></TableCell>
                                    <TableCell component="th" scope="row"> <div className="rows1">
                                        {row?.email} </div>
                                    </TableCell>
                                    {/* <TableCell component="th" scope="row"> <div className="rows1">
                                        {row?.group} </div>
                                    </TableCell> */}
                                    
                                    {/* <TableCell ><div className="rows1">{row?.family_name}</div></TableCell> */}
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


// class ListUsers extends Component {
//    listQuery = async () => {
//        console.log("listing users");
//        const allUsers = await API.graphql(graphqlOperation(listUsers));
//        alert(JSON.stringify(allUsers));
//    };

//    render() {
//        return (
//            <div>
//                <p>Click button</p>
//                <button onClick={this.listQuery}>List Users</button>
//            </div>
//        );
//    }
// }


export default ListUsers;