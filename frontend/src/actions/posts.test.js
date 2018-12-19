import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { REQUEST_POSTS, RECEIVE_POSTS,  receivePosts, handlePosts } from './posts'
import fetch from '../__helpers__/fetch'
import { posts } from '../__helpers__/posts'

const configStore = configureMockStore([thunk])
const store = configStore({
	isFetching: false,
	items: []
})

describe('posts action creators', () => {
	it('should return an object', () => {
		expect(receivePosts()).toEqual({
			type: RECEIVE_POSTS,
			posts: undefined
		})
	})

	// CLEAR ACTIONS BEFORE RUN STORE AGAIN TEST MODULE INDEPEDENT OF OTHERS MODULES
	afterEach(() => store.clearActions())

	// TEST ASYNC PASS THROUGH THUNK
	it('successful handlePosts calls receivePosts', () => {
		window.fetch = fetch.successful({ data:{posts} })

		const expectAction = [
			{ type: REQUEST_POSTS},
			{ type: RECEIVE_POSTS, items: undefined }
		]

		return store.dispatch(handlePosts())
			.then(() => expect(store.getActions()).toEqual(expectAction))
	})
})
