import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { REQUEST_POSTS, RECEIVE_POSTS,  receivePosts, handlePosts } from './posts'
import fetch from '../__helpers__/fetch'
import { posts } from '../__helpers__/posts'

const configStore = configureMockStore([thunk])
const store = configStore({
	isFetching: false,
	items: undefined
})

describe('posts action creators', () => {
	it('should return an object', () => {
		expect(receivePosts()).toEqual({
			type: RECEIVE_POSTS,
			items: undefined
		})
	})

	// CLEAR ACTIONS BEFORE RUN STORE AGAIN TEST MODULE INDEPEDENT OF OTHERS MODULES
	afterEach(() => store.clearActions())

	// TEST ASYNC PASS THROUGH THUNK
	it('successful handlePosts calls receivePosts', () => {
		window.fetch = fetch.successful(posts)

		const expectAction = [
			{ type: REQUEST_POSTS},
			{ payload: {scope: 'default'}, type: 'loading-bar/SHOW' },
			{ type: RECEIVE_POSTS, items: undefined },
			{ payload: {scope: 'default'}, type: 'loading-bar/HIDE' }
		]

		return store.dispatch(handlePosts())
			.then(() => expect(store.getActions()).toEqual(expectAction))
	})
})
