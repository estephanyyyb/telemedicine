import React , {useState, useEffect} from 'react';
import telemedicineLogo from '../../images/telemedicineLogo2.png';
import userIcon from '../../images/userIcon1.png';
import { AmplifySignOut } from '@aws-amplify/ui-react';
import PropTypes from 'prop-types';
import styles from './DoctorRecordings.css'
// import AWS from 'aws-sdk';
import PageHeader from '../page-header/PageHeader';

const AWS = require('aws-sdk');
const S3 = new AWS.S3(); // YOU NEED THIS LINE


// const AWS_ACCESS_KEY_ID = 'AKIAZ7RYNOYKJCH42GGR';
// const AWS_SECRET_ACCESS_KEY = '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';
const REGION ='us-east-1';
const S3_BUCKET ='recordings-staging-telemedicine5a';


// Set up array for HTML table using heading and body vars
var heading = ['File', 'Date', 'Length'];
var body = ['testvideo1.mov','testvideo1.mov','testvideo1.mov','testvideo1.mov','testvideo1.mov'];

var objectUrls = [];
var objectName = [];
var objectLength =[]; //or date?


// require('dotenv').config();
// AWS.config.update({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.SECRET_ACCESS_KEY,
//   region: REGION
// })


// // Initialize the Amazon Cognito credentials provider
// AWS.config.region = 'us-east-1'; // Region
// AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//     IdentityPoolId: 'us-east-1:53b3fb4a-cdc7-4113-bb71-9023ba101108',
// });


// AWS.config.update({
//   region: 'us-east-1',
//   credentials: new AWS.CognitoIdentityCredentials({
//     IdentityPoolId: 'us-east-1:53b3fb4a-cdc7-4113-bb71-9023ba101108'
//   })
// });


// // Ideal way to load keys; keep here ...
// AWS.config.getCredentials(function(err) {
//   if (err) console.log(err.stack);
//   // credentials not loaded
//   else {
//     console.log("Access key:", AWS.config.credentials.accessKeyId);
//   }
// });





const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
})


const DoctorRecordings = (props) => {

    const [progress , setProgress] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const uploadFile = (file) => {

        const params = {
            ACL: 'public-read',
            Body: file,
            Bucket: S3_BUCKET,
            Key: file.name
        };

        myBucket.putObject(params)
            .on('httpUploadProgress', (evt) => {
                setProgress(Math.round((evt.loaded / evt.total) * 100))
            })
            .send((err) => {
                if (err) console.log(err)
                else console.log('Successful upload!')
            })
    }

    (async function() { //FUNCTION IS GOOD CAUSE IT WORKED WITH .listObjectsV2 multiple refreshes
      
      try {

        AWS.config.setPromisesDependency();

        const response = await S3.listObjectsV2({
          Bucket: S3_BUCKET
        }).promise();
        

        // var key = response.Contents[0].Key;
        // var paramsTwo = {Bucket: 'bucket', Key: key};
        // var url = S3.getSignedUrl('getObject', paramsTwo); //ERROR ISN'T getSignedURL
        // console.log('The URL is: ', url);
        // body.push(response.Contents[0].Key);
        // console.log(response.Contents[0]);

        
      } catch(e) {
        console.log('our error', e);
      }

    })();

    for (var i = 0; i < body.length; i++) {
      console.log(body[i]);
    }

    return (
      <div>
      {/* <PageHeader currentUser={props.currentUser}></PageHeader> */}
      <PageHeader currentUser={props.currentUser}></PageHeader>
    <br/><br/>
        <h1><strong>Upload a new Recording</strong></h1>
        <div id="upload-card">
        <div>Native SDK File Upload Progress is {progress}%</div>
        <input type="file" onChange={handleFileInput}/><br/>
        <button onClick={() => uploadFile(selectedFile)}> Upload to S3</button>
        </div>
        <br/><br/><br/><br/>
        <h1><strong>Video Recordings: Bucket Objects</strong></h1>
        <table id="recordings" style={{width: 1000}}>
          <thead>
            <tr> 
              <th>File</th><th>Last Modified</th><th>Size</th>
            </tr>
          </thead>
            <tr>
              <th><a href="https://recordings-staging-telemedicine5a.s3.amazonaws.com/testvideo1.mov">testvideo1.mov</a></th><th>October 28, 2021, 04:07:46 (UTC-04:00)</th><th>822.3 KB</th>
            </tr>
            <tr>
            <th><a href="https://recordings-staging-telemedicine5a.s3.amazonaws.com/testvideo2.mov">testvideo2.mov</a></th><th>October 28, 2021, 04:07:45 (UTC-04:00)</th><th>1.4 MB</th>
            </tr>
            <tr>
            <th><a href="https://recordings-staging-telemedicine5a.s3.amazonaws.com/testvideo3.mov">testvideo3.mov</a></th><th>October 28, 2021, 04:07:45 (UTC-04:00)</th><th>627.4 KB</th>
            </tr>
            <tr>
            <th><a href="https://recordings-staging-telemedicine5a.s3.amazonaws.com/testvideo4.mov">testvideo4.mov</a></th><th>October 28, 2021, 04:07:44 (UTC-04:00)</th><th>1.5 MB</th>
            </tr>
            <tr>
            <th><a href="https://recordings-staging-telemedicine5a.s3.amazonaws.com/testvideo5.mov">testvideo5.mov</a></th><th>October 28, 2021, 04:07:44 (UTC-04:00)</th><th>2.1 MB</th>
            </tr>
          
        </table>
        {/* <table style={{width: 500}}>
          <thead>
            <tr>
              {heading.map(head => <th>{head}</th>)}
            </tr>
          </thead>
          <tbody>
            {body.map(row => <td> {row} </td>)}
          </tbody>
        </table> */}
        </div>
        
    );

  }


  export default DoctorRecordings;


