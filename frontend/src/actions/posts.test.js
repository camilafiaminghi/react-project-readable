import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { REQUEST_POSTS, RECEIVE_POSTS,  receivePosts, requestPosts, handlePosts } from './posts'
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

	// TEST ASYNC PASS THROUGH THUNK
	it('successful handlePosts calls receivePosts', () => {
		window.fetch = fetch.successful(posts)

		const expectAction = [
			{ type: REQUEST_POSTS },
			{ type: RECEIVE_POSTS, items: posts },
		]

		return store.dispatch(handlePosts())
			.then(() => expect(store.getActions()).toEqual(expectAction))
	})
})
