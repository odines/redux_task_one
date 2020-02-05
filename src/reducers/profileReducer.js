import {GET_PROFILE_SUCCESS, GET_PROFILE_ERROR, GET_PROFILE_REQUEST} from '../utils/CommonConstants';

const initialState = {
	isFetching: false,
	profileData: null,
	errorMsg: ''
};

export function profileReducer(state = initialState, action) {
	switch (action.type) {
		case GET_PROFILE_REQUEST:
			return {...state, isFetching: true, errorMsg: ''};
		case GET_PROFILE_SUCCESS:
			return {...state, isFetching: false, profileData: action.payload, errorMsg: ''};
		case GET_PROFILE_ERROR:
			return {...state, isFetching: false, profileData: null, errorMsg: action.payload};
		default:
			return state;
	}
}