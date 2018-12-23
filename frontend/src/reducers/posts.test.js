import {
	REQUEST_POSTS,
	RECEIVE_POSTS,
	REQUEST_VOTE_POST,
	RECEIVE_VOTE_POST,
	REQUEST_SAVE_POST,
	RECEIVE_SAVE_POST,
	REQUEST_REMOVE_POST,
	RECEIVE_REMOVE_POST } from '../actions/posts'
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

	/**/
	it('should handle REQUEST_VOTE_POST', () => {
		expect(posts(initialState, {
			type: REQUEST_VOTE_POST,
			isFetching: true,
			id: undefined
		})).toMatchObject({})
	})

	it('should handle RECEIVE_VOTE_POST', () => {
		expect(posts({
			type: RECEIVE_VOTE_POST,
			isFetching: false,
			items: data
		}, {})).toMatchObject({isFetching: false, items: data})
	})

	/**/
	it('should handle REQUEST_SAVE_POST', () => {
		expect(posts(initialState, {
			type: REQUEST_SAVE_POST,
			isFetching: true,
			post: data[0]
		})).toMatchObject({})
	})

	it('should handle RECEIVE_SAVE_POST', () => {
		expect(posts({
			type: RECEIVE_SAVE_POST,
			isFetching: false,
			items: data[0],
			success: true
		}, {})).toMatchObject({isFetching: false, items: data[0], success: true})
	})

	/**/
	it('should handle REQUEST_REMOVE_POST', () => {
		expect(posts(initialState, {
			type: REQUEST_REMOVE_POST,
			isFetching: true,
			post: data[0]
		})).toMatchObject({})
	})

	it('should handle RECEIVE_REMOVE_POST', () => {
		expect(posts({
			type: RECEIVE_REMOVE_POST,
			isFetching: false,
			items: data[0],
			success: true
		}, {})).toMatchObject({isFetching: false, items: data[0], success: true})
	})
})
