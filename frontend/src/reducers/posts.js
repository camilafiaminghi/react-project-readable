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
	UPDATE_POST_SUCCESS,
	ORDER_POSTS_BY } from '../actions/posts'

export default function posts (state = {
	items: [],
	isFetching: false,
	error: false,
	success: false
}, action) {
	switch(action.type) {
		case LOAD_POSTS_REQUEST :
			return {
				...state,
				isFetching: true,
				success: false,
				error: false
			}
		case LOAD_POSTS_SUCCESS :
			return {
				...state,
				items: action.items,
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
		case ORDER_POSTS_BY :
			const postItems = state.items.sort((a, b) => ( b[action.orderBy] - a[action.orderBy] ))

			return {
				...state,
				items: postItems
			}
		default :
			return state
	}
}
