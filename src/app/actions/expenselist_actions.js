//import Filereader from 'filereader';
import _ from 'lodash';
import {firebaseStorage, firebaseDb} from '../utils/firebase';
import {
	SET_FILTERED_EXPENSES,
	SET_SORTBY,
	SET_SORTDIR,
	SET_STARTDATE,
	SET_ENDDATE,  
} from './types';

export function updateFilteredExpenses(filteredExpenses) {
	
	return {
		type: SET_FILTERED_EXPENSES,
		filteredExpenses
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

