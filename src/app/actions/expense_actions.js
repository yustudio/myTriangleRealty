import {
  ADD_NOTES,
  ADD_EXPENSE
} from './types';
import {firebaseStorage, firebaseDb} from '../utils/firebase';

export function addNotes(notes) {
	return {		
		type: ADD_NOTES,
		notes
	}
}

export function addExpense() {
	return (dispatch, getState) => {
		let dbKey = firebaseDb.ref("expenses").push().key;	
		let update = {};
		update['expenses/' + dbKey] = getState().expense;		
		//update['expenses/' + dbKey + '/notes'] = '';
		
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