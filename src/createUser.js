import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from "aws-amplify";
import PageHeader from './components/page-header/PageHeader';
import style from './deleteusers.css';
import {createUser} from "./graphql/mutations";

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


const CreateUsers = (props) => {
    const [fetching, setFetching] = useState(false);
    const [users, setUsers] = useState([]);

    async function fetchUsers(){
        setFetching(true);
        try{
        const userData = await API.graphql(graphqlOperation(listUsers));
        const users = userData.data.listUsers.items;
        setUsers(users);
        setFetching(false)
        } catch(err)
        {
            console.log("Error getting users");
        }
        setFetching(false);
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    const [userForm, setUserForm] = useState({
        email: "",
        given_name: "",
        family_name: ""
    });

    const handleChange = (key) => {
        return (e) => {
            setUserForm({
                ...userForm,
                [key]: e.target.value
            });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("User has been successfully created!");

    API.graphql(graphqlOperation(createUser, { input: userForm })).then(e => {
        setUserForm({
            email: "",
            given_name: "",
            family_name: ""
        });
        return fetchUsers();
      }).catch(err => {
          console.error(err);
      });
    }
    

    return (
        <div className="App">
            <PageHeader currentUser={props.currentUser}></PageHeader>
        
            <div className="main">
                Create a User
            </div>

            <div className="mainContainer">
                <div className="mainContainer1">
                <form onSubmit={handleSubmit}>
                    <div className="txt">
                    Enter new user's email address: 
                    
                    <input placeholder="email address" type="text" onChange={handleChange("email")} /> <br/></div>
                    <div className="txt">
                    Enter new user's first name: 
                    <input placeholder="first name" type="text" onChange={handleChange("given_name")} /> <br/> </div>
                    <div className="txt">
                    Enter new user's last name:
                    <input placeholder="last name" type="text" onChange={handleChange("family_name")} /><br/> </div>
                    <div className="create"><button  type="submit">Add User</button></div>
                </form>
                </div>

                
                {/* {users.map((user) =>(
                <p>{user.email}</p>
                ))} */}
            </div>
        </div>
    );

}

export default CreateUsers;
