import {
	SELECT_IMAGE,
	ADD_IMAGE,
	ADD_EXPENSE,
	REMOVE_EXPENSE,
	ADD_NOTES,
	ADD_EXPENSE_DBKEY,
	ADD_DATE,
	RESET_EXPENSE,
	UPDATE_IMAGES,	
} from '../actions/types';

import _ from 'lodash';


export default function (state = {}, action) {
    switch (action.type) {
	    case ADD_DATE:
	    	return Object.assign({}, state, {
	    		...state,
	    		date: action.date	    		
	    	})
	    case REMOVE_EXPENSE:
	        return Object.assign({}, state, {
	        	notes: ''	    		
	    	})
	    case ADD_NOTES:	    
	    	return Object.assign({}, state, {
	    		...state,
	    		notes: action.notes
	    	})	
	    // case ADD_EXPENSE: 

	    // 	let prevExpenses = [];
	    // 	if (state.hasOwnProperty('allExpenses'))
    	// 		prevExpenses = [...state.allExpenses];

    	// 	console.log(JSON.stringify("prevExpense: " + prevExpenses, null, 2))
    	// 	console.log(JSON.stringify("current expense: " + action.expense, null, 2))

		   //  return Object.assign({}, state, {
	    // 		...state,	    		
	    // 		allExpenses: [ 
	    // 			...prevExpenses,
    	// 			action.expense	    			
	    // 		]
	    // 	}) 
	    case RESET_EXPENSE:
	    	return {
	    		...state,
	    		dbKey: action.dbKey,
	    		notes: action.notes,
	    		images: action.images
	    	}
	    case SELECT_IMAGE:	
	    	return Object.assign({}, state, {
	    		...state,
	    		loading: true,
	    		//images: action.imageName
	    	}) 
	    case ADD_IMAGE:	 
	    {   
	    	//console.log(state)
	    	let newImages = [];
	    	// for (const image of state.images) {
	    	// 	newImages.push(image);
	    	// }

	    	newImages = [	    		
	    		...state.images,
	    		...action.images
	    	] 

	    	return Object.assign({}, state, {
	    		...state,
	    		loading: false,
	    		images: newImages
	    	}) 	    
	    }
	    case UPDATE_IMAGES:	 
	    {   	    	
	    	return Object.assign({}, state, {
	    		...state,
	    		loading: false,
	    		images: action.images
	    	}) 	    
	    }
	    // case UPDATE_IMAGE:	 
	    // {   
	    // 	let allExpenses = [...state.allExpenses];
	    // 	_.map(allExpenses, expense => {
	    // 		console.log("expense " + JSON.stringify(expense, null, 2))
	    // 		if (expense.dbKey === action.dbKey) {	
	    // 			console.log("matched expense " + JSON.stringify(expense, null, 2))
	    // 			_.map(expense.images, img => {
	    // 				console.log("img " + JSON.stringify(img, null, 2))
	    // 				if (img.storageName === action.image.storageName) {
	    // 					console.log("matched img " + JSON.stringify(img, null, 2))
	    // 					return img['url'] = action.image.url;
	    // 				}
	    // 			})    			    			
	    			
	    // 		};
	    // 	})

	    // 	return Object.assign({}, state, {
	    // 		...state,
	    // 		loading: false,
	    // 		allExpenses: allExpenses
	    // 	}) 	   
	    // }
	    case ADD_EXPENSE_DBKEY:
	    	return Object.assign({}, state, {
	    		...state,
	    		dbKey: action.dbKey
	    	}) 

	    default:
	        return state;
    }
}