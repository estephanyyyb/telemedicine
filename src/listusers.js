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
import PropTypes from 'prop-types';
import style from './listusers.css';
import PageHeader from './components/page-header/PageHeader';



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
            <PageHeader currentUser={props.currentUser}></PageHeader>
            <div className="main1">
            All Users in Health-T
        </div>
            <div className="home__table">
                <div className="columnsMain">
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead className="tbHead">
                                <TableRow >
                                    <TableCell className="tablecell1" ><div className="columns1">Name</div></TableCell>
                                    <TableCell className="tablecell1"><div className="columns1">Email</div></TableCell>
                                    {/* <TableCell className="tablecell1"><div className="columns1">Last Name</div></TableCell> */}

                                </TableRow>
                            </TableHead>
                            <TableBody className="tBody">
                                {users.map((row) => (
                                    <TableRow key={row?.user}>
                                        <TableCell ><div className="rows1">{row?.given_name + " " + row?.family_name}</div></TableCell>
                                        <TableCell component="th" scope="row"> <div className="rows1">
                                            {row?.email} </div>
                                        </TableCell>



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

export default ListUsers;