import React, {Component} from 'react';
import {firebaseStorage, firebaseDb} from '../../utils/firebase';

class Expenses extends Component {
	constructor() {
		super();
		this.state = {file: '', imageUrl: '', progress: 0};					
	}

	componentDidMount() {		
		// this.state.storageRef = firebase.storage().ref();
		// this.state.imgRef = stroageRef.child('images/test1.jpg');
		this.storageRef = firebaseStorage.ref();
		this.dbRef = firebaseDb.ref('/'+"guests");
			
	}

	_handleSubmit(e) {
		e.preventDefault();
		this.dbRef.push(this.state).then(()=>{
			console.log("Added expense")
		})
	}

	_handleImageSelect(e) {

		let that = this;

		e.preventDefault();
		let file = e.target.files[0];

		let uploadTask = that.storageRef.child('images/' + file.name).put(file);

		//Setting this methods: http://stackoverflow.com/questions/39191001/setstate-with-firebase-promise-in-react
		uploadTask.on('state_changed', (snapshot) => {
				var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				var downloadURL = uploadTask.snapshot.downloadURL;
			    this.state.imageUrl = downloadURL;
			    this.state.progress = progress;
			    console.log("download URL: ", this.state.imageUrl, " Progress: ", progress, "%");			   
			}, (error) => {
				switch (error.code) {
			    case 'storage/unauthorized':
			      console.log("User doesn't have permission to access the object");
			      break;
			    case 'storage/canceled':
			      console.log("User canceled the upload");
			      break;		    
			    case 'storage/unknown':
			    default:
			      console.log("Unknown error occurred, inspect error.serverResponse");
			      break;
			  }
			})

		// uploadTask.on('state_changed', //this.storageRef.TaskEvent.STATE_CHANGED, // or 'state_changed'
		//   function(snapshot) {
		//     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
		//     var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
		//     //that.setState({progress: progress});
		//     console.log('Upload is ' + progress + '% done');
		//     switch (snapshot.state) {
		// 	      case 'paused': //that.storageRef.TaskState.PAUSED: // or 'paused'
		// 	        console.log('Upload is paused');
		// 	        break;
		// 	      case 'running': //that.storageRef.TaskState.RUNNING: // or 'running'
		// 	        console.log('Upload is running');
		// 	        break;
		// 	    }
		// 	  }, function(error) {
		// 	  switch (error.code) {
		// 	    case 'storage/unauthorized':
		// 	      // User doesn't have permission to access the object
		// 	      break;
		// 	    case 'storage/canceled':
		// 	      // User canceled the upload
		// 	      break;		    
		// 	    case 'storage/unknown':
		// 	      // Unknown error occurred, inspect error.serverResponse
		// 	      break;
		// 	  }
		// 	}, function() {
		// 	  // Upload completed successfully, now we can get the download URL
		// 	  var downloadURL = uploadTask.snapshot.downloadURL;
		// 	  that.state.imageUrl = downloadURL;
		// 	  console.log("download URL: ", this.state.imageUrl);
		// 	}
		// );
	}



	render() {
		
		return (
			<div className="row">
              <div className="col-lg-4">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => console.log("Going to credit card1")}//this.props.onAddToInvite(this.state.name)}
                >
                  Credit Card1
                </button>
              </div>
	          <div className="col-lg-4">
	            <form onSubmit={(e)=>this._handleSubmit(e)}>
	        		<input className="fileInput" type="file" onChange={(e)=>this._handleImageSelect(e)} />
	        		                                
	                <progress value="0" max="100" id="uploader">0%</progress>
	                {/*<input type="file" value="upload" id="fileButton" />*/}

	               {/*} {this.state.progress === 100 ? (  */}
		                <button className="submitButton" type="submit" onClick={(e)=>this._handleSubmit(e)}> 
		        			Submit 
		        		</button> 
	        		{/* ) : null}  */}
	            </form>
	          </div>
          </div>
		)
	}
}

export default Expenses;