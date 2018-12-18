import { REQUEST_CATEGORIES, RECEIVE_CATEGORIES } from '../actions/categories'
import categories from './categories'
import data from '../__helpers__/categories'

const initialState = {
	isFetching: false,
	items: []
}

describe('categories reducer', () => {
	it('should handle initial state', () => {
		expect(categories(initialState, {})).toEqual(initialState)
	})

	it('should handle REQUEST_TWEETS', () => {
		expect(categories(initialState, {
			type: REQUEST_CATEGORIES,
			isFetching: true
		})).toMatchObject({})
	})

	it('should handle RECEIVE_CATEGORIES', () => {
		expect(categories(initialState, {
			type: RECEIVE_CATEGORIES,
			isFetching: false,
			items: data.categories
		})).toMatchObject({})
	})
})
