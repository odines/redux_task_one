import {GET_NEWS_SUCCESS, GET_NEWS_ERROR, GET_NEWS_REQUEST} from "../actions/NewsActions";
import {newsReducer} from "./newsReducer";

import {initialState} from './newsReducer'


describe('news reducer', () => {

	it('GET_NEWS_REQUEST', () => {


		const action = {
			type: GET_NEWS_REQUEST
		}

		expect(newsReducer(initialState, action)).toEqual({
			...initialState, isFetching: true
		})
	})

	it('GET_NEWS_SUCCESS', () => {

		const stateBefore = {
			newsData: [],
			isFetching: true,
			error: ''
		}

		const expectedAction = {
			type: GET_NEWS_SUCCESS,
			payload: [1, 2, 3],
			error: ''
		};

		expect(newsReducer(stateBefore, expectedAction)).toEqual({
			...initialState, isFetching: false, newsData: expectedAction.payload, error: ''
		})

	})


	it('GET_NEWS_ERROR', () => {

		const stateBefore = {
			newsData: [],
			isFetching: true,
			error: ''
		}

		const expectedAction = {
			type: GET_NEWS_ERROR,
			payload: 'Error message'
		};

		expect(newsReducer(stateBefore, expectedAction)).toEqual({
			...initialState, isFetching: false, error: expectedAction.payload
		})

	})


});

