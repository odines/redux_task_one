import {LOG_OUT, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, RESET_FORM, SERVER_URI} from "../utils/CommonConstants";

const VALIDATE_LOGIN_URL = SERVER_URI + 'validate';

function handleErrorMessage(message) {
	switch (message) {
		case 'wrong_email_or_password':
			return 'Имя пользователя или пароль введены не верно.';
		default:
			return 'Ошибка при отправке запроса.'

	}
}


export function handleGoogleLogin(googleAuth) {
	return function (dispatch) {
		if (googleAuth) {
			dispatch({
				type: LOGIN_REQUEST
			});

			googleAuth.signIn()
				.then(googleUser => {
					const profile = googleUser.getBasicProfile();
					debugger
					console.log('google login success', profile);
					dispatch({
						type: LOGIN_SUCCESS,
						error: false,
						payload: {
							name: profile.getName(),
							id: profile.getId()
						}
					})
				})
				.catch(error => {
					dispatch({
						type: LOGIN_FAIL,
						error: true,
						payload: handleErrorMessage(error.message)
					});
				})
		} else {
			dispatch({
				type: LOGIN_FAIL,
				error: true,
				payload: 'Google auth is not initialized'
			})
		}
	}
}

export function handleGoogleLogOut(googleAuth) {
	return function (dispatch) {
		googleAuth.signOut()
			.then(() => {
				dispatch({
					type: LOG_OUT
				})
			})
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
		};

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
				dispatch({
					type: LOGIN_FAIL,
					error: true,
					payload: handleErrorMessage(error.message)
				});
				errorCallback()
			});
	}
}

export function resetForm() {

	return function (dispatch) {

		dispatch({
			type: RESET_FORM
		})
	}


}

export function handleLogOut() {
	return function (dispatch) {
		dispatch({
			type: LOG_OUT
		})
	}

}