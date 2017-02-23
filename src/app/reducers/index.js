import { combineReducers } from 'redux';
import FireBaseUserReducer from './firebase_user_reducer';
import ExpenseReducer from './expense_reducer';
import ExpenseListReducer from './expenselist_reducer';


// const ExpensesReducer = combineReducers({
//     expenses: ExpensesListReducer,
//     ExpenseReducer,    
// });

const rootReducer = combineReducers({
    currentUser: FireBaseUserReducer,
    expense: ExpenseReducer,
    expenseList: ExpenseListReducer,
});

export default rootReducer;
