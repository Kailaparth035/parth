import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
// import 'regenerator-runtime/runtime';
import reducer from '../Reducers/index';

import mySaga from '../Saga/index';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
// mount it on the Store
const store = createStore(reducer, applyMiddleware(sagaMiddleware));

// then run the saga
sagaMiddleware.run(mySaga);

// render the application
export default store;
