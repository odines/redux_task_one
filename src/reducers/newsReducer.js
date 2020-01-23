import {GET_NEWS_SUCCESS, GET_NEWS_ERROR, GET_NEWS_REQUEST} from "../actions/NewsActions";

const initialState = {
	newsData: [],
	isFetching: false,
	error: ''
}

export function newsReducer(state = initialState, action) {

	switch (action.type) {
		case GET_NEWS_REQUEST:
			return {...state, isFetching: true, error: ''};
		case GET_NEWS_SUCCESS:
			return {...state, isFetching: false, newsData: action.payload, error: ''};
		case GET_NEWS_ERROR:
			return {...state, isFetching: false, error: action.payload};
		default:
			return state;
	}


}