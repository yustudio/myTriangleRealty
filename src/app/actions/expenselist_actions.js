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

		console.log("rowIndex in removeExpense is " + rowIndex)
		filteredExpenses.splice(rowIndex, 1);

		dispatch({	
			type: REMOVE_EXPENSE,
			filteredExpenses
		});
	}
}


