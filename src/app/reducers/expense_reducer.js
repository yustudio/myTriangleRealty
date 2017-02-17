import {
	SELECT_IMAGE,
	ADD_IMAGE,
	ADD_EXPENSE,
	REMOVE_EXPENSE,
	ADD_NOTES,
	ADD_EXPENSE_DBKEY,
	ADD_DATE,
	RESET_EXPENSE,
} from '../actions/types';

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
	    case ADD_EXPENSE: 
		    return Object.assign({}, state, {
	    		...state,	    		
	    		images: action.images
	    	}) 
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
	    	console.log(state)
	    	let newImages = [];
	    	// for (const image of state.images) {
	    	// 	newImages.push(image);
	    	// }

	    	newImages = [
	    		...newImages,
	    		...state.images,
	    		...action.images
	    	]  	

	    	return Object.assign({}, state, {
	    		...state,
	    		loading: false,
	    		images: newImages
	    	}) 	    
	    }
	    case ADD_EXPENSE_DBKEY:
	    	return Object.assign({}, state, {
	    		...state,
	    		dbKey: action.dbKey
	    	}) 

	    default:
	        return state;
    }
}