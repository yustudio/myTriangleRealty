import { connect } from 'react-redux';
import React, {Component} from 'react';
import {firebaseStorage, firebaseDb} from '../../utils/firebase';
import { addNotes, addExpense, addImage, removeExpense, addDate } from '../../actions/expense_actions'

function mapStateToProps(state) {
	
	const { dbKey, date, notes, imageUrl, loading, imageName } = state.expense;

	return {	
		dbKey,
		date,
		notes,
		imageUrl,
		loading,
		imageName		
	}
}

function mapDispatchToProps(dispatch) {
	return {
		onNotesUpdate : (notes) => {
			dispatch(addNotes(notes))
		},
		onSubmitExpense : () => {
			dispatch(addExpense())
		},
		onAddImage: (file) => {
			dispatch(addImage(file))
		},
		onRemoveExpense: () => {
			dispatch(removeExpense())
		},
		onAddDate: (date) => {
			dispatch(addDate(date))
		}
	}
}

class Expenses extends Component {
	constructor() {
		super();
		//this.state = {dbKey: '', notes: '', imageUrl: '', loading: false, imageName: ''};					
	}

	componentDidMount() {				
		// this.storageRef = firebaseStorage.ref();
		// this.dbRef = firebaseDb.ref();			
	}

	_handleRemove(e) {
		e.preventDefault();
		//let imageRef = this.storageRef.child('images/' + this.state.imageName);
		// let imageRef = firebaseStorage.ref('images/' + this.state.imageName);
		// imageRef.delete().then(() => {
		// 	console.log("Removed images")
		// }).then(() => {
		// 	//let dbRef = this.dbRef.child('expenses/' + this.state.dbKey);
		// 	let dbRef = firebaseDb.ref('expenses/' + this.state.dbKey);
		// 	dbRef.remove().then(() => {
		// 		console.log("Removed db record")
		// 	})
		// }).catch((error) => {
		// 	console.log("Error occured during remove: ", error.message);
		// })
		this.props.onRemoveExpense();
	}

	//Zip download
	//http://stackoverflow.com/questions/37176397/multiple-download-links-to-one-zip-file-before-download-javascript/

	// _handleNotesChange(e) {
	// 	this.setState({notes: e.target.value});
	// }


	_handleSubmit(e) {
		e.preventDefault();
		// this.dbRef.push(this.state).then(()=>{
		// 	console.log("Added expense")
		// })
		//let dbKey = this.dbRef.child("expenses").push().key;

		// // Save the key inside expense state to be used 
		// let dbKey = firebaseDb.ref("expenses").push().key;
		// this.state.dbKey = dbKey; //JSON.stringify(dbKey);		
		// let update = {};
		// update['expenses/' + this.state.dbKey] = this.state;

		// this.state.notes = '';

		// //return this.dbRef.update(update);
		// return firebaseDb.ref().update(update);
		this.props.onSubmitExpense();
	}

	_handleImageSelect(e) {

		e.preventDefault();
		
		let file = e.target.files[0];
		this.props.onAddImage(file);							
	}

	_handleDateSelect(e) {

		e.preventDefault();
		this.props.onAddDate(e.target.value);
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
              <p/>
              <p/>             
              <label>Date: </label><input id="expenseDate" type="date" onChange={e=>this._handleDateSelect(e)}/>
	          <div className="col-lg-4">                           

	            <form onSubmit={e => this._handleSubmit(e)}>

	            	<input type="text" value={this.props.notes} 
	            			onChange={e => this.props.onNotesUpdate(e.target.value)} />	                 

	        		<input className="fileInput" type="file" onChange={(e)=>this._handleImageSelect(e)} />	        		                                
					{
						this.props.loading ? (
						<span>Loading...</span>
						) : null
					}	        		                                
	                {/*<progress value="0" max="100" id="uploader">{this.state.progress}</progress>*/}
	                {/*<input type="file" value="upload" id="fileButton" />*/}

	               {/*} {this.state.progress === 100 ? (  */}
		                <button className="submitButton" type="submit" onClick={(e)=>this._handleSubmit(e)}> 
		        			Submit 
		        		</button> 		        		
	        		{/* ) : null}  */}
	        		{/*}	<button className="downloadButton" type="submit" onClick={(e)=>this._handleDownload(e)}> 
		        			Download
		        		</button>       	*/}
				        		
		        		<a href="https://firebasestorage.googleapis.com/v0/b/trianglerealty-7618d.appspot.com/o/images%2FWIN_20160210_123851.JPG?alt=media&token=da49df01-459c-4145-b60c-077eee6290ed" download> download </a>
	        			<button className="removeButton" type="submit" onClick={(e)=>this._handleRemove(e)}> 
		        			Remove
		        		</button>
	            </form>
	          </div>
          </div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);


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



	// _handleDownload(e) {
	// 	e.preventDefault();

	// 	// This can be downloaded directly:
	// 	  var xhr = new XMLHttpRequest();
	// 	  xhr.responseType = 'blob';
	// 	  xhr.onload = function(event) {
	// 	    var blob = xhr.response;
	// 	  };
	// 	  xhr.open('GET', this.state.imageUrl);
	// 	  xhr.send();

	// 	// var starsRef = firebaseStorage.ref('images/WIN_20160208_212136.JPG');

	// 	// // Get the download URL
	// 	// starsRef.getDownloadURL().then(function(url) {
	// 	// 	console.log("url is", url)
	// 	// 	setTimeout(() => {
	// 	// 	window.open(url, "_blank")
	// 	// }, 100)
	// 	//   // Insert url into an <img> tag to "download"
	// 	// })

	// 	// setTimeout(() => {
	//  //      const response = {
	//  //        file: this.state.imageUrl
	//  //      };
	//  //      // server sent the url to the file!
	//  //      // now, let's download:
	//  //      //window.location.href = response.file;
	//  //      // you could also do:
	//  //       window.open(response.file, _blank);
	//  //    }, 100);
	// }




	// let uploadTask = this.storageRef.child('images/' + file.name).put(file)


		// //Setting this methods: http://stackoverflow.com/questions/39191001/setstate-with-firebase-promise-in-react
		// uploadTask.on('state_changed', (snapshot) => {				
		// 		//var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
		// 		var downloadURL = snapshot.downloadURL;
		// 	    this.state.imageUrl = downloadURL;
		// 	    //this.state.progress = progress;	
		// 	    this.state.loading = false;		    
		// 	    console.log("download URL: ", this.state.imageUrl) //, " Progress: ", progress, "%");			   

		// 	}, (error) => {
		// 		switch (error.code) {
		// 	    case 'storage/unauthorized':
		// 	      console.log("User doesn't have permission to access the object");
		// 	      break;
		// 	    case 'storage/canceled':
		// 	      console.log("User canceled the upload");
		// 	      break;		    
		// 	    case 'storage/unknown':
		// 	    default:
		// 	      console.log("Unknown error occurred, inspect error.serverResponse");
		// 	      break;
		// 	  }
		// 	})