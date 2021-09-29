import React from 'react';
import PropTypes from 'prop-types';
import styles from './Reports.css';

function PatientReport (props) {

    const fullName = props.patientData.given_name + " " + (props.patientData.middle_name? props.patientData.middle_name + " " : " ") + props.patientData.family_name;
    console.log("hello from reports! user:" );
    console.log(props.patientData);
	const age = calculate_age(props.patientData.birthdate);
    const id = props.patientData.sub;

    return (
        <div className="styles" className="grid-container">
          <div className="item1">
              <h1><strong>{fullName}<br/>{id}</strong></h1>
          </div>

          <div className="item2">
              <ul className="nav">
                  <li><a href="/">Home</a></li>
                  <li><a href="/messages">Messages</a></li>
                  <li><a href="/appointments">Appointments</a></li>
                  <li><a href="/recordings">Recordings</a></li>
              </ul>
          </div>

          <div className="item3">
              <h3><strong>Patient Profile</strong></h3>
              <table>
                  <thead>
                      <tr>
                          <th>Patient Name</th>
                          <th>Date of Birth</th>
                          <th>Age</th>
                          <th>Sex</th>
                          <th>Ethnicity</th>
                          <th>Marital Status</th>
                          <th>Phone Number</th>
                          <th>Provider</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td>{fullName}</td>
                          <td>{props.patientData.birthdate}</td>
                          <td>{age}</td>
                          <td>{props.patientData.gender}</td>
                          <td>Data</td>
                          <td>Data</td>
                          <td>{props.patientData.phone_number}</td>
                          <td>Data</td>
                      </tr>
                  </tbody>
              </table>
          </div>
          <div className="item4">
              <h4><strong>Labs</strong></h4>
              <table className="labs-table center">
                  <tbody>
                        <tr>
                            <td>Sodium</td>
                            <td>Data</td>
                            <td>mmol/L</td>
                        </tr>
                        <tr>
                            <td>Potassium</td>
                            <td>Data</td>
                            <td>mmol/L</td>
                        </tr>
                        <tr>
                            <td>Chloride</td>
                            <td>Data</td>
                            <td>mmol/L</td>
                        </tr>
                        <tr>
                            <td>Carbon Dioxide</td>
                            <td>Data</td>
                            <td>mmol/L</td>
                        </tr>
                        <tr>
                            <td>Glucose</td>
                            <td>Data</td>
                            <td>mg/dL</td>
                        </tr>
                        <tr>
                            <td>Magnesium</td>
                            <td>Data</td>
                            <td>mg/dL</td>
                        </tr>
                        <tr>
                            <td>White Blood Cell Count</td>
                            <td>Data</td>
                            <td>10E3/mcL</td>
                        </tr>
                        <tr>
                            <td>Red Blood Cell Count</td>
                            <td>Data</td>
                            <td>10E6/mcL</td>
                        </tr>
                        <tr>
                            <td>Hemaglobin</td>
                            <td>Data</td>
                            <td>gm/dL</td>
                        </tr>
                        <tr>
                            <td>Hematocrit</td>
                            <td>Data</td>
                            <td>%</td>
                        </tr>
                  </tbody>
              </table>
             
          </div>
          
          <div className="item5">
              <h4><strong>Medications</strong></h4>
              <form>
                  <label htmlFor="m&d">Medication & Dosage</label>
                  <input type="text" id="m&d" name="m&d"/>
                  <input type="submit" value="Submit"/>
              </form>
          </div>
          
          <div className="item6">
              <h4><strong>Notes</strong></h4>
              <textarea defaultValue="Enter notes here.." name="notesTextBox" cols="50" rows="10"></textarea><br/>
              <input type="submit" value="Submit"/>
          </div>
      </div>
  );
}

function calculate_age(dateofBirth) { 
	var birthYear = dateofBirth.substring(dateofBirth.length - 4),
		currentYear = new Date().getFullYear(),
		age = currentYear - birthYear;
		
    return age;
}

PatientReport.propTypes = {};

PatientReport.defaultProps = {};

export default PatientReport;