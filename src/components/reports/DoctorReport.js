import React from 'react';
import PropTypes from 'prop-types';
import styles from './Reports.module.css';

function DocterReport (props) {
	
	  const fullName = props.name + " " + (props.middleName? props.middleName + " " : " ") + props.lastName;
	  const age = calculate_age(props.dateOfBirth);

	  return (
	  	<div className="styles" className="grid-container">
			<div className="item1">
				<h1><strong>{fullName}<br/>{props.id}</strong></h1>
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
							<td>{props.dateOfBirth}</td>
							<td>{age}</td>
							<td>{props.gender}</td>
							<td>Data</td>
							<td>Data</td>
							<td>{props.phoneNumber}</td>
							<td>Data</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div className="item4">
				<h4><strong>Labs</strong></h4>
				<form>
					<label htmlFor="sodium">Sodium</label>
					<input type="text" id ="sodium" name="sodium"/>
					<label htmlFor="mmol/L">mmol/L</label><br/>
					<label htmlFor="potasium">Potassium</label>
					<input type="text" id ="potasium" name="potassium"/>
					<label htmlFor="mmol/L">mmol/L</label><br/>
					<label htmlFor="chloride">Chloride</label>
					<input type="text" id ="chloride" name="chloride"/>
					<label htmlFor="mmol/L">mmol/L</label><br/>
					<label htmlFor="co2">Carbon Dioxide</label>
					<input type="text" id ="co2" name="co2"/>
					<label htmlFor="mmol/L">mmol/L</label><br/>
					<label htmlFor="glucose">Glucose</label>
					<input type="text" id ="glucose" name="glucose"/>
					<label htmlFor="mg/dL">mg/dL</label><br/>
					<label htmlFor="calcium">Calcium</label>
					<input type="text" id ="calcium" name="calcium"/>
					<label htmlFor="mg/dL">mg/dL</label><br/>
					<label htmlFor="magnesium">Magnesium</label>
					<input type="text" id ="magnesium" name="magnesium"/>
					<label htmlFor="mg/dL">mg/dL</label><br/>
					<label htmlFor="wbc">White Blood Cell Count</label>
					<input type="text" id ="wbc" name="wbc"/>
					<label htmlFor="10E3/mcL">10E3/mcL</label><br/>
					<label htmlFor="rbc">Red Blood Cell Count</label>
					<input type="text" id ="rbc" name="rbc"/>
					<label htmlFor="10E6/mcL">10E6/mcL</label><br/>
					<label htmlFor="hemaglobin">Hemaglobin</label>
					<input type="text" id ="hemaglobin" name="hemaglobin"/>
					<label htmlFor="gm/dL">gm/dL</label><br/>
					<label htmlFor="hematocrit">Hematocrit</label>
					<input type="text" id ="hematocrit" name="hematocrit"/>
					<label htmlFor="%">%</label><br/><br/>
					<input type="submit" value="Submit"/>
				</form>
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
DocterReport.propTypes = {};

DocterReport.defaultProps = {};

export default DocterReport;