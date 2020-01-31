import {applyMiddleware, createStore} from 'redux'
import {rootReducer} from '../reducers/index'
import logger from 'redux-logger'
import thunk from "redux-thunk";
import {loadState, saveState} from "./localStorageUtils";
import throttle from 'lodash.throttle';


const persistedState = loadState();

export const store = createStore(rootReducer, persistedState, applyMiddleware(thunk, logger));

store.subscribe(
	throttle(() => {
		saveState({session: store.getState().session},
		)
	}, 1000)
);