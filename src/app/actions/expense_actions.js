import {
  ADD_NOTES,
  ADD_EXPENSE,
  ADD_EXPENSE_DBKEY,
  SELECT_IMAGE,
  ADD_IMAGE,
  REMOVE_EXPENSE,
  ADD_DATE,
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

export function addExpense() {
	return (dispatch, getState) => {
		let dbKey = firebaseDb.ref("expenses").push().key;	
		dispatch({
			type: ADD_EXPENSE_DBKEY,
			dbKey: dbKey
		})

		let update = {};
		update['expenses/' + dbKey] = getState().expense;		
		
		firebaseDb.ref().update(update).then(() => 
			dispatch({		
				type: ADD_EXPENSE,
				dbKey: '',
				notes: '',
				imageUrl: [],
				imageName: ''
			})
		).catch((e) => {
			console.log(e.message)
		});		
	}
}

export function addImage(file) {
	return (dispatch, getState) => {
		dispatch({
			type: SELECT_IMAGE,
			//imageName: file.name
		});

		firebaseStorage.ref('images/' + file.name).put(file)
			.then((snapshot) => {								
				let downloadUrl = snapshot.downloadURL;			    
			    console.log("download URL: ", downloadUrl) //, " Progress: ", progress, "%");			   
			        
			    let image = {};
			    image['url'] = downloadUrl;
			    image['name'] = file.name;

			    console.log(image)

			    getState().expense.images.push(image);			    

			    console.log(getState().expense)

			    dispatch({
		    		type: ADD_IMAGE,
		    		images: getState().expense.images
			    })

			}).catch((error) => {
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
