//import Filereader from 'filereader';
import _ from 'lodash';
import {firebaseStorage, firebaseDb} from '../utils/firebase';
import {
	SET_FILTERED_EXPENSES,
	SET_SORTBY,
	SET_SORTDIR,
	SET_STARTDATE,
	SET_ENDDATE, 
	REMOVE_EXPENSE,
} from './types';

export function setFilteredExpenses(filteredExpenses) {
	
	return {
		type: SET_FILTERED_EXPENSES,
		filteredExpenses
	}
}

export function setStartDate(startDate) {
	return {		
		type: SET_STARTDATE,
		startDate
	}
}

export function setEndDate(endDate) {
	return {		
		type: SET_ENDDATE,
		endDate
	}
}

export function removeExpense(rowIndex) {
	return (dispatch, getState) => {

		let filteredExpenses = [ ...getState().expenseList.filteredExpenses ];
		let allExpenses = [ ...getState().expenseList.allExpenses ];

		let filteredExpense = filteredExpenses[rowIndex];
		let allExpenseIndx = allExpenses.findIndex((expense) => { return expense.dbKey === filteredExpense.dbKey; });
		

		// remove from firebase storage
		let removeFrFirebaseStorage = filteredExpenses[rowIndex].images.map((img) => {
			return firebaseStorage.ref(img.storageName).delete();
		});

		//let removeFrFirebaseDb = firebaseDb.ref('expenses/' + ).remove();
		let update = {};
		update[filteredExpenses[rowIndex].dbKey] = null;
		let removeFrFirebaseDb = firebaseDb.ref('expenses').update(update);

		Promise.all([removeFrFirebaseStorage, removeFrFirebaseDb])
		.then(()=>{
			console.log("rowIndex in allExpense is " + allExpenseIndx)
			allExpenses.splice(allExpenseIndx,1);

			console.log("rowIndex in removeExpense is " + rowIndex)
			filteredExpenses.splice(rowIndex, 1);

			return (
				// remove from state
				dispatch({	
					type: REMOVE_EXPENSE,
					filteredExpenses,
					allExpenses
				})
			)
		}).catch((err) => {
			console.log("Error during removal of image: " + err.message);
		})	
	}
}


