import fetch from 'cross-fetch'

export const GET_NEWS_REQUEST = 'GET_NEWS_REQUEST';

export const GET_NEWS_SUCCESS = 'GET_NEWS_SUCCESS';

export const GET_NEWS_ERROR = 'GET_NEWS_ERROR'

const GET_NEWS_URL = 'https://mysterious-reef-29460.herokuapp.com/api/v1/news'


export function fetchNews() {
	return function (dispatch) {
		dispatch({
			type: GET_NEWS_REQUEST
		});
		fetch(GET_NEWS_URL)
			.then(response => response.json())
			.then(response => {
				if (response.status === 'ok') {
					dispatch({
						type: GET_NEWS_SUCCESS,
						payload: response.data
					})
				}
			})
			.catch((error) => {
				console.log(error);
				dispatch({
					type: GET_NEWS_ERROR,
					payload: 'Ошибка при получении новостей',
					error: true
				})
			})

	}
}
