import {LOG_OUT, LOGIN_FAIL, LOGIN_SUCCESS} from "../actions/LoginActions";

const initialState = {
	user: null,
	errorMsg: ''
}

export function sessionReducer(state = initialState, action) {
	switch (action.type) {
		case LOGIN_SUCCESS :
			return {...state, user: {name: action.payload}, errorMsg: ''};

		case LOGIN_FAIL:
			return {...state, user: null, errorMsg: action.payload};

		case LOG_OUT:
			return {...state, user: null, errorMsg: ''};

		default:
			return state;

	}

}