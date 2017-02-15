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
		
		firebaseDb.ref().update(update).then(
			{		
				type: ADD_EXPENSE,
				dbKey
			}
		).catch((e) => {
			console.log(e.message)
		});		
	}
}

export function addImage(file) {
	return (dispatch, getState) => {
		dispatch({
			type: SELECT_IMAGE,
			imageName: file.name
		});

		firebaseStorage.ref('images/' + file.name).put(file)
			.then((snapshot) => {								
				let downloadUrl = snapshot.downloadURL;			    
			    console.log("download URL: ", downloadUrl) //, " Progress: ", progress, "%");			   

			    dispatch({
		    		type: ADD_IMAGE,
		    		imageUrl: downloadUrl			    	
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
			      console.log("Unknown error occurred, inspect error.serverResponse");
			      break;
			  }
			})	
	}	
}

export function removeExpense() {
	return (dispatch, getState) => {
		let imageRef = firebaseStorage.ref('images/' + getState().expense.imageName);
			imageRef.delete().then(() => {
				console.log("Removed images")
			}).then(() => {
				//let dbRef = this.dbRef.child('expenses/' + this.state.dbKey);
				let dbRef = firebaseDb.ref('expenses/' + getState().expense.dbKey);
				dbRef.remove().then(() => {
					console.log("Removed db record")
					dispatch({
						type: REMOVE_EXPENSE
					})					
				})
			}).catch((error) => {
				console.log("Error occured during remove: ", error.message);
			})
		}
}