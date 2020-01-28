import {combineReducers} from "redux";
import {sessionReducer} from "./sessionReducer";
import {newsReducer} from "./newsReducer";
import {profileReducer} from "./profileReducer";


export const rootReducer = combineReducers({
	session: sessionReducer,
	news: newsReducer,
	profile: profileReducer
});