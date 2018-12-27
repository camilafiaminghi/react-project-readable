import {
	LOAD_COMMENTS_REQUEST,
	LOAD_COMMENTS_SUCCESS,
	VOTE_COMMENT_REQUEST,
	VOTE_COMMENT_SUCCESS } from '../actions/comments'

export default function comments (state = {
	byId: {},
	isFetching: false,
	success: false
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
			/* POST voteScore UPDATED BY VOTE_POST_REQUEST */
			return {
				...state,
				isFetching: false
			}
		default :
			return state
	}
}

