import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import {
	LOAD_POSTS_REQUEST,
	LOAD_POSTS_SUCCESS,
	LOAD_POSTS_FAILURE, } from './../posts'
import { loadPostsRequest, loadPostsSuccess, loadPostsFailure, handlePosts } from './../posts'
import fetch from './../../__helpers__/fetch'
import posts from './../../__helpers__/posts'

const configStore = configureMockStore([thunk])
const store = configStore({})

describe('posts action', () => {
	// CLEAR ACTIONS BEFORE RUN STORE AGAIN TEST MODULE INDEPEDENT OF OTHERS MODULES
	afterEach(() => store.clearActions())

	it('loadPostsRequest should return an object', () => {
		expect(loadPostsRequest()).toEqual({
			type: LOAD_POSTS_REQUEST
		})
	})

	it('loadPostsSuccess should return an object', () => {
		expect(loadPostsSuccess()).toEqual({
			type: LOAD_POSTS_SUCCESS,
			items: undefined
		})
	})

	it('loadPostsFailure should return an object', () => {
		expect(loadPostsFailure()).toEqual({
			type: LOAD_POSTS_FAILURE,
			items: undefined
		})
	})

	// TESTS ASYNC PASS THROUGH THUNK
	it('successful handlePosts', () => {
		window.fetch = fetch.successful(posts)

		const expectAction = [
			{ type: LOAD_POSTS_REQUEST },
			{ type: LOAD_POSTS_SUCCESS, items: posts },
		]

		return store.dispatch(handlePosts())
			.then(() => expect(store.getActions()).toEqual(expectAction))
	})
})
