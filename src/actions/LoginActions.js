export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOG_OUT = 'LOG_OUT';
const VALIDATE_LOGIN_URL = 'https://mysterious-reef-29460.herokuapp.com/api/v1/validate';

function handleErrorMessage(message) {
	switch (message) {
		case 'wrong_email_or_password':
			return 'Имя пользователя или пароль введены не верно.';
		default:
			return 'Ошибка при отправке запроса.'

	}
}

export function handleLogin(user, history, errorCallback) {
	return function (dispatch) {
		dispatch({
			type: LOGIN_REQUEST
		});
		const {username, password} = user;

		const data = {
			email: username,
			password: password
		}

		fetch(VALIDATE_LOGIN_URL, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(response => response.json())
			.then(response => {
				if (response.status === 'ok') {
					dispatch({
						type: LOGIN_SUCCESS,
						error: false,
						payload: {
							name: username,
							id: response.data.id
						}
					});
					history.push('/profile')
				} else {
					throw new Error(response.message);
				}
			})
			.catch(error => {
				console.log(error);
				dispatch({
					type: LOGIN_FAIL,
					error: true,
					payload: handleErrorMessage(error.message)
				});
				errorCallback()
			});
	}
}

export function handleLogOut() {
	return function (dispatch) {
		dispatch({
			type: LOG_OUT
		})
	}
}