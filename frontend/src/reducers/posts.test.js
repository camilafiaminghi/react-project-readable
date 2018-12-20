import { REQUEST_POSTS, RECEIVE_POSTS } from '../actions/posts'
import posts from './posts'
import data from '../__helpers__/posts'

const initialState = {
	isFetching: false,
	items: []
}

describe('posts reducer', () => {
	it('should handle initial state', () => {
		expect(posts(initialState, {})).toEqual(initialState)
	})

	it('should handle REQUEST_POSTS', () => {
		expect(posts(initialState, {
			type: REQUEST_POSTS,
			isFetching: true
		})).toMatchObject({})
	})

	it('should handle RECEIVE_POSTS', () => {
		expect(posts(initialState, {
			type: RECEIVE_POSTS,
			isFetching: false,
			items: data
		})).toMatchObject({isFetching: false, items: data})
	})
})
