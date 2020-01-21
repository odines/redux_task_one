import {checkLogin} from "../utils/checkLogin";

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOG_OUT = 'LOG_OUT';

export function handleLogin(user, history) {
	return function (dispatch) {
		try {
			debugger
			const {username, password} = user;
			if (checkLogin(username, password)) {
				dispatch({
					type: LOGIN_SUCCESS,
					error: false,
					payload: username
				})
				history.push('/profile')
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