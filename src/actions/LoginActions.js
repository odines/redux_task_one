import {checkLogin} from "../utils/checkLogin";

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOG_OUT = 'LOG_OUT';

export function handleLogin(username, password) {
	return function (dispatch) {
		try {
			if (checkLogin(username, password)) {
				dispatch({
					type: LOGIN_SUCCESS,
					error: false,
					payload: username
				})
			} else {
				dispatch({
					type: LOGIN_FAIL,
					error: true,
					payload: 'Ошибка авторизации'
				})

			}
		} catch (e) {
			dispatch({
				type: LOGIN_FAIL,
				error: true,
				payload: new Error(e)
			})
		}
	}
}

export function handleLogOut() {
	return function (dispatch) {
		dispatch({
			type: LOG_OUT
		})
	}
}