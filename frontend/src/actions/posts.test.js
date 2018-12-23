import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import {
	REQUEST_POSTS, RECEIVE_POSTS,
	REQUEST_VOTE_POST, RECEIVE_VOTE_POST,
	REQUEST_SAVE_POST, RECEIVE_SAVE_POST,
	REQUEST_REMOVE_POST, RECEIVE_REMOVE_POST, } from './posts'
import {
	receivePosts, requestPosts, handlePosts,
	receiveVotePost, requestVotePost, handleVotePost,
	receiveSavePost, requestSavePost, handleSavePost,
	receiveRemovePost, requestRemovePost, handleRemovePost } from './posts'
import fetch from '../__helpers__/fetch'
import posts from '../__helpers__/posts'

const configStore = configureMockStore([thunk])
const store = configStore({})

describe('posts action creators', () => {
	// CLEAR ACTIONS BEFORE RUN STORE AGAIN TEST MODULE INDEPEDENT OF OTHERS MODULES
	afterEach(() => store.clearActions())

	it('receivePosts should return an object', () => {
		expect(receivePosts()).toEqual({
			type: RECEIVE_POSTS,
			items: undefined
		})
	})

	it('requestPosts should return an object', () => {
		expect(requestPosts()).toEqual({
			type: REQUEST_POSTS,
			items: undefined
		})
	})

	it('receiveVotePost should return an object', () => {
		expect(receiveVotePost()).toEqual({
			type: RECEIVE_VOTE_POST,
			post: undefined
		})
	})

	it('requestVotePost should return an object', () => {
		expect(requestVotePost()).toEqual({
			type: REQUEST_VOTE_POST
		})
	})

	it('receiveSavePost should return an object', () => {
		expect(receiveSavePost()).toEqual({
			type: RECEIVE_SAVE_POST
		})
	})

	it('requestSavePost should return an object', () => {
		expect(requestSavePost()).toEqual({
			type: REQUEST_SAVE_POST,
			post: undefined
		})
	})

	it('receiveRemovePost should return an object', () => {
		expect(receiveRemovePost()).toEqual({
			type: RECEIVE_REMOVE_POST,
			id: undefined
		})
	})

	it('requestRemovePost should return an object', () => {
		expect(requestRemovePost()).toEqual({
			type: REQUEST_REMOVE_POST,
			post: undefined
		})
	})

	// TESTS ASYNC PASS THROUGH THUNK
	it('successful handlePosts calls actions', () => {
		window.fetch = fetch.successful(posts)

		const expectAction = [
			{ type: REQUEST_POSTS },
			{ type: RECEIVE_POSTS, items: posts },
		]

		return store.dispatch(handlePosts())
			.then(() => expect(store.getActions()).toEqual(expectAction))
	})

	it('successful handleVotePost calls actions', () => {
		window.fetch = fetch.successful(posts[0])

		const expectAction = [
			{ type: REQUEST_VOTE_POST },
			{ type: RECEIVE_VOTE_POST, post: posts[0] },
		]

		return store.dispatch(handleVotePost())
			.then(() => expect(store.getActions()).toEqual(expectAction))
	})

	it('successful handleSavePost calls actions', () => {
		window.fetch = fetch.successful(posts[0])

		const expectAction = [
			{ type: REQUEST_REMOVE_POST, id: undefined },
			{ type: RECEIVE_REMOVE_POST, post: posts[0] }
		]

		return store.dispatch(handleRemovePost())
			.then(() => expect(store.getActions()).toEqual(expectAction))
	})
})
