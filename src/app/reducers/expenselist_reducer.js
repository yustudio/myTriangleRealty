import {
	SET_FILTERED_EXPENSES,
	SET_SORTBY,
	SET_SORTDIR,
	SET_STARTDATE,
	SET_ENDDATE, 
	ADD_EXPENSE,
	UPDATE_IMAGE, 
} from '../actions/types';

import _ from 'lodash';


export default function (state = {}, action) {

    switch (action.type) {
    	 case ADD_EXPENSE: {

	    	let prevExpenses = [];
	    	if (state.hasOwnProperty('allExpenses'))
    			prevExpenses = [...state.allExpenses];

    		console.log(JSON.stringify("prevExpense: " + prevExpenses, null, 2))
    		//console.log(JSON.stringify("current expense: " + action.expense, null, 2))

    		let allExpenses = [ 
	    			...prevExpenses,
    				action.expense	    			
	    		];

		    return Object.assign({}, state, {
	    		...state,	    		
	    		allExpenses: allExpenses,
	    		filteredExpenses: allExpenses
	    	}) 
		}
	   

	    case UPDATE_IMAGE:	 
	    {   	    	
	    	let allExpenses = [...state.allExpenses];
	    	
	    	_.map(allExpenses, expense => {
	    		console.log("expense " + JSON.stringify(expense, null, 2))
	    		if (expense.dbKey === action.dbKey) {	
	    			console.log("matched expense " + JSON.stringify(expense, null, 2))
	    			_.map(expense.images, img => {
	    				console.log("img " + JSON.stringify(img, null, 2))
	    				if (img.storageName === action.image.storageName) {
	    					console.log("matched img " + JSON.stringify(img, null, 2))
	    					return img['url'] = action.image.url;
	    				}
	    			})		
	    		};
	    	})

	    	return Object.assign({}, state, {
	    		...state,	    		
	    		allExpenses: allExpenses,
	    		filteredExpenses: allExpenses
	    	}) 	   
	    }
	    
	     case SET_FILTERED_EXPENSES:
	    	return Object.assign({}, state, {
	    		...state,
	    		filteredExpenses: action.filteredExpenses	    		
	    	})

	    default:
	        return state;
    }
}