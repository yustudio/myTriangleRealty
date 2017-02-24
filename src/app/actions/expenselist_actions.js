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


