
const AWS = require('aws-sdk');


function DoctorRecordings() {
    const bucketName = "recordings.senior-project";
    const bucketRegion = "us-east-1";
    //securely add AWS access keys somehwere...
    const file = "/Users/cadelanktree/Downloads/myTemp.txt";

    AWS.config.update({
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
    })

    this.myBucket = new AWS.S3({
        params: { Bucket: bucketName},
        region: bucketRegion,
    })

    uploadFile = (file) => {
        const params = {
          ACL: 'public-read',
          Key: file.name,
          ContentType: file.type,
          Body: file,
        }
        this.myBucket.putObject(params)
          .on('httpUploadProgress', (evt) => {
            // that's how you can keep track of your upload progress
            this.setState({
              progress: Math.round((evt.loaded / evt.total) * 100),
            })
          })
          .send((err) => {
             if (err) {
               // handle the error here
             }
          })
      }

    // let file = "/Users/cadelanktree/Downloads/myTemp.txt";
    // const config = {
    //     bucketName: bucketName,
    //     region: bucketRegion,
    //     accessKeyId: "AKIAUIO6XERTOB4Y2HMZ",
    //     secretAccessKey: "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"
    // };
    // S3FileUpload.uploadFile(file, config).then(data => console.log(data)).catch(err => console.error(err));

    // return (
    //     <>
    //         <form className="upload-steps" onSubmit={handleClick}>
    //             <label> Upload file: 
    //                 <input type="file" ref={fileInput} />
    //             </label>
    //             <br />
    //             <button type="sumbit"> Upload </button>
    //         </form>
    //     </>

    // <div>
    //         <h2>Upload a recording</h2>
    //         <p>Upload a video recording by completing this form in its entirety then clicking "Submit".</p>

    //     <form action="/action_page.php" method="POST">
    //         <label>
    //             Upload a file to S3
    //             <input type="file" id="fileUpload" name="name" />
    //         </label>
    //         <input type="submit" value="Submit" onClick={s3upload}/>
    //     </form>

        /* <form class="formContainer" method="POST">
	
			<label for="name">
				<strong> Patient Name </strong>
			</label>
			<input type="text" id="PatientName" placeholder="Enter patient's name" name="name" required> </input> 

			<label for="date">
				<strong>Date</strong>
			</label>
			<input type="date" id="RecordingDate" name="date" required> </input> 
		  
			<label for="description">
				<strong>Description</strong>
			</label>
			<input type="text" id="RecordingDescription" placeholder="Describe the Recording" name= "desc" required> </input> 

		  <h4 id="response"></h4>
          <div>        
			<input type="file" id="fileUpload"> </input>   
		 </div>    
		 <div> 
			<button>Submit</button>    
		 </div>

        </form> */


        /* <h2>Video Recordings</h2>
	    <p> *insert formatted, video recording metadata below*</p>

    </div> */
            
    //     );
    }



    // function s3upload() {
    //     const bucketName = "recordings.senior-project";
    //     const bucketRegion = "us-east-1";
    //     const IdentityPoolId = "us-east-1:21b804bd-e47e-42f5-8136-2a7b09b105ff";

    //     AWS.config.update({
    //         region: bucketRegion,
    //         credentials: new AWS.CognitoIdentityCredentials({
    //             IdentityPoolId: IdentityPoolId
    //         })
    //     });

    //     var s3 = new AWS.S3({
    //         apiVersion: '2006-03-01',
    //         params: {Bucket: bucketName}
    // })
    //     var files = document.getElementById('fileUpload').files;
    //     if (files) 
    //     {
    //       var file = files[0];
    //       var fileName = file.name;
    //       var filePath = 'my-first-bucket-path/' + fileName;
    //       var fileUrl = 'https://' + bucketRegion + '.amazonaws.com/my-    first-bucket/' +  filePath;
    //       s3.upload({
    //          Key: fileUrl,
    //          Body: file,
    //          ACL: 'public-read'
    //          }, function(err, data) {
    //          if(err) {
    //          Promise.reject('error');
    //          }
    //          alert('Successfully Uploaded!');
    //        });
    //     }
    //  };


// export default DoctorRecordings;