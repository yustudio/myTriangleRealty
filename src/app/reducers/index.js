import { combineReducers } from 'redux';
import FireBaseUserReducer from './firebase_user_reducer';
import ExpenseReducer from './expense_reducer';

const rootReducer = combineReducers({
    currentUser: FireBaseUserReducer,
    expense: ExpenseReducer
});

export default rootReducer;
