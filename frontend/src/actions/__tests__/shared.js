import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import {
	LOAD_POSTS_REQUEST,
	LOAD_POSTS_SUCCESS,
	LOAD_POSTS_FAILURE,
	HIDE_POST_FAILURE } from './../posts'
import {
	LOAD_CATEGORIES_REQUEST,
	LOAD_CATEGORIES_SUCCESS,
	LOAD_CATEGORIES_FAILURE } from './../categories'
import {
	SAVE_COMMENT_REQUEST,
	SAVE_COMMENT_SUCCESS,
	REMOVE_COMMENT_REQUEST,
	REMOVE_COMMENT_SUCCESS,
	SHOW_COMMENT_FAILURE,
	HIDE_COMMENT_FAILURE } from './../comments'
import {
	handleInitialData,
	handleUpdatePostComments,
	handleRemovePostComments,
	handleCleanAllFailures } from './../shared'
import fetch from './../../__helpers__/fetch'
import posts from './../../__helpers__/posts'
import data from './../../__helpers__/categories'
import comments from './../../__helpers__/comments'

const configStore = configureMockStore([thunk])
const store = configStore({})

describe('shared action', () => {
	// CLEAR ACTIONS BEFORE RUN STORE AGAIN TEST MODULE INDEPEDENT OF OTHERS MODULES
	afterEach(() => store.clearActions())

	/*
	 * INITIAL DATA
	 */
	it('successful handleInitialData', () => {
		const categories = data.categories
		window.fetch = fetch.successful({categories, posts})

		const expectAction = [
			{ payload: {scope: 'default'}, type: 'loading-bar/SHOW' },
			{ type: LOAD_CATEGORIES_REQUEST },
			// { type: LOAD_POSTS_REQUEST },
			{ type: LOAD_CATEGORIES_SUCCESS, items: categories },
			// { type: LOAD_POSTS_SUCCESS, items: { categories: categories, posts: posts } },
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
			{ type: LOAD_CATEGORIES_FAILURE },
			{ payload: {scope: 'default'}, type: 'loading-bar/HIDE' }
		]

		return store.dispatch(handleInitialData())
			.then(() => expect(store.getActions()).toEqual(expectAction))
	})

	/*
	 * UPDATE POST COMMENTS
	 */
	it('successful handleUpdatePostComments', () => {
		window.fetch = fetch.failing()

		const expectAction = [
			{ payload: {scope: 'default'}, type: 'loading-bar/SHOW' },
			{ type: SAVE_COMMENT_REQUEST },
			{ type: LOAD_POSTS_REQUEST },
			{ type: SHOW_COMMENT_FAILURE, failure: 'save' },
			{ payload: {scope: 'default'}, type: 'loading-bar/HIDE' },
			{ type: LOAD_POSTS_FAILURE }
		]

		return store.dispatch(handleUpdatePostComments(comments[0], posts[0].id))
			.then(() => expect(store.getActions()).toEqual(expectAction))
	})

	/*
	 * UPDATE POST COMMENTS
	 */
	it('successful handleUpdatePostComments', () => {
		window.fetch = fetch.failing()

		const expectAction = [
			{ payload: {scope: 'default'}, type: 'loading-bar/SHOW' },
			{ type: SAVE_COMMENT_REQUEST },
			{ type: LOAD_POSTS_REQUEST },
			{ type: SHOW_COMMENT_FAILURE, failure: 'save' },
			{ payload: {scope: 'default'}, type: 'loading-bar/HIDE' },
			{ type: LOAD_POSTS_FAILURE }
		]

		return store.dispatch(handleUpdatePostComments(comments[0], posts[0].id))
			.then(() => expect(store.getActions()).toEqual(expectAction))
	})

	/*
	 * REMOVE POST COMMENTS
	 */
	it('successful handleRemovePostComments', () => {
		window.fetch = fetch.failing()

		const expectAction = [
			{ payload: {scope: 'default'}, type: 'loading-bar/SHOW' },
			{ type: REMOVE_COMMENT_REQUEST },
			{ type: LOAD_POSTS_REQUEST },
			{ type: SHOW_COMMENT_FAILURE, failure: 'remove' },
			{ type: LOAD_POSTS_FAILURE },
			{ payload: {scope: 'default'}, type: 'loading-bar/HIDE' }
		]

		return store.dispatch(handleRemovePostComments(comments[0].id))
			.then(() => expect(store.getActions()).toEqual(expectAction))
	})

	/*
	 * REMOVE POST COMMENTS
	 */
	it('successful handleCleanAllFailures', () => {
		const expectAction = [
			{ type: HIDE_POST_FAILURE },
			{ type: HIDE_COMMENT_FAILURE }
		]

		return store.dispatch(handleCleanAllFailures())
			.then(() => expect(store.getActions()).toEqual(expectAction))
	})
})
