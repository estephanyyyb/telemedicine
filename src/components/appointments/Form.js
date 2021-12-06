import React, {Component, useState, useEffect} from 'react';

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

const [fetching, setFetching] = useState(false);
const [users, setUsers] = useState([]);

const [userForm, setUserForm] = useState({
    email: "",
    given_name: "",
    family_name: ""
});

class Form extends Component {
  constructor(props){
    super(props)
    this.state = { date:undefined, time:undefined, doctor: '', reason:'', notes:''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    useEffect(() => {
      this.fetchUsers();
    }, []);
  }

  handleSubmit(event){
    event.preventDefault();
    const time = this.state.time;
    const date = this.state.date;

    if(!date || !time) {
      alert(
        `Date or time not selected.`
    )
    } else {
      alert(
          `Appointment requested for:
          ${date}
          ${time}`
      )
    }

    API.graphql(graphqlOperation(createUser, { input: userForm })).then(e => {
      setUserForm({
          email: "",
          given_name: "",
          family_name: ""
      });
      return this.fetchUsers();
    }).catch(err => {
        console.error(err);
    });
  }
  
  // Method causes to store all the values of the 
  // input field in react state single method handle 
  // input changes of all the input field using ES6 
  // javascript feature computed property names
  async handleChange(event){
    await this.setState({
      // Computed property names
      // keys of the objects are computed dynamically
      [event.target.name] : event.target.value
    })

    console.log(this.state);

    return (e) => {
      setUserForm({
          ...userForm,
          [key]: e.target.value
      });
    }
  }

  async fetchUsers(){
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

  render() {
    return (
      <form style={{margin:15, display:'flex', flexWrap:'wrap'}} onSubmit={this.handleSubmit}>
        <div>
            <label>Date: </label>
            <input type="date" name="date" value={this.state.date} style={{maxWidth:300}} onChange={this.handleChange}></input>
        </div><div style={{width:'100%'}}/>
        <div style={{marginTop:0}}>
            <label>Time: </label>
            <input type="time" name="time" value={this.state.time} style={{maxWidth:300}} onChange={this.handleChange}></input>
        </div><div style={{width:'100%'}}/>
        <div style={{marginTop:0}}>
            <label>Doctor: </label>
            <input type="text" name="doctor" value={this.state.doctor} style={{maxWidth:300}} onChange={this.handleChange}></input>
        </div><div style={{width:'100%'}}/>
        <div style={{marginTop:0}}>
            <label>Reason: </label>
            <input type="text" name="reason" value={this.state.reason} style={{maxWidth:300}} onChange={this.handleChange}></input>
        </div><div style={{width:'100%'}}/>
        <div style={{marginTop:0}}>
            <label>Notes: </label>
            <input type="text" name="notes" value={this.state.notes} style={{maxWidth:300}} onChange={this.handleChange}></input>
        </div><div style={{width:'100%'}}/>
        <div style={{marginTop:0}}>
            <label></label>
            <input style={{maxWidth:'50%', marginLeft:'auto', marginRight:'auto'}} type="submit"></input>
        </div><div style={{width:'100%'}}/>
      </form>
    );
  }
}

export default Form;