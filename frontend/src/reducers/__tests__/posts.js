import {
	LOAD_POSTS_REQUEST,
	LOAD_POSTS_SUCCESS,
	LOAD_POSTS_FAILURE,
	VOTE_POST_REQUEST,
	VOTE_POST_SUCCESS,
	VOTE_POSTS_FAILURE,
	SAVE_POST_REQUEST,
	SAVE_POST_SUCCESS,
	REMOVE_POST_REQUEST,
	REMOVE_POST_SUCCESS,
	UPDATE_POST_REQUEST,
	UPDATE_POST_SUCCESS,
	ORDER_POSTS_BY,
	SHOW_POSTS_FAILURE,
	HIDE_POSTS_FAILURE } from './../../actions/posts'
import posts from './../posts'
import data from './../../__helpers__/posts'

let byId = {};
data.map((item) => (byId[item.id] = item))
const initialState = {
	byId,
	items: data,
	isFetching: false,
	success: false
}

describe('posts reducer', () => {
	it('should handle initial state', () => {
		expect(posts(initialState, {})).toEqual(initialState)
	})
	/*
	 * LOAD
	 */
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
		expect(posts({...initialState, byId: {}} , {
			type: LOAD_POSTS_FAILURE,
			failure: 'load'
		})).toMatchObject({
			isFetching: false,
			failure: 'load'
		})
	})
	/*
	 * VOTE
	 */
	it('should handle VOTE_POST_REQUEST', () => {
		expect(posts({
			...initialState,
			byId: {
					...initialState.byId,
					[data[0].id]: {
						...initialState.byId[data[0].id],
						voteScore: initialState.byId[data[0].id].voteScore-1
					}
				}
		}, {
			type: VOTE_POST_REQUEST,
			id: data[0].id,
			option: 'upVote'
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

	it('should handle VOTE_POSTS_FAILURE', () => {
		expect(posts({
			...initialState,
			byId: {
					...initialState.byId,
					[data[0].id]: {
						...initialState.byId[data[0].id],
						voteScore: initialState.byId[data[0].id].voteScore+1
					}
				}
		}, {
			type: VOTE_POSTS_FAILURE,
			id: data[0].id,
			option: 'upVote'
		})).toMatchObject({
			...initialState
		})
	})
	/*
	 * SAVE
	 */
	it('should handle SAVE_POST_REQUEST', () => {
		expect(posts(initialState, {
			type: SAVE_POST_REQUEST
		})).toMatchObject({
			...initialState,
			isFetching: true
		})
	})

	it('should handle SAVE_POST_SUCCESS', () => {
		expect(posts(initialState, {
			type: SAVE_POST_SUCCESS,
			post: data[0]
		})).toMatchObject({
			...initialState
		})
	})
	/*
	 * REMOVE
	 */
	it('should handle REMOVE_POST_REQUEST', () => {
		expect(posts(initialState, {
			type: REMOVE_POST_REQUEST
		})).toMatchObject({
			...initialState,
			isFetching: true
		})
	})

	it('should handle REMOVE_POST_SUCCESS', () => {
		expect(posts({...initialState, isFetching: false}, {
			type: REMOVE_POST_SUCCESS,
			post: data[0]
		})).toMatchObject({
			...initialState,
			byId: {},
			isFetching: false
		})
	})
	/*
	 * UPDATE
	 */
	it('should handle UPDATE_POST_REQUEST', () => {
		expect(posts(initialState, {
			type: UPDATE_POST_REQUEST
		})).toMatchObject({
			...initialState,
			isFetching: true
		})
	})

	it('should handle UPDATE_POST_SUCCESS,', () => {
		expect(posts(initialState, {
			type: UPDATE_POST_SUCCESS,
			post: data[0]
		})).toMatchObject({
			...initialState
		})
	})
	/*
	 * ORDER
	 */
	it('should handle ORDER_POSTS_BY', () => {
		expect(posts({...initialState, items: data}, {
			type: ORDER_POSTS_BY
		})).toMatchObject({
			...initialState,
			items: data
		})
	})
	/*
	 * FAILURE
	 */
})
