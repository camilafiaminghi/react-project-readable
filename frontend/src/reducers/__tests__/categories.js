import {
	LOAD_CATEGORIES_REQUEST,
	LOAD_CATEGORIES_SUCCESS,
	LOAD_CATEGORIES_FAILURE } from './../../actions/categories'
import categories from './../categories'
import data from './../../__helpers__/categories'

const initialState = {
	items: [],
	isFetching: false,
	success: false,
	error: false
}

describe('categories reducer', () => {
	it('should handle initial state', () => {
		expect(categories(initialState, {})).toEqual(initialState)
	})

	it('should handle LOAD_CATEGORIES_REQUEST', () => {
		expect(categories(initialState, {
			type: LOAD_CATEGORIES_REQUEST
		})).toMatchObject({...initialState, isFetching: true})
	})

	it('should handle LOAD_CATEGORIES_SUCCESS', () => {
		expect(categories(initialState, {
			type: LOAD_CATEGORIES_SUCCESS,
			items: data.categories
		})).toMatchObject({
			items: data.categories,
			isFetching: false,
			success: true,
			error: false
		})
	})

	it('should handle LOAD_CATEGORIES_FAILURE', () => {
		expect(categories(initialState, {
			type: LOAD_CATEGORIES_FAILURE
		})).toMatchObject({...initialState, error: true})
	})
})
