import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { REQUEST_POSTS, RECEIVE_POSTS, REQUEST_POST_VOTE, RECEIVE_POST_VOTE, REQUEST_POST_SAVE, RECEIVE_POST_SAVE } from './posts'
import { receivePosts, requestPosts, handlePosts} from './posts'
import { receiveVotePost, requestVotePost, handleVotePost } from './posts'
import { receiveSavePost, requestSavePost, handleSavePost } from './posts'
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
			type: RECEIVE_POST_VOTE,
			post: undefined
		})
	})

	it('requestVotePost should return an object', () => {
		expect(requestVotePost()).toEqual({
			type: REQUEST_POST_VOTE
		})
	})

	it('receiveSavePost should return an object', () => {
		expect(receiveSavePost()).toEqual({
			type: RECEIVE_POST_SAVE
		})
	})

	it('requestSavePost should return an object', () => {
		expect(requestSavePost()).toEqual({
			type: REQUEST_POST_SAVE,
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

	it('successful handleSavePost calls actions', () => {
		window.fetch = fetch.successful(posts[0])

		const expectAction = [
			{ payload: {scope: 'default'}, type: 'loading-bar/SHOW'},
			{ type: REQUEST_POST_SAVE },
			{ type: RECEIVE_POST_SAVE, post: posts[0] },
			{ payload: {scope: 'default'}, type: 'loading-bar/HIDE'}
		]

		return store.dispatch(handleSavePost())
			.then(() => expect(store.getActions()).toEqual(expectAction))
	})
})
