import { REQUEST_POSTS, RECEIVE_POSTS } from '../actions/posts'

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
		default :
			return state
	}
}

