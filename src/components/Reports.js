import React from 'react';
import PropTypes from 'prop-types';
import styles from './Reports.css';

const Reports = () => (
  <div className="styles" class="grid-container">
    <div class="item1">
      <h1><strong>Patient Name<br/>PatientID</strong></h1>
    </div>

    <div class="item2">
      <ul class="nav">
        <li><a href="#home">Home</a></li>
        <li><a href="#messages">Messages</a></li>
        <li><a href="#appointments">Appointments</a></li>
        <li><a href="#recordings">Recordings</a></li>
      </ul>
    </div>

    <div class="item3">
      <h3><strong>Patient Profile</strong></h3>
      <table>
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

        <tr>
          <td>Data</td>
          <td>Data</td>
          <td>Data</td>
          <td>Data</td>
          <td>Data</td>
          <td>Data</td>
          <td>Data</td>
          <td>Data</td>
        </tr>
      </table>

    </div>

	<div class="item4">
		<h4><strong>Labs</strong></h4>
		<form>
			<label for="sodium">Sodium</label>
			<input type="text" id ="sodium" name="sodium"/>
			<label for="mmol/L">mmol/L</label><br/>
			<label for="potasium">Potassium</label>
			<input type="text" id ="potasium" name="potassium"/>
			<label for="mmol/L">mmol/L</label><br/>
			<label for="chloride">Chloride</label>
			<input type="text" id ="chloride" name="chloride"/>
			<label for="mmol/L">mmol/L</label><br/>
			<label for="co2">Carbon Dioxide</label>
			<input type="text" id ="co2" name="co2"/>
			<label for="mmol/L">mmol/L</label><br/>
			<label for="glucose">Glucose</label>
			<input type="text" id ="glucose" name="glucose"/>
			<label for="mg/dL">mg/dL</label><br/>
			<label for="calcium">Calcium</label>
			<input type="text" id ="calcium" name="calcium"/>
			<label for="mg/dL">mg/dL</label><br/>
			<label for="magnesium">Magnesium</label>
			<input type="text" id ="magnesium" name="magnesium"/>
			<label for="mg/dL">mg/dL</label><br/>
			<label for="wbc">White Blood Cell Count</label>
			<input type="text" id ="wbc" name="wbc"/>
			<label for="10E3/mcL">10E3/mcL</label><br/>
			<label for="rbc">Red Blood Cell Count</label>
			<input type="text" id ="rbc" name="rbc"/>
			<label for="10E6/mcL">10E6/mcL</label><br/>
			<label for="hemaglobin">Hemaglobin</label>
			<input type="text" id ="hemaglobin" name="hemaglobin"/>
			<label for="gm/dL">gm/dL</label><br/>
			<label for="hematocrit">Hematocrit</label>
			<input type="text" id ="hematocrit" name="hematocrit"/>
			<label for="%">%</label><br/><br/>
			<input type="submit" value="Submit"/>
		</form>
	</div>
	
	<div class="item5">
		<h4><strong>Medications</strong></h4>
		<form>
			<label for="m&d">Medication & Dosage</label>
			<input type="text" id="m&d" name="m&d"/>
			<input type="submit" value="Submit"/>
		</form>
	</div>
	
	<div class="item6">
		<h4><strong>Notes</strong></h4>
		<textarea name="notesTextBox" cols="50" rows="10">
		Enter notes here..
		</textarea><br/>
		<input type="submit" value="Submit"/>
		
	</div>

</div>

);

Reports.propTypes = {};

Reports.defaultProps = {};

export default Reports;
