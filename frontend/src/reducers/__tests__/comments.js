import {
	LOAD_COMMENTS_REQUEST,
	LOAD_COMMENTS_SUCCESS,
	VOTE_COMMENT_REQUEST,
	VOTE_COMMENT_SUCCESS,
	SAVE_COMMENT_REQUEST,
	SAVE_COMMENT_SUCCESS } from './../../actions/comments'
import comments from './../comments'
import data from './../../__helpers__/comments'

const dataComments = {}
data.map((item) => (dataComments[item.id] = item))
const initialState = {
	byId: {},
	isFetching: false,
	success: false
}

describe('comments reducer', () => {
	it('should handle initial state', () => {
		expect(comments(initialState, {})).toEqual(initialState)
	})
	/*
	 * LOAD
	 */
	it('should handle LOAD_COMMENTS_REQUEST', () => {
		expect(comments(initialState, {
			type: LOAD_COMMENTS_REQUEST
		})).toMatchObject({
			...initialState,
			isFetching: true
		})
	})

	it('should handle LOAD_COMMENTS_SUCCESS', () => {
		expect(comments({...initialState, byId: dataComments, success: true}, {
			type: LOAD_COMMENTS_SUCCESS,
			items: data
		})).toMatchObject({
			isFetching: false,
			byId: dataComments,
			success: true
		})
	})
	/*
	 * VOTE
	 */
	it('should handle VOTE_COMMENT_REQUEST', () => {
		expect(comments({...initialState, byId: dataComments}, {
			type: VOTE_COMMENT_REQUEST,
			id: data[0].id,
			option: 'upVote'
		})).toMatchObject({
			...initialState,
			isFetching: true
		})
	})

	it('should handle VOTE_COMMENT_SUCCESS', () => {
		expect(comments(initialState, {
			type: VOTE_COMMENT_SUCCESS
		})).toMatchObject({
			...initialState
		})
	})
	/*
	 * SAVE
	 */
	it('should handle SAVE_COMMENT_REQUEST', () => {
		expect(comments(initialState, {
			type: SAVE_COMMENT_REQUEST
		})).toMatchObject({
			...initialState,
			isFetching: true
		})
	})

	it('should handle SAVE_COMMENT_SUCCESS', () => {
		expect(comments({...initialState, success: true, isFetching: false}, {
			type: SAVE_COMMENT_SUCCESS,
			comment: data[0]
		})).toMatchObject({
			...initialState,
			byId: {[data[0].id]: dataComments[data[0].id]},
			isFetching: false,
			success: true
		})
	})
})
