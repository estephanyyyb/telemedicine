// import logo from './logo.svg';
import apptStyle from './Appointments.module.css';
import React from 'react';
import appointments from './appt.json';
import parse from 'html-react-parser';
import PageHeader from '../page-header/PageHeader';
import Form from './Form';
import drs from './drs.json';

function Appointments(props){
  const email = props.patientData.email;

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
                            <CreateApptList email={email}></CreateApptList>
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
                            <CreateApptList email={email}></CreateApptList>
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

  replaceEmailWithName();
  // console.log(drs[1]);

  appointments.sort(function(a, b) {
    let compareYr = a.year - b.year;
    let compareMo = a.month - b.month;
    let compareDay = a.day - b.day;
    let compareHr = a.hour - b.hour;
    let compareMin = a.minute - b.minute;

    if(compareYr == 0) {
      if(compareMo == 0) {
        if(compareDay == 0) {
          if(compareHr == 0) {
            if(compareMin == 0) {
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

  var str = "";
  for(var i = 0; i < appointments.length; i++) {
    if(props.email === appointments[i].email && appointments[i].approved) {
      var h = appointments[i].hour;
      str += '<div style=" border: solid; margin: 15px; border-radius: 5px; border-width: 1.5px; border-color: gray;">' +
      "<div style='display: flex; flex-wrap: wrap;'><div style='margin-left:10px'><h4>";
      str += months[appointments[i].month - 1] + " " + appointments[i].day + ", " + appointments[i].year + "</h4></div>";
      str += "<div style='margin-left:30px'><h4>";
      if(appointments[i].hour >= 12) {
        if(h != 12) {
          h = h - 12;
        }
        ampm = "PM";
      } else {
        ampm = "AM";
      }
      str += h + ":" + appointments[i].minute;
      if(appointments[i].minute == 0) str += "0";
      str += " " + ampm + "</h4></div></div>";
      str += "<div style='display: flex; flex-wrap: wrap;'><div style='margin-left:10px'><h4>" + appointments[i].doctor + "</h4></div><div style='width:100%'></div></div>";
      str += "<div style='display: flex; flex-wrap: wrap;'><h4 style='margin-left:10px'>Reason: " + appointments[i].reason + "</h4><div style='width:100%'></div></div>";
      str += "<div style='display: flex; flex-wrap: wrap;'><p style='margin-left:10px'> Notes: " + appointments[i].notes + "</p></div></div>"
    }
  }
  
  return(
      <div>{parse (str)}</div>
  );
}

function replaceEmailWithName() {
  for(let appt = 0; appt < appointments.length; appt++) {
    var dremail = appointments[appt].doctor;
    // console.log(dremail);
    for(let dr = 0; dr < drs.length; dr++) {
      if(drs[dr].email === dremail) {
        appointments[appt].doctor = drs[dr].name;
        break;
      }
    }
  }
}

export default Appointments;
