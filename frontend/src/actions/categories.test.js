import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { REQUEST_CATEGORIES, RECEIVE_CATEGORIES, receiveCategories, requestCategories, handleCategories } from './categories'
import fetch from '../__helpers__/fetch'
import data from '../__helpers__/categories'

const configStore = configureMockStore([thunk])
const store = configStore({
	items: undefined
})

describe('categories action creators', () => {
	// CLEAR ACTIONS BEFORE RUN STORE AGAIN TEST MODULE INDEPEDENT OF OTHERS MODULES
	afterEach(() => store.clearActions())

	it('requestCategories should return an object', () => {
		expect(requestCategories()).toEqual({
			type: REQUEST_CATEGORIES,
			items: undefined
		})
	})

	it('receiveCategories should return an object', () => {
		expect(receiveCategories()).toEqual({
			type: RECEIVE_CATEGORIES,
			items: undefined
		})
	})

	// TEST ASYNC PASS THROUGH THUNK
	it('successful handleCategories calls receiveCategories', () => {
		window.fetch = fetch.successful(data)

		const expectAction = [
			{ type: REQUEST_CATEGORIES },
			{ type: RECEIVE_CATEGORIES, items: data.categories }
		]

		return store.dispatch(handleCategories())
			.then(() => expect(store.getActions()).toEqual(expectAction))
	})
})
