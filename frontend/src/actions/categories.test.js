import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { REQUEST_CATEGORIES, RECEIVE_CATEGORIES,  receiveCategories, handleCategories } from './categories'
import fetch from '../__helpers__/fetch'
import { categories } from '../__helpers__/categories'

const configStore = configureMockStore([thunk])
const store = configStore({
	isFetching: false,
	items: []
})

describe('categories action creators', () => {
	it('should return an object', () => {
		expect(receiveCategories()).toEqual({
			type: RECEIVE_CATEGORIES,
			categories: undefined
		})
	})

	// CLEAR ACTIONS BEFORE RUN STORE AGAIN TEST MODULE INDEPEDENT OF OTHERS MODULES
	afterEach(() => store.clearActions())

	// TEST ASYNC PASS THROUGH THUNK
	it('successful handleCategories calls receiveCategories', () => {
		window.fetch = fetch.successful({ data:{categories} })

		const expectAction = [
			{ type: REQUEST_CATEGORIES},
			{ type: RECEIVE_CATEGORIES, items: undefined }
		]

		return store.dispatch(handleCategories())
			.then(() => expect(store.getActions()).toEqual(expectAction))
	})
})
