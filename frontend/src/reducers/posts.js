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
	UPDATE_POST_REQUEST,
	UPDATE_POST_SUCCESS } from '../actions/posts'

export default function posts (state = {
	items: [],
	action: '',
	isFetching: false,
	error: false,
	success: false
}, action) {
	switch(action.type) {
		case LOAD_POSTS_REQUEST :
			return {
				...state,
				action: 'load',
				isFetching: true,
				success: false,
				error: false
			}
		case LOAD_POSTS_SUCCESS :
			return {
				...state,
				items: action.items,
				action: '',
				isFetching: false,
				success: true
			}
		case LOAD_POSTS_FAILURE :
			return {
				...state,
				isFetching: false,
				error: true
			}

		case VOTE_POST_REQUEST :
			const posts = state.items.map((item) => {
				if (item.id === action.id)
					item.voteScore = (action.option === 'upVote') ? item.voteScore+1 : item.voteScore-1
				return item
			})
			return {
				...state,
				action: 'vote',
				isFetching: true,
				items: [ ...posts ]
			}
		case VOTE_POST_SUCCESS :
			/* POST voteScore UPDATED BY VOTE_POST_REQUEST */
			return {
				...state,
				isFetching: false
			}

		case SAVE_POST_REQUEST :
			return {
				...state,
				action: 'save',
				isFetching: true,
				success: false
			}
		case SAVE_POST_SUCCESS :
			return {
				...state,
				items: [...state.items, action.post],
				success: true
			}

		case REMOVE_POST_REQUEST :
			const items = state.items.filter((item) => (item.id !== action.id))
			return {
				...state,
				items,
				action: 'remove',
				isFetching: true,
				success: false
			}
		case REMOVE_POST_SUCCESS :
			return {
				...state,
				items: [...state.items],
				success: true
			}

		case UPDATE_POST_REQUEST :
			return {
				...state,
				action: 'update',
				isFetching: true,
				success: false
			}
		case UPDATE_POST_SUCCESS :
			let postsItems = state.items.filter((item) => (item.id !== action.post.id))
			return {
				...state,
				items: [...postsItems, action.post],
				success: true
			}
		default :
			return state
	}
}
