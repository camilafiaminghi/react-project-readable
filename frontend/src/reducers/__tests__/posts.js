import {
	LOAD_POSTS_REQUEST,
	LOAD_POSTS_SUCCESS,
	LOAD_POSTS_FAILURE,
	VOTE_POST_REQUEST,
	VOTE_POST_SUCCESS,
	SAVE_POST_REQUEST,
	SAVE_POST_SUCCESS,
	REMOVE_POST_REQUEST,
	REMOVE_POST_SUCCESS,
	ORDER_POSTS_BY } from './../../actions/posts'
import posts from './../posts'
import data from './../../__helpers__/posts'

const initialState = {
	items: [],
	isFetching: false,
	error: false,
	success: false
}

describe('posts reducer', () => {
	it('should handle initial state', () => {
		expect(posts(initialState, {})).toEqual(initialState)
	})

	it('should handle LOAD_POSTS_REQUEST', () => {
		expect(posts(initialState, {
			type: LOAD_POSTS_REQUEST
		})).toMatchObject({
			...initialState,
			isFetching: true
		})
	})

	it('should handle LOAD_POSTS_SUCCESS', () => {
		expect(posts(initialState, {
			type: LOAD_POSTS_SUCCESS,
			items: data
		})).toMatchObject({
			isFetching: false,
			items: data
		})
	})

	it('should handle LOAD_POSTS_FAILURE', () => {
		expect(posts(initialState, {
			type: LOAD_POSTS_FAILURE
		})).toMatchObject({
			isFetching: false
		})
	})

	/**/
	it('should handle VOTE_POST_REQUEST', () => {
		expect(posts(initialState, {
			type: VOTE_POST_REQUEST
		})).toMatchObject({
			...initialState,
			isFetching: true
		})
	})

	it('should handle VOTE_POST_SUCCESS', () => {
		expect(posts(initialState, {
			type: VOTE_POST_SUCCESS
		})).toMatchObject({
			...initialState
		})
	})

	/**/
	it('should handle SAVE_POST_REQUEST', () => {
		expect(posts(initialState, {
			type: SAVE_POST_REQUEST
		})).toMatchObject({
			...initialState,
			isFetching: true
		})
	})

	it('should handle SAVE_POST_SUCCESS', () => {
		expect(posts({...initialState, success: true, item: data}, {
			type: SAVE_POST_SUCCESS,
			post: data[0]
		})).toMatchObject({
			...initialState,
			items: data,
			success: true
		})
	})

	/**/
	it('should handle REMOVE_POST_REQUEST', () => {
		expect(posts(initialState, {
			type: REMOVE_POST_REQUEST
		})).toMatchObject({
			...initialState,
			isFetching: true
		})
	})

	it('should handle REMOVE_POST_SUCCESS', () => {
		expect(posts(initialState, {
			type: REMOVE_POST_SUCCESS
		})).toMatchObject({
			...initialState,
			success: true
		})
	})

	/**/
	it('should handle ORDER_POSTS_BY', () => {
		expect(posts(initialState, {
			type: ORDER_POSTS_BY
		})).toMatchObject({
			...initialState
		})
	})
})
