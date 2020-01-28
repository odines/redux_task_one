import fetch from 'cross-fetch'
import swapArray from "../utils/profileUtils";

export const GET_PROFILE_REQUEST = 'GET_PROFILE_REQUEST';
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
export const GET_PROFILE_ERROR = 'GET_PROFILE_ERROR';

const GET_PROFILE_URL = 'https://mysterious-reef-29460.herokuapp.com/api/v1/user-info/';


export function getProfile(profileID) {

	return function (dispatch) {

		dispatch({
			type: GET_PROFILE_REQUEST
		});

		if (profileID) {
			const requestURL = GET_PROFILE_URL + profileID;
			console.log('GET PROFILE REQUEST, url = ' + requestURL);

			fetch(requestURL)
				.then(response => response.json())
				.then(response => {
					if (response.status === 'ok') {
						swapArray(response.data.social);
						dispatch({
							type: GET_PROFILE_SUCCESS,
							payload: response.data
						})
					} else {
						throw Error('Profile not found');
					}
				})
				.catch(error => {
					console.log(error);
					dispatch({
						type: GET_PROFILE_ERROR,
						payload: error.message,
						error: true
					})
				})

		} else {
			dispatch({
				type: GET_PROFILE_ERROR,
				payload: 'Profile id is empty',
				error: true
			})
		}


	}

}