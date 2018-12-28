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
	HIDE_COMMENT_FAILURE } from '../actions/comments'

export default function comments (state = {
	byId: {},
	isFetching: false,
	success: false,
	failure: ''
}, action) {
	switch(action.type) {
		/*
		 * LOAD
		 */
		case LOAD_COMMENTS_REQUEST :
			return {
				...state,
				isFetching: true
			}
		case LOAD_COMMENTS_SUCCESS :
			const byId = {};
			action.items.sort((a, b) => (b.voteScore - a.voteScore))
			action.items.map((item) => (byId[item.id] = item))

			return {
				...state,
				isFetching: false,
				byId,
				success: true
			}
		/*
		 * VOTE
		 */
		case VOTE_COMMENT_REQUEST :
			return {
				...state,
				isFetching: true,
				byId: {
					...state.byId,
					[action.id]: {
						...state.byId[action.id],
						voteScore: (action.option === 'upVote') ? state.byId[action.id].voteScore+1 : state.byId[action.id].voteScore-1
					}
				}
			}
		case VOTE_COMMENT_SUCCESS :
			/* COMMENT voteScore UPDATED BY VOTE_COMMENT_REQUEST */
			return {
				...state,
				isFetching: false
			}
		case VOTE_COMMENT_FAILURE :
			return {
				...state,
				isFetching: false,
				failure: action.failure,
				byId: {
					...state.byId,
					[action.id]: {
						...state.byId[action.id],
						voteScore: (action.option === 'upVote') ? state.byId[action.id].voteScore-1 : state.byId[action.id].voteScore+1
					}
				}
			}
		/*
		 * SAVE
		 */
		case SAVE_COMMENT_REQUEST :
			return {
				...state,
				isFetching: true
			}
		case SAVE_COMMENT_SUCCESS :
			return {
				...state,
				byId: {...state.byId, [action.comment.id]: action.comment}
			}
		/*
		 * REMOVE
		 */
		case REMOVE_COMMENT_REQUEST :
			return {
				...state,
				isFetching: true
			}
		case REMOVE_COMMENT_SUCCESS :
			const commentsById = Object.keys(state.byId).reduce((object, key) => {
				if (key !== action.id) {
			  	object[key] = state.byId[key]
				}
				return object
			}, {})

			return {
				...state,
				byId: commentsById,
				isFetching: false
			}
		/*
		 * UPDATE
		 */
		case UPDATE_COMMENT_REQUEST :
			return {
				...state,
				isFetching: true
			}
		case UPDATE_COMMENT_SUCCESS :
			return {
				...state,
				byId: {...state.byId, [action.comment.id]: action.comment}
			}
		/*
		 * FAILURE
		 */
		case SHOW_COMMENT_FAILURE :
			return {
				...state,
				failure: action.failure
			}
		case HIDE_COMMENT_FAILURE :
			return {
				...state,
				failure: ''
			}
		default :
			return state
	}
}

