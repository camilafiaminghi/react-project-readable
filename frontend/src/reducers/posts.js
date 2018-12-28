import {
	LOAD_POSTS_REQUEST,
	LOAD_POSTS_SUCCESS,
	LOAD_POSTS_FAILURE,
	VOTE_POST_REQUEST,
	VOTE_POST_SUCCESS,
	VOTE_POST_FAILURE,
	SAVE_POST_REQUEST,
	SAVE_POST_SUCCESS,
	SAVE_POST_FAILURE,
	REMOVE_POST_REQUEST,
	REMOVE_POST_SUCCESS,
	REMOVE_POST_FAILURE,
	UPDATE_POST_REQUEST,
	UPDATE_POST_SUCCESS,
	UPDATE_POST_FAILURE,
	ORDER_POSTS_BY,
	CLEAN_POST_FAILURE } from '../actions/posts'

export default function posts (state = {
	items: [],
	byId: {},
	isFetching: false,
	success: false,
	error: false,
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
				error: true,
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
		case VOTE_POST_FAILURE :
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
			return {
				...state,
				items: [...state.items, action.post]
			}
		case SAVE_POST_FAILURE :
			return {
				...state,
				failure: 'save'
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
			const postsById = Object.keys(state.byId).reduce((object, key) => {
				if (key !== action.id) {
			  	object[key] = state.byId[key]
				}
				return object
			}, {})
			return {
				...state,
				byId: postsById
			}
		case REMOVE_POST_FAILURE :
			return {
				...state,
				isFetching: false,
				failure: 'remove'
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
			let postsItems = state.items.filter((item) => (item.id !== action.post.id))
			return {
				...state,
				items: [...postsItems, action.post]
			}
		case UPDATE_POST_FAILURE :
			return {
				...state,
				isFetching: false,
				failure: 'edit'
			}
		/*
		 * ORDER
		 */
		case ORDER_POSTS_BY :
			const itemsById = {};
			state.items.sort((a, b) => ( b[action.orderBy] - a[action.orderBy] ))
			state.items.map((item) => (itemsById[item.id] = item))
			return {
				...state,
				byId: itemsById
			}
		/*
		 * CLEAN
		 */
		case CLEAN_POST_FAILURE :
			return {
				...state,
				failure: ''
			}
		default :
			return state
	}
}
