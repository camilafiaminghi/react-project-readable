import {
	REQUEST_POSTS,
	RECEIVE_POSTS,
	REQUEST_POST_UPVOTE,
	RECEIVE_POST_UPVOTE } from '../actions/posts'

export default function posts (state = {
	isFetching: false,
	items: []
}, action) {
	switch(action.type) {
		case REQUEST_POSTS :
			return {
				...state,
				isFetching: true
			}
		case RECEIVE_POSTS :
			return {
				...state,
				isFetching: false,
				items: action.items
			}
		case REQUEST_POST_UPVOTE :
			const posts = state.items.map((item) => {
				if (item.id === action.id)
					item.voteScore++
				return item
			})

			return {
				...state,
				isFetching: true,
				items: [ ...posts ]
			}
		case RECEIVE_POST_UPVOTE :
			/* POST voteScore UPDATE BY REQUEST */
			return {
				...state,
				isFetching: false
			}
		default :
			return state
	}
}

