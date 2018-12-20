import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { REQUEST_POSTS, RECEIVE_POSTS } from './posts'
import { REQUEST_CATEGORIES, RECEIVE_CATEGORIES } from './categories'
import { handleInitialData } from './shared'
import fetch from '../__helpers__/fetch'
import posts from '../__helpers__/posts'
import data from '../__helpers__/categories'

const configStore = configureMockStore([thunk])
const store = configStore({})

describe('posts action creators', () => {
	// CLEAR ACTIONS BEFORE RUN STORE AGAIN TEST MODULE INDEPEDENT OF OTHERS MODULES
	afterEach(() => store.clearActions())

	// TEST ASYNC PASS THROUGH THUNK
	it('successful handlePosts calls receivePosts', () => {
		const categories = data.categories
		window.fetch = fetch.successful({categories, posts})

		const expectAction = [
			{ payload: {scope: 'default'}, type: 'loading-bar/SHOW' },
			{ type: REQUEST_CATEGORIES },
			{ type: REQUEST_POSTS },
			{ type: RECEIVE_CATEGORIES, items: categories },
			{ type: RECEIVE_POSTS, items: { categories: categories, posts: posts } },
			{ payload: {scope: 'default'}, type: 'loading-bar/HIDE' },
		]

		return store.dispatch(handleInitialData())
			.then(() => expect(store.getActions()).toEqual(expectAction))
	})
})
