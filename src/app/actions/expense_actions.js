//import Filereader from 'filereader';
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
  UPDATE_IMAGES,
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

function updateExpenseState(expense) {
	let newExpense = {};
	if (expense.hasOwnProperty('date')) 
		newExpense['date'] = expense.date;
	if (expense.hasOwnProperty('notes')) 
		newExpense['notes'] = expense.notes;	
	if (expense.hasOwnProperty('images')) 
		newExpense['images'] = expense.images;
	newExpense['dbKey'] = expense.dbKey;	

	return {
		type: ADD_EXPENSE,
		expense: newExpense
	}
}

// function storeImages(images) {
// 	let newImages = [];

// 	console.log("in storeImage")

// 	return new Promise((resolve, reject) => {
		
// 		for (let image of images) {
// 			console.log("in the for loop")
// 			 //firebaseStorage.ref('images/' + image.storageName).put(image.file)
// 			 firebaseStorage.ref(image.storageName).put(image.file)
// 				.then((snapshot) => {								
// 					let downloadUrl = snapshot.downloadURL;			    
// 				    console.log("download URL: ", downloadUrl) //, " Progress: ", progress, "%");			   
				        
// 				    // Used to update store image
// 				    newImages = [
// 				    	...newImages,
// 				    	{...image, 'url': downloadUrl}
// 				    ];		
// 				    console.log("newImages in the loop: " + JSON.stringify(newImages, null, 2))		
// 				})
// 			}

// 		console.log("newImages after loop: " + JSON.stringify(newImages, null, 2))
		
// 		resolve(newImages);
// 		}
// 	)
// }

export function addExpense() {
	return (dispatch, getState) => {
		// Get the db key to insert it into the expense record
		let dbKey = firebaseDb.ref("expenses").push().key;	
		dispatch({
			type: ADD_EXPENSE_DBKEY,
			dbKey: dbKey
		})

		dispatch(updateExpenseState(getState().expense))

		if (!getState().expense.hasOwnProperty('images') || 
			getState().expense.images.length === 0) {			

			dispatch(updateExpenseDb(dbKey, getState().expense.allExpenses[getState().expense.allExpenses.length-1]));
			return;
		}
	
		let downloadUrl = '';

		for (let image of getState().expense.images) {
			console.log("in the for loop")
			 //firebaseStorage.ref('images/' + image.storageName).put(image.file)
			 firebaseStorage.ref(image.storageName).put(image.file)
				.then((snapshot) => {								
					downloadUrl = snapshot.downloadURL;			    
				    console.log("download URL: ", downloadUrl) //, " Progress: ", progress, "%");			   

				}).then(() => 
					dispatch({		
						type: UPDATE_IMAGE,						
						image: {...image, 'url': downloadUrl},
						dbKey: dbKey
					})
				).then(() => {
						
						//dispatch(updateExpenseState(getState().expense))
						dispatch(updateExpenseDb(dbKey, getState().expense.allExpenses[getState().expense.allExpenses.length-1]));
						console.log("after dispatch update DB action, length is " + getState().expense.allExpenses.length)
				})
			}		
	}
}

export function onDropzoneSelect(files) {
	return (dispatch, getState) => {
		let images = [];

		dispatch({
			type: SELECT_IMAGE,
			//imageName: file.name
		});

		for (const key in files) {
			if (!files.hasOwnProperty(key)) continue; // end loop at inherite property

			let image = {};
			image['storageName'] = files[key].name;   // TODO, add right format for date to file name
			image['file'] = files[key];
	
			//http://okonet.ru/react-dropzone/
			image['previewUrl'] = files[key].preview;

			images = [
				...images,
				image
			];
		}

		dispatch({
	    		type: ADD_IMAGE,
	    		images: images
		})
	}
}

// function getImage(files) {
// 	return new Promise((resolve, reject) => {
// 		let images = [];
// 		let reader = new FileReader();

// 		for (const key in files) {
// 			if (!files.hasOwnProperty(key)) continue; // end loop at inherite property

// 			let image = {};
// 			image['storageName'] = files[key].name;   // TODO, add right format for date to file name
// 			image['file'] = files[key];
	
// 			//https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
// 			reader.onload = function(e) {
// 				image['previewUrl'] = e.target.result;

// 				let preview = document.querySelector('#preview');
// 				let htmlImage = new Image();
// 				htmlImage.height=100;
// 				htmlImage.src=e.target.result;
// 				preview.appendChild(htmlImage);
// 			}

// 			images = [
// 				...images,
// 				image
// 			];		

// 			reader.readAsDataURL(files[key]);
// 		}

// 		resolve(images);
// 	})
// }

// export function addImage(files) {
// 	return (dispatch, getState) => {
// 		dispatch({
// 			type: SELECT_IMAGE,
// 			//imageName: file.name
// 		});


// 		return getImage(files).then(images => 
// 			dispatch({
// 	    		type: ADD_IMAGE,
// 	    		images: images
// 			})
// 		)			
// 	}	
// }

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
		//console.log("images before removal " + JSON.stringify(images, null, 2));

		let images = [ ...getState().expense.images ];
		_.remove(images, image => image.storageName === imageName);

		//console.log("images after removal " + JSON.stringify(images, null, 2));

		dispatch({
			type: UPDATE_IMAGES,
			images: images
		})
	}
}
