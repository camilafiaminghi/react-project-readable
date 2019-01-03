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
	HIDE_POSTS_FAILURE } from '../actions/posts'

export default function posts (state = {
	items: [],
	byId: {},
	isFetching: false,
	success: false,
	failure: ''
}, action) {
	switch(action.type) {
		/*
		 * LOAD
		 */
		case LOAD_POSTS_REQUEST :
			return {
				...state,
				isFetching: true,
				success: false
			}
		case LOAD_POSTS_SUCCESS :
			const byId = {};
			action.items.map((item) => (byId[item.id] = item))

			return {
				...state,
				byId,
				items: action.items,
				isFetching: false,
				success: true
			}
		case LOAD_POSTS_FAILURE :
			return {
				...state,
				isFetching: false,
				success: false,
				failure: action.failure
			}
		/*
		 * VOTE
		 */
		case VOTE_POST_REQUEST :
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
		case VOTE_POST_SUCCESS :
			/* POST voteScore UPDATED BY VOTE_POST_REQUEST */
			return {
				...state,
				isFetching: false
			}
		case VOTE_POSTS_FAILURE :
			return {
				...state,
				isFetching: false,
				failure: 'vote',
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
		case SAVE_POST_REQUEST :
			return {
				...state,
				isFetching: true
			}
		case SAVE_POST_SUCCESS :
			const postsById = {};
			const items = [...state.items, action.post]
			items.sort((a, b) => ( b[action.orderBy] - a[action.orderBy] ))
			items.map((item) => (postsById[item.id] = item))

			return {
				...state,
				byId: postsById
			}
		/*
		 * REMOVE
		 */
		case REMOVE_POST_REQUEST :
			return {
				...state,
				isFetching: true
			}
		case REMOVE_POST_SUCCESS :
			const removedPostsById = Object.keys(state.byId).reduce((object, key) => {
				if (key !== action.post.id) {
			  	object[key] = state.byId[key]
				}
				return object
			}, {})
			return {
				...state,
				byId: removedPostsById,
				isFetching: false
			}
		/*
		 * UPDATE
		 */
		case UPDATE_POST_REQUEST :
			return {
				...state,
				isFetching: true
			}
		case UPDATE_POST_SUCCESS :
			return {
				...state,
				byId: {...state.byId, [action.post.id]: action.post}
			}
		/*
		 * ORDER
		 */
		case ORDER_POSTS_BY :
			let itemsById = {}
			const keys = Object.keys(state.byId).sort((a, b) => ( state.byId[b][action.orderBy] -  state.byId[a][action.orderBy] ))
			keys.map((key) => (itemsById[key] = state.byId[key]))

			return {
				...state,
				byId: itemsById
			}
		/*
		 * FAILURE
		 */
		case SHOW_POSTS_FAILURE :
			return {
				...state,
				failure: action.failure
			}
		case HIDE_POSTS_FAILURE :
			return {
				...state,
				failure: ''
			}
		default :
			return state
	}
}
