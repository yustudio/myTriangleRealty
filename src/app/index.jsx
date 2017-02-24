import createLogger from 'redux-logger';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, browserHistory } from 'react-router';
import ReduxPromise from 'redux-promise';
import thunk from 'redux-thunk';

import reducers from './reducers';
import routes from './routes';

import 'bootstrap-social';

// for bundling your styles
import './bundle.scss';

const logger = createLogger();

let initialState = {expense: {notes: '', images: []}, expenseList: {allExpenses: [], filteredExpenses: []}};

//const createStoreWithMiddleware = applyMiddleware(thunk, ReduxPromise, logger)(createStore);

const createStoreWith = compose(applyMiddleware(thunk, ReduxPromise, logger))(createStore);

const configureStore = (initialState) => {
  return createStoreWith(reducers, initialState);
};

ReactDOM.render(
    <Provider store={configureStore(initialState)}>
        <Router history={browserHistory} routes={routes} />
    </Provider>
  , document.querySelector('.react-root'));
