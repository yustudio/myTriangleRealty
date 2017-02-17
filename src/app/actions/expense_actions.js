import Filereader from 'filereader';
import _ from 'lodash';

import {
  ADD_NOTES,
  ADD_EXPENSE,
  ADD_EXPENSE_DBKEY,
  SELECT_IMAGE,
  ADD_IMAGE,
  REMOVE_EXPENSE,
  ADD_DATE,
  RESET_EXPENSE,
  UPDATE_IMAGE,
} from './types';
import {firebaseStorage, firebaseDb} from '../utils/firebase';



export function addDate(date) {
	console.log()
	return {
		type: ADD_DATE,
		date
	}
}

export function addNotes(notes) {
	return {		
		type: ADD_NOTES,
		notes
	}
}

function updateExpenseDb(dbKey, expense) {
	// Update firebase database
	let update = {};
	update['expenses/' + dbKey] = expense;		
	
	return firebaseDb.ref().update(update).then(() => {
		console.log("after updating DB")
		return {		
			type: RESET_EXPENSE,
			dbKey: '',
			notes: '',
			images: []				
		}
	}).catch((e) => {
		console.log(e.message)
	});	
}

export function addExpense() {
	return (dispatch, getState) => {
		// Get the db key to insert it into the expense record
		let dbKey = firebaseDb.ref("expenses").push().key;	
		dispatch({
			type: ADD_EXPENSE_DBKEY,
			dbKey: dbKey
		})

		if (!getState().expense.hasOwnProperty('images') || 
			getState().expense.images.length === 0) {
			console.log("don't have images")
			dispatch(updateExpenseDb(dbKey, getState().expense));
		}

		console.log("have images")

		let newImages = [];

		//console.log("getState().expense.images  " + JSON.stringify(getState().expense.images, null, 2))

		// Upload firebase storage
		for (let image of getState().expense.images) {
			firebaseStorage.ref('images/' + image.storageName).put(image.file)
				.then((snapshot) => {								
					let downloadUrl = snapshot.downloadURL;			    
				    console.log("download URL: ", downloadUrl) //, " Progress: ", progress, "%");			   
				        
				    // Used to update store image
				    newImages = [
				    	...newImages,
				    	{...image, 'url': downloadUrl}
				    ];

				    // let images = [];
				    // for (const img of getState().expense.images) {
				    // 	console.log("img" + img)
				    // 	images.push(imag);	
				    // }			    

				    //console.log(getState().expense)

				    // dispatch({
			    	// 	type: ADD_IMAGE,
			    	// 	image: image
				    // })
				}).then(() => 
					dispatch({		
						type: ADD_EXPENSE,
						// dbKey: '',
						// notes: '',
						// images: []
						images: newImages
					})
				).then(() => {

						//console.log("before update storage:" + JSON.stringify((getState().expense)));

						dispatch(updateExpenseDb(dbKey, getState().expense));
						console.log("after dispatch update DB action")
					}

				).catch((error) => {
					switch (error.code) {
				    case 'storage/unauthorized':
				      console.log("User doesn't have permission to access the object");
				      break;
				    case 'storage/canceled':
				      console.log("User canceled the upload");
				      break;		    
				    case 'storage/unknown':
				    default:
				      console.log("Unknown error occurred, inspect error.serverResponse: " + error.serverResponse);
				      break;
				  }
				})
		}	
	}
}

export function addImage(files) {
	return (dispatch, getState) => {
		dispatch({
			type: SELECT_IMAGE,
			//imageName: file.name
		});

		//console.log(JSON.stringify(files, null, 2))


		let images = [];
		for (const key in files) {
			if (!files.hasOwnProperty(key)) continue; // end loop at inherite property

			let image = {};
			image['storageName'] = files[key].name;   // TODO, add right format for date to file name
			image['file'] = files[key];
			//console.log("image " + JSON.stringify(image, null, 2))
			
			images = [
				...images,
				image
			];

			// reader.addEventListener("load", function() {
			// 	image['previewUrl'] = reader.result;
			// }, false);

			// if (files[key]) {
			// 	console.log("before readAsDataURL")
			// 	reader.readAsDataURL(files[key]);			
			// 	console.log("after readAsDataURL")
			// }
		}


		// function readAndPreview(file){
		// 	// console.log(file.name)
		// 	// console.log(file.path)
		// 	// console.log(file.stream)
		// 	// console.log(file.buffer)
		// 	// file.path = 'test';	
		// 	// file.stream = 'test';
		// 	// file.buffer = 'test';

		// 	let reader = new Filereader();
		// 	reader.addEventListener("load", function() {
		// 		images[0]['previewUrl'] = this.result;
		// 	}, false);
			
		// 	reader.readAsDataURL(file);
		// }

		// [].forEach.call(files, readAndPreview);

		//console.log("images " + JSON.stringify(images, null, 2))

		dispatch({
    		type: ADD_IMAGE,
    		images: images
		})


		// Update firebase image
		// firebaseStorage.ref('images/' + file.name).put(file)
		// 	.then((snapshot) => {								
		// 		let downloadUrl = snapshot.downloadURL;			    
		// 	    console.log("download URL: ", downloadUrl) //, " Progress: ", progress, "%");			   
			        
		// 	    // Used to update store image
		// 	    let image = {};
		// 	    image['url'] = downloadUrl;
		// 	    image['name'] = file.name;			  

		// 	    // let images = [];
		// 	    // for (const img of getState().expense.images) {
		// 	    // 	console.log("img" + img)
		// 	    // 	images.push(imag);	
		// 	    // }			    

		// 	    //console.log(getState().expense)

		// 	    dispatch({
		//     		type: ADD_IMAGE,
		//     		image: image
		// 	    })

		// 	}).catch((error) => {
		// 		switch (error.code) {
		// 	    case 'storage/unauthorized':
		// 	      console.log("User doesn't have permission to access the object");
		// 	      break;
		// 	    case 'storage/canceled':
		// 	      console.log("User canceled the upload");
		// 	      break;		    
		// 	    case 'storage/unknown':
		// 	    default:
		// 	      console.log("Unknown error occurred, inspect error.serverResponse: " + error.serverResponse);
		// 	      break;
		// 	  }
		// 	})	
	}	
}

function removeDbExpense(dbKey) {
			
	let dbRef = firebaseDb.ref('expense/' + dbKey);
	dbRef.remove().then(() => {
		console.log("Removed db record")
		return {
			type: REMOVE_EXPENSE,
			note: ''
		}					
	}).catch((error) => {
		console.log("Error occured during remove: ", error.message);
	})
}

export function removeExpense() {
	return (dispatch, getState) => {

		const dbKey = getState().expense.dbKey;
		const imageName = getState().expense.imageName;
		//console.log("dbKey is: ", key)

		if (getState().expense.hasOwnProperty("imageUrl")) {
			let imageRef = firebaseStorage.ref('images/' + imageName);
			imageRef.delete().then(() => {
				console.log("Removed images")
				// Don't call dispatch: https://github.com/gaearon/redux-thunk/issues/29
				removeDbExpense(dbKey);
			})			
		} else {
			removeDbExpense(dbKey);
		}
	}

}

export function removeImage(imageName) {
	return (dispatch, getState) => {

		console.log("imageName is " + imageName)
		console.log("images before removal " + JSON.stringify(images, null, 2));

		let images = [ ...getState().expense.images ];
		_.remove(images, image => image.storageName === imageName);

		console.log("images after removal " + JSON.stringify(images, null, 2));

		dispatch({
			type: UPDATE_IMAGE,
			images: images
		})
	}
}
