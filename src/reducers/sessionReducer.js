import {LOG_OUT, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, RESET_FORM} from '../utils/CommonConstants';

const initialState = {
	isFetching: false,
	user: null,
	errorMsg: ''
}

export function sessionReducer(state = initialState, action) {
	switch (action.type) {
		case LOGIN_REQUEST :
			return {...state, isFetching: true, errorMsg: ''};
		case LOGIN_SUCCESS :
			return {...state, user: action.payload, errorMsg: '', isFetching: false};

		case LOGIN_FAIL:
			return {...state, user: null, errorMsg: action.payload, isFetching: false};

		case LOG_OUT:
			return {...state, user: null, errorMsg: ''};

		case RESET_FORM:
			return {...state, errorMsg: ''};

		default:
			return state;

	}

}