import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import {
	LOAD_POSTS_REQUEST,
	LOAD_POSTS_SUCCESS,
	LOAD_POSTS_FAILURE } from './../posts'
import {
	LOAD_CATEGORIES_REQUEST,
	LOAD_CATEGORIES_SUCCESS,
	LOAD_CATEGORIES_FAILURE } from './../categories'
import { handleInitialData } from './../shared'
import fetch from './../../__helpers__/fetch'
import posts from './../../__helpers__/posts'
import data from './../../__helpers__/categories'

const configStore = configureMockStore([thunk])
const store = configStore({})

describe('shared action', () => {
	// CLEAR ACTIONS BEFORE RUN STORE AGAIN TEST MODULE INDEPEDENT OF OTHERS MODULES
	afterEach(() => store.clearActions())

	// TEST ASYNC PASS THROUGH THUNK
	it('successful handleInitialData', () => {
		const categories = data.categories
		window.fetch = fetch.successful({categories, posts})

		const expectAction = [
			{ payload: {scope: 'default'}, type: 'loading-bar/SHOW' },
			{ type: LOAD_CATEGORIES_REQUEST },
			{ type: LOAD_POSTS_REQUEST },
			{ type: LOAD_CATEGORIES_SUCCESS, items: categories },
			{ type: LOAD_POSTS_SUCCESS, items: { categories: categories, posts: posts } },
			{ payload: {scope: 'default'}, type: 'loading-bar/HIDE' },
		]

		return store.dispatch(handleInitialData())
			.then(() => expect(store.getActions()).toEqual(expectAction))
	})

	it('failure handleInitialData', () => {
		const categories = data.categories
		window.fetch = fetch.failing(true)

		const expectAction = [
			{ payload: {scope: 'default'}, type: 'loading-bar/SHOW' },
			{ type: LOAD_CATEGORIES_REQUEST },
			{ type: LOAD_POSTS_REQUEST },
			{ type: LOAD_CATEGORIES_FAILURE },
			{ type: LOAD_POSTS_FAILURE },
			{ payload: {scope: 'default'}, type: 'loading-bar/HIDE' }
		]

		return store.dispatch(handleInitialData())
			.then(() => expect(store.getActions()).toEqual(expectAction))
	})
})
