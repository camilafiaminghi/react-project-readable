import {
	LOAD_COMMENTS_REQUEST,
	LOAD_COMMENTS_SUCCESS,
	VOTE_COMMENT_REQUEST,
	VOTE_COMMENT_SUCCESS,
	SAVE_COMMENT_REQUEST,
	SAVE_COMMENT_SUCCESS,
	REMOVE_COMMENT_REQUEST,
	REMOVE_COMMENT_SUCCESS,
	UPDATE_COMMENT_REQUEST,
	UPDATE_COMMENT_SUCCESS } from '../actions/comments'

export default function comments (state = {
	byId: {},
	isFetching: false,
	success: false,
	saved: false,
	removed: false,
	updated: false
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
			const { id, option } = action
			const voteScore = (option === 'upVote') ? state.byId[id].voteScore+1 : state.byId[id].voteScore-1

			return {
				...state,
				isFetching: true,
				byId: {
					...state.byId,
					[id]: {
						...state.byId[id],
						voteScore
					}
				}
			}
		case VOTE_COMMENT_SUCCESS :
			/* COMMENT voteScore UPDATED BY VOTE_COMMENT_REQUEST */
			return {
				...state,
				isFetching: false
			}
		/*
		 * SAVE
		 */
		case SAVE_COMMENT_REQUEST :
			return {
				...state,
				isFetching: true,
				saved: false
			}
		case SAVE_COMMENT_SUCCESS :
			return {
				...state,
				byId: {...state.byId, [action.comment.id]: action.comment},
				saved: true
			}
		/*
		 * REMOVE
		 */
		case REMOVE_COMMENT_REQUEST :
			const commentsById = Object.keys(state.byId).reduce((object, key) => {
				if (key !== action.id) {
			  	object[key] = state.byId[key]
				}
				return object
			}, {})

			return {
				...state,
				byId: commentsById,
				isFetching: true,
				removed: false
			}
		case REMOVE_COMMENT_SUCCESS :
			return {
				...state,
				removed: true
			}
		/*
		 * UPDATE
		 */
		case UPDATE_COMMENT_REQUEST :
			return {
				...state,
				isFetching: true,
				updated: false
			}
		case UPDATE_COMMENT_SUCCESS :
			return {
				...state,
				byId: {...state.byId, [action.comment.id]: action.comment},
				updated: true
			}
		default :
			return state
	}
}

