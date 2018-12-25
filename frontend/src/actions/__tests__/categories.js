import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import {
		LOAD_CATEGORIES_REQUEST,
		LOAD_CATEGORIES_SUCCESS,
		LOAD_CATEGORIES_FAILURE,
		loadCategoriesRequest,
		loadCategoriesSuccess,
		loadCategoriesFailure,
		handleCategories } from './../categories'
import fetch from './../../__helpers__/fetch'
import data from './../../__helpers__/categories'

const configStore = configureMockStore([thunk])
const store = configStore({})

describe('categories action', () => {
	// CLEAR ACTIONS BEFORE RUN STORE AGAIN TEST MODULE INDEPEDENT OF OTHERS MODULES
	afterEach(() => store.clearActions())

	it('loadCategoriesRequest should return an object', () => {
		expect(loadCategoriesRequest()).toEqual({
			type: LOAD_CATEGORIES_REQUEST
		})
	})

	it('loadCategoriesSuccess should return an object', () => {
		expect(loadCategoriesSuccess()).toEqual({
			type: LOAD_CATEGORIES_SUCCESS,
			items: undefined
		})
	})

	it('loadCategoriesFailure should return an object', () => {
		expect(loadCategoriesFailure()).toEqual({
			type: LOAD_CATEGORIES_FAILURE
		})
	})

	// TEST ASYNC PASS THROUGH THUNK
	it('successful handleCategories calls receiveCategories', () => {
		window.fetch = fetch.successful(data)

		const expectAction = [
			{ type: LOAD_CATEGORIES_REQUEST },
			{ type: LOAD_CATEGORIES_SUCCESS, items: data.categories }
		]

		return store.dispatch(handleCategories())
			.then(() => expect(store.getActions()).toEqual(expectAction))
	})
})
