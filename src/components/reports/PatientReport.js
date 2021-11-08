import React from 'react';
import PropTypes from 'prop-types';
import styles from './Reports.css';
import PageHeader from '../page-header/PageHeader';

function PatientReport (props) {

    const fullName = props.patientData.given_name + " " + (props.patientData.middle_name? props.patientData.middle_name + " " : " ") + props.patientData.family_name;
	const age = calculate_age(props.patientData.birthdate);
    const id = props.patientData.sub;
    const patientNotes = null;
    return (
        <div>
            <div>
                <PageHeader currentUser={props.currentUser}></PageHeader>
            </div> 
        <div className="styles" className="grid-container">           
            <div className="item1">
                <h1><strong>{fullName}<br/>{id}</strong></h1>
            </div>

            <div className="item2">
                <h3><strong>Patient Profile</strong></h3>
                <table className="patient-info-table">
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
                            <td>{props.patientData['custom:ethnicity']}</td>
                            <td>{props.patientData['custom:marital-status']}</td>
                            <td>{props.patientData.phone_number}</td>
                            <td>{props.patientData['custom:provider']}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="item4">
                <h4><strong>Labs</strong></h4>
                <table className="labs-table center">
                    <thead>
                            <tr>
                                <td>Lab Type</td>
                                <td>Value</td>
                                <td>Unit</td>
                            </tr>
                    </thead>
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
                    <table className="labs-table center">
                        <thead>
                            <tr>
                                <td>Medication</td>
                                <td>Dosage</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Med Name</td>
                                <td>Dose data</td>
                            </tr>
                    </tbody>
                </table>
            </div>
            
            <div className="item6">
                <h4><strong>Notes</strong></h4>
                <div className="notes center" name="notesTextBox" cols="50" rows="10">{patientNotes ? patientNotes : "No current notes"}</div><br/>
            </div>
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