import React , {useState} from 'react';
import ReactDOM from 'react-dom'; 
import AWS from 'aws-sdk';
require('dotenv').config();

const S3_BUCKET ='recordings-staging-telemedicine5a';
const REGION ='us-east-1';
const ACCESS_KEY = process.env.AWS_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.SECRET_TOKEN;

AWS.config.update({
    accessKeyId: 'AKIAZ7RYNOYKJCH42GGR',
    secretAccessKey: SECRET_ACCESS_KEY,
})

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
})


const DoctorRecordings = () => {

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
            })
    }

    return (
      <div>
      <div>Native SDK File Upload Progress is {progress}%</div>
      <input type="file" onChange={handleFileInput}/>
      <button onClick={() => uploadFile(selectedFile)}> Upload to S3</button>
      </div>
    );

  }


  export default DoctorRecordings;


