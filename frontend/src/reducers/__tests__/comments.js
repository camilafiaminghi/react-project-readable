import {
	LOAD_COMMENTS_REQUEST,
	LOAD_COMMENTS_SUCCESS,
	VOTE_COMMENT_REQUEST,
	VOTE_COMMENT_SUCCESS,
	VOTE_COMMENT_FAILURE,
	SAVE_COMMENT_REQUEST,
	SAVE_COMMENT_SUCCESS,
	REMOVE_COMMENT_REQUEST,
	REMOVE_COMMENT_SUCCESS,
	UPDATE_COMMENT_REQUEST,
	UPDATE_COMMENT_SUCCESS,
	SHOW_COMMENT_FAILURE,
	HIDE_COMMENT_FAILURE } from './../../actions/comments'
import comments from './../comments'
import data from './../../__helpers__/comments'

const commentsById = {}
data.map((item) => (commentsById[item.id] = item))
const initialState = {
	byId: commentsById,
	isFetching: false,
	success: false,
	failure: ''
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
		expect(comments({...initialState, byId: commentsById, success: true}, {
			type: LOAD_COMMENTS_SUCCESS,
			items: data
		})).toMatchObject({
			isFetching: false,
			byId: commentsById,
			success: true
		})
	})
	/*
	 * VOTE
	 */
	it('should handle VOTE_COMMENT_REQUEST', () => {
		expect(comments({
			...initialState,
			isFetching: true,
			byId: {
					...initialState.byId,
					[data[0].id]: {
						...initialState.byId[data[0].id],
						voteScore: initialState.byId[data[0].id].voteScore-1
					}
				}
		}, {
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

	it('should handle VOTE_COMMENT_FAILURE', () => {
		expect(comments({
			...initialState,
			byId: {
					...initialState.byId,
					[data[0].id]: {
						...initialState.byId[data[0].id],
						voteScore: initialState.byId[data[0].id].voteScore+1
					}
				}
		}, {
			type: VOTE_COMMENT_FAILURE,
			id: data[0].id,
			option: 'upVote',
			failure: 'vote'
		})).toMatchObject({
			...initialState,
			failure: 'vote'
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
			byId: {[data[0].id]: commentsById[data[0].id]},
			isFetching: false,
			success: true
		})
	})
	/*
	 * REMOVE
	 */
	it('should handle REMOVE_COMMENT_REQUEST', () => {
		expect(comments(initialState, {
			type: REMOVE_COMMENT_REQUEST
		})).toMatchObject({
			...initialState,
			isFetching: true
		})
	})

	it('should handle REMOVE_COMMENT_SUCCESS', () => {
		expect(comments(initialState, {
			type: REMOVE_COMMENT_SUCCESS
		})).toMatchObject({
			...initialState,
			isFetching: false
		})
	})
	/*
	 * UPDATE
	 */
	it('should handle UPDATE_COMMENT_REQUEST', () => {
		expect(comments(initialState, {
			type: UPDATE_COMMENT_REQUEST
		})).toMatchObject({
			...initialState,
			isFetching: true
		})
	})

	it('should handle UPDATE_COMMENT_SUCCESS', () => {
		expect(comments(initialState, {
			type: UPDATE_COMMENT_SUCCESS,
			comment: data[0]
		})).toMatchObject({
			...initialState,
			isFetching: false
		})
	})
	/*
	 * FAILURE
	 */
	it('should handle SHOW_COMMENT_FAILURE', () => {
		expect(comments(initialState, {
			type: SHOW_COMMENT_FAILURE,
			failure: 'save'
		})).toMatchObject({
			...initialState,
			failure: 'save'
		})
	})
	it('should handle HIDE_COMMENT_FAILURE', () => {
		expect(comments(initialState, {
			type: HIDE_COMMENT_FAILURE
		})).toMatchObject({
			...initialState
		})
	})
})
