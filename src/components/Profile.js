import React from 'react';
import PropTypes from 'prop-types';
import PageHeader from './PageHeader';
import profileStyle from './Profile.css'
import Auth from '@aws-amplify/auth';



class Profile extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            address: props.userData.address,
            phone_number: props.userData.phone_number
        }    
    }

    
    handleSubmit = (event) => {
        event.preventDefault()
        const data = this.state
        console.log("Final Data is", data)
        console.log('New User Address', this.props.userData.address)
        this.props.userData.address = data.address
        console.log('New User Address', this.props.userData.address)
        this.props.userData.address = data.phone_number
        console.log('New User Phone Number', this.props.userData.phone_number)
    };
    

    handleInputChange = (event) => {
        event.preventDefault()
        console.log(event)
        console.log(event.target.name)
        console.log(event.target.value)
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    changeLabel = (event) => {
        event.preventDefault()
        const data = this.state
        document.getElementById("address_label").innerHTML = data.address;
        document.getElementById("phone_number_label").innerHTML = data.phone_number

    }

    render() {
        const {address, phone_number} = this.state
        console.log('ADDRESS', this.state)
        updateUser(address,phone_number)
        
        return (
            <div>
                <div>
                    <PageHeader currentUser={this.props.currentUser}></PageHeader>
                    <br/>
                    <h1>Profile</h1>
                    <div className="profileStyle" class="profile-box primary-color">
                        <div class="profile-textbox">
                            <div class="profile-innertext">
                            <form onSubmit={this.handleSubmit}>
                                <div class="form-group">
                                    <h4>Basic Information</h4>
                                    <br/>
                                    <h5>Full-Name</h5>
                                    <label>{(this.props.userData.given_name + " " + this.props.userData.family_name).toUpperCase()}</label>
                                    <br/>
                                    <br/>
                                    <hr/>
                                    <h5>Date of Birth</h5>
                                    <label>{(this.props.userData.birthdate).toUpperCase()}</label>
                                    <br/>
                                    <br/>
                                    <hr/>
                                    <h5>Ethnicity</h5>
                                    <label>{(this.props.userData["custom:ethnicity"]).toUpperCase()}</label>
                                    <br/>
                                    <br/>
                                    <hr/>
                                    <h5>Maritial Status</h5>
                                    <label>{(this.props.userData["custom:marital-status"]).toUpperCase()}</label>
                                    <br/>
                                    <br/>
                                    <hr/>
                                </div>
                                <br/>
                                <div class="form-group">
                                    <h4>Contact Information</h4>
                                    <br/>

                                    <h5>Email Address</h5>
                                    <label>{(this.props.userData.email).toUpperCase()}</label>
                                    <br/>
                                    <br/>
                                    <hr/>

                                    <h5>Address</h5>
                                    <label id="address_label">{this.props.userData.address.toUpperCase()}</label>
                                    <br/>
                                    <br/>
                                    <label for="inputAddress">Edit Address</label>
                                    <input type="text" class="form-control" id="inputAddress" value={address} name="address" placeholder={address} onChange={this.handleInputChange}/>
                                    <br/>
                                    <hr/>

                                    <h5>Phone Number</h5>
                                    <label id="phone_number_label">{this.props.userData.phone_number}</label>
                                    <br/>
                                    <br/>
                                    <label for="inputPhoneNumber">Edit Phone Number</label>
                                    <input type="text" class="form-control" id="inputPhoneNumber" value={phone_number} name="phone_number" placeholder={phone_number} onChange={this.handleInputChange}/>
                                </div>
                                <br/>
                                <br/>
                                <button class="btn btn-primary" onClick={this.changeLabel}>Update</button>
                            </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ) 
    }
}

async function updateUser(address, phone_number) {
    const user = await Auth.currentAuthenticatedUser();
    await Auth.updateUserAttributes(user, {
    'address': address,
    'phone_number': phone_number
    });
  }

Profile.propTypes = {};

Profile.defaultProps = {};

export default Profile;