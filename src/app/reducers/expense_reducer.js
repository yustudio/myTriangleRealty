import {
	SELECT_IMAGE,
	ADD_IMAGE,
	ADD_EXPENSE,
	REMOVE_EXPENSE,
	ADD_NOTES,
	ADD_EXPENSE_DBKEY,
} from '../actions/types';

export default function (state = {}, action) {
    switch (action.type) {
	        
	    case REMOVE_EXPENSE:
	        return Object.assign({}, state, {
	    		}) 
	    case ADD_NOTES:	    
	    	return Object.assign({}, state, {
	    		...state,
	    		notes: action.notes
	    	})	
	    case ADD_EXPENSE: 
		    return Object.assign({}, state, {
	    		...state,
	    		dbKey: action.dbKey,
	    		notes: null
	    	}) 
	    case SELECT_IMAGE:	
	    	return Object.assign({}, state, {
	    		...state,
	    		loading: true,
	    		imageName: action.imageName
	    	}) 
	    case ADD_IMAGE:
	    	return Object.assign({}, state, {
	    		...state,
	    		loading: false,
	    		imageUrl: action.imageUrl
	    	}) 
	    case ADD_EXPENSE_DBKEY:
	    	return Object.assign({}, state, {
	    		...state,
	    		dbKey: action.dbKey
	    	}) 

	    default:
	        return state;
    }
}