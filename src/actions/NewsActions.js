import fetch from 'cross-fetch'
import {GET_NEWS_ERROR, GET_NEWS_REQUEST, GET_NEWS_SUCCESS, SERVER_URI} from "../utils/CommonConstants";

const GET_NEWS_URL = SERVER_URI + 'news';


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
				} else throw Error('Ошибка при получении новостей')
			})
			.catch((error) => {
				dispatch({
					type: GET_NEWS_ERROR,
					payload: 'Ошибка при получении новостей',
					error: true
				})
			})

	}
}
