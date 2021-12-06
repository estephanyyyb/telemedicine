// import logo from './logo.svg';
import apptStyle from './Appointments.module.css';
import appointments from './appt.json';
import parse from 'html-react-parser';
import PageHeader from '../page-header/PageHeader';
import Form from './Form';
import drs from './drs.json';
import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from "aws-amplify";

const listAppointments = `query listAppointments {
  listAppointments{
      items{
          id
          email
          approval
          doctorNotes
          doctorReason
          patientDate
      }
  }
}`;

const initialState = { id: '', email: '', approval: '', doctorNotes: '', doctorReason: '', patientDate: ''};

function Appointments(props){
  const email = props.patientData.email;

  const [formState, setFormState] = useState(initialState);
  const [users, setUsers] = useState([]);
  useEffect(() => {
      fetchUsers();
  }, []);

  async function fetchUsers() {
      try {
          const userData = await API.graphql(graphqlOperation(listAppointments));
          const users = userData.data.listAppointments.items;

          console.log(users);
          setUsers(users);
      } catch (err) {
          console.log('error fetching users');
      }
  }

  // render (){
    if(props.currentUser['signInUserSession']['accessToken']['payload']['cognito:groups'][0] === 'patients') {
      return (
        <div className="App">

          <div><PageHeader currentUser={props.currentUser}></PageHeader></div>

          <div className={apptStyle.mainContent} style={{position: 'absolute', width: "94%", overflow: 'hidden'}}>
                  <div className={apptStyle.mainContentBar}>
                      <h3 className={apptStyle.contentTitle}>VIEW APPOINTMENTS</h3>
                  </div>
              <div style={{display: 'flex', flexWrap: 'nowrap', height: '100%'}}>
                  <div className={apptStyle.subContent}>
                      <div className={apptStyle.mainContentBar}>
                          <h3 className={apptStyle.contentTitle}>Your Upcoming Appointments</h3>
                      </div>

                      <div style={{height: '83%', overflowY: 'scroll'}}>
                        <div className="appt" id="appt1">
                            {/* <div className="appt" id="appt1" style="display: flex; flex-wrap: wrap; border: solid; margin: 15px; border-radius: 5px; border-width: 1.5px; border-color: gray;"> */}
                            <CreateApptList users={users} email={email} userType="patient"/>
                            {/* </div> */}
                        </div>
                      </div>
                  </div>

                  <div className={apptStyle.subContent}>
                      <div className={apptStyle.mainContentBar}>
                        <h3 id="year" className={apptStyle.contentTitle}>Request an Appointment</h3>
                      </div>
                      <div>
                        <Form/>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      );
    } else if (props.currentUser['signInUserSession']['accessToken']['payload']['cognito:groups'][0] === 'doctors') {
      return (
        <div className="App">

          <div><PageHeader currentUser={props.currentUser}></PageHeader></div>

          <div className={apptStyle.mainContent} style={{position: 'absolute', width: "94%", overflow: 'hidden'}}>
                  <div className={apptStyle.mainContentBar}>
                      <h3 className={apptStyle.contentTitle}>VIEW APPOINTMENTS</h3>
                  </div>
              <div style={{display: 'flex', flexWrap: 'nowrap', height: '100%'}}>
                  <div className={apptStyle.subContent}>
                      <div className={apptStyle.mainContentBar}>
                          <h3 className={apptStyle.contentTitle}>Your Upcoming Appointments</h3>
                      </div>

                      <div style={{height: '83%', overflowY: 'scroll'}}>
                        <div className="appt" id="appt1">
                            {/* <div className="appt" id="appt1" style="display: flex; flex-wrap: wrap; border: solid; margin: 15px; border-radius: 5px; border-width: 1.5px; border-color: gray;"> */}
                            <CreateApptList users={users} email={email} userType="doctor"/>
                            {/* </div> */}
                        </div>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      );
    } else if(props.currentUser['signInUserSession']['accessToken']['payload']['cognito:groups'][0] === 'nurses') {
      return (
        <div className="App">

          <div><PageHeader currentUser={props.currentUser}></PageHeader></div>

          <div className={apptStyle.mainContent} style={{position: 'absolute', width: "94%", overflow: 'hidden'}}>
                  <div className={apptStyle.mainContentBar}>
                      <h3 className={apptStyle.contentTitle}>VIEW APPOINTMENTS</h3>
                  </div>
              <div style={{display: 'flex', flexWrap: 'nowrap', height: '100%'}}>
                  <div className={apptStyle.subContent}>
                      <div className={apptStyle.mainContentBar}>
                          <h3 className={apptStyle.contentTitle}>Appointments Requested</h3>
                      </div>

                      <div style={{height: '83%', overflowY: 'scroll'}}>
                        <div className="appt" id="appt1">
                            {/* <div className="appt" id="appt1" style="display: flex; flex-wrap: wrap; border: solid; margin: 15px; border-radius: 5px; border-width: 1.5px; border-color: gray;"> */}
                            <CreateApptList users={users} email={email} userType="doctor"/>
                            {/* </div> */}
                        </div>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      );
    } 
  // }

  
}

function CreateApptList(props) {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  // const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
  let ampm = "AM";

  var appointment = props.users;
  // console.log(drs[1]);

  appointment.sort(function(ax, bx) {
    ax = parseDate(ax);
    bx = parseDate(bx);

    let compareYr = ax.year - bx.year;
    let compareMo = ax.month - bx.month;
    let compareDay = ax.day - bx.day;
    let compareHr = ax.hour - bx.hour;
    let compareMin = ax.minute - bx.minute;

    if(compareYr === 0) {
      if(compareMo === 0) {
        if(compareDay === 0) {
          if(compareHr === 0) {
            if(compareMin === 0) {
              return 0;
            } else {
              return compareMin;
            }
          } else {
            return compareHr;
          }
        } else {
          return compareDay;
        }
      } else {
        return compareMo;
      }
    } else {
      return compareYr;
    }
  });
  
  replaceEmailWithName(appointment);
  
  // var y, mo, d, ho, min = '';
  var str = "";
  for(var i = 0; i < appointment.length; i++) {
    var a = parseDate(appointment[i]);
    if(props.email === appointment[i].email && appointment[i].approval) {
      str += '<div style=" border: solid; margin: 15px; border-radius: 5px; border-width: 1.5px; border-color: gray;">' +
      "<div style='display: flex; flex-wrap: wrap;'><div style='margin-left:10px'><h4>";
      str += months[a.month - 1] + " " + a.day + ", " + a.year + "</h4></div>";
      str += "<div style='margin-left:30px'><h4>";
      if(a.hour >= 12) {
        if(a.hour !== 12) {
          a.hour = a.hour - 12;
        }
        ampm = "PM";
      } else {
        ampm = "AM";
      }
      str += a.hour + ":" + a.minute;
      if(a.minute === 0) str += "0";
      str += " " + ampm + "</h4></div></div>";
      
      if(props.userType === 'patient') {
        str += "<div style='display: flex; flex-wrap: wrap;'><div style='margin-left:10px'><h4>" + appointment[i].email + "</h4></div><div style='width:100%'></div></div>";
      } else if (props.userType === 'doctor') {
        str += "<div style='display: flex; flex-wrap: wrap;'><div style='margin-left:10px'><h4>" + appointment[i].doctorEmail + "</h4></div><div style='width:100%'></div></div>";
      }
      
      str += "<div style='display: flex; flex-wrap: wrap;'><h4 style='margin-left:10px'>Reason: " + appointment[i].doctorReason + "</h4><div style='width:100%'></div></div>";
      str += "<div style='display: flex; flex-wrap: wrap;'><p style='margin-left:10px'> Notes: " + appointment[i].doctorNotes + "</p></div></div>"
    }
  }
  
  return(
      <div>{parse (str)}</div>
  );
}

function replaceEmailWithName(appointment) {
  for(let appt = 0; appt < appointment.length; appt++) {
    var dremail = appointment[appt].email;
    // console.log(dremail);
    for(let dr = 0; dr < drs.length; dr++) {
      if(drs[dr].email === dremail) {
        appointment[appt].email = drs[dr].name;
        break;
      }
    }
  }
}

function parseDate(appointment) {
  var s = "2021-12-21T17:42:34Z";
  if(appointment) {
    // console.log(appointment);
    var y = appointment.patientDate.substring(0, 4);
    var mo = appointment.patientDate.substring(5, 7);
    var d = appointment.patientDate.substring(8, 10);
    var h = appointment.patientDate.substring(11, 13);
    var min = appointment.patientDate.substring(14, 16);
    console.log(min);
    h = parseInt(h);
    mo = parseInt(mo);
    y = parseInt(y);
    d = parseInt(d);
    min = parseInt(min);
  }

  return {year: y, month: mo, day: d, hour: h, minute: min};
}

function CreateNurseApptList(props) {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  // const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
  let ampm = "AM";

  var appointment = props.users;
  // console.log(drs[1]);

  appointments.sort(function(a, b) {
    let compareYr = a.year - b.year;
    let compareMo = a.month - b.month;
    let compareDay = a.day - b.day;
    let compareHr = a.hour - b.hour;
    let compareMin = a.minute - b.minute;

    if(compareYr === 0) {
      if(compareMo === 0) {
        if(compareDay === 0) {
          if(compareHr === 0) {
            if(compareMin === 0) {
              return 0;
            } else {
              return compareMin;
            }
          } else {
            return compareHr;
          }
        } else {
          return compareDay;
        }
      } else {
        return compareMo;
      }
    } else {
      return compareYr;
    }
  });
  
  replaceEmailWithName(appointment);
  
  var y, mo, d, ho, min = '';
  var str = "";
  for(var i = 0; i < appointment.length; i++) {
    var a = parseDate(appointment[i], y, mo, d, ho, min);
    if(!appointment[i].approval) {
      str += '<div style=" border: solid; margin: 15px; border-radius: 5px; border-width: 1.5px; border-color: gray;">' +
      "<div style='display: flex; flex-wrap: wrap;'><div style='margin-left:10px'><h4>";
      str += months[a.month - 1] + " " + a.day + ", " + a.year + "</h4></div>";
      str += "<div style='margin-left:30px'><h4>";
      if(a.hour >= 12) {
        if(a.hour !== 12) {
          a.hour = a.hour - 12;
        }
        ampm = "PM";
      } else {
        ampm = "AM";
      }
      str += a.hour + ":" + a.minute;
      if(a.minute === 0) str += "0";
      str += " " + ampm + "</h4></div></div>";
      
      str += "<div style='display: flex; flex-wrap: wrap;'><div style='margin-left:10px'><h4>Patient: " + appointment[i].email + "</h4></div><div style='width:100%'></div></div>";
      str += "<div style='display: flex; flex-wrap: wrap;'><div style='margin-left:10px'><h4>Doctor: " + appointment[i].doctorEmail + "</h4></div><div style='width:100%'></div></div>";
      
      str += "<div style='display: flex; flex-wrap: wrap;'><h4 style='margin-left:10px'>Reason: " + appointment[i].doctorReason + "</h4><div style='width:100%'></div></div>";
      str += "<div style='display: flex; flex-wrap: wrap;'><p style='margin-left:10px'> Notes: " + appointment[i].doctorNotes + "</p></div></div>"
    }
  }
  
  return(
      <div>{parse (str)}</div>
  );
}

export default Appointments;
