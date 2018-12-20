import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { REQUEST_POSTS, RECEIVE_POSTS, REQUEST_POST_VOTE, RECEIVE_POST_VOTE } from './posts'
import { receivePosts, requestPosts, handlePosts, receivePostVote, requestPostVote, handleVotePost } from './posts'
import fetch from '../__helpers__/fetch'
import posts from '../__helpers__/posts'

const configStore = configureMockStore([thunk])
const store = configStore({
	items: undefined
})

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

	it('receivePostVote should return an object', () => {
		expect(receivePostVote()).toEqual({
			type: RECEIVE_POST_VOTE,
			post: undefined
		})
	})

	it('requestPostVote should return an object', () => {
		expect(requestPostVote()).toEqual({
			type: REQUEST_POST_VOTE,
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
			{ type: REQUEST_POST_VOTE },
			{ type: RECEIVE_POST_VOTE, post: posts[0] },
		]

		return store.dispatch(handleVotePost())
			.then(() => expect(store.getActions()).toEqual(expectAction))
	})
})
