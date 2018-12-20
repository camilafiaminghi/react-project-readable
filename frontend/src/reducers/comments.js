import { REQUEST_COMMENTS, RECEIVE_COMMENTS } from '../actions/comments'

export default function comments (state = {
	isFetching: false,
	items: []
}, action) {
	switch(action.type) {
		case REQUEST_COMMENTS :
			return {
				...state,
				isFetching: true
			}
		case RECEIVE_COMMENTS :
			return {
				...state,
				isFetching: false,
				items: action.items
			}
		default :
			return state
	}
}

