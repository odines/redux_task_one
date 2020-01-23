import {combineReducers} from "redux";
import {sessionReducer} from "./sessionReducer";
import {newsReducer} from "./newsReducer";


export const rootReducer = combineReducers({
	session: sessionReducer,
	news: newsReducer
});