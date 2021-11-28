import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from "aws-amplify";
import PageHeader from './components/page-header/PageHeader';
import style from './deleteusers.css';
import { deleteUser } from './graphql/mutations';

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

// const deleteUser = `mutation deleteUser($id: ID!) {
//     deleteUser{
//         id
//     }
// }`;

// mutation MyMutation($id: ID = "") {
//     deleteUser(input: {id: $id})
//   }


const initialState = { email: '', given_name: '', family_name: '' };

const DeleteUsers = (props) => {


    const [formState, setFormState] = useState(initialState);
    const [searchTerm, setSearchTerm] = useState('');
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

    // deleteUser = async (user) => {
    //     const id = {
    //         id: user.id
    //     };
    //     await API.graphql(graphqlOperation(deleteUser, { input: id }));
    //     this.setFormState({ users: this.state.users.filter(item => item.id !== user.id) });
    // }

    async function deleteUser(id) {
        await API.graphql(graphqlOperation(deleteUser, { input: { id } })); setUsers(users.filter(user => user.id !== id));
        // setApiError(null);
    }

    //  async function deleteUser({id}) {
    // await API.graphql(graphqlOperation(deleteUser, { input: { id: todoId }}));

    //     const userData1 = await API.graphql(graphqlOperation(deleteUser));
    //     const newUserData = users.filter(user => user.id != id);
    //     setUsers(newUsersArray);
    //     await API.graphql({query: deleteUser, variables: {input {id} }});
    // }

    return (
        <div className="App">
            <PageHeader currentUser={props.currentUser}></PageHeader>
            <div className="main">
                Delete a User from Health-T
            </div>
            <div className="note">
                Note: Changes made are permanent and cannot be reversed
            </div>

            <div className="mainContainer">

                <div className="search">
                    <input type="text" placeholder="Search users" onChange={event => { setSearchTerm(event.target.value) }} />
                </div>
                {
                    users.filter((user) => {
                        if (searchTerm=="") {
                            return user}
                            else if(user.email.toLowerCase().includes(searchTerm.toLowerCase())) {
                            
                            }
                        }).map((user, index) => {
                            return(
                        <div className="user" key={index}>
                            <p>{user.email}</p>
                            {/* <p>{user.given_name + " " + user.family_name}</p> */}
                        </div>
                    );
                            })}
                

            </div>
        </div>
    );
}

export default DeleteUsers;
