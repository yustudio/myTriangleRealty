import {
	ADD_IMAGE,
	ADD_EXPENSE,
	REMOVE_EXPENSE,
	ADD_NOTES
} from '../actions/types';

export default function (state = {}, action) {
    switch (action.type) {
	    case ADD_IMAGE:	    
	    case REMOVE_EXPENSE:
	        return action.payload; 
	    case ADD_NOTES:
	    
	    	return Object.assign({}, state, {
	    		...state,
	    		notes: action.notes
	    	})	
	    case ADD_EXPENSE: 
		    return Object.assign({}, state, {
	    		...state,
	    		dbKey: action.dbKey
	    	})   

	    default:
	        return state;
    }
}