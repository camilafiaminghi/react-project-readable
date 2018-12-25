import { REQUEST_COMMENTS, RECEIVE_COMMENTS } from './../../actions/comments'
import comments from './../comments'
import data from './../../__helpers__/comments'

const initialState = {
	isFetching: false,
	items: []
}

describe('comments reducer', () => {
	it('should handle initial state', () => {
		expect(comments(initialState, {})).toEqual(initialState)
	})

	it('should handle REQUEST_COMMENTS', () => {
		expect(comments(initialState, {
			type: REQUEST_COMMENTS,
			isFetching: true
		})).toMatchObject({})
	})

	it('should handle RECEIVE_COMMENTS', () => {
		expect(comments(initialState, {
			type: RECEIVE_COMMENTS,
			isFetching: false,
			items: data
		})).toMatchObject({})
	})
})
