import {
	REQUEST_POSTS,
	RECEIVE_POSTS,
	REQUEST_VOTE_POST,
	RECEIVE_VOTE_POST,
	REQUEST_SAVE_POST,
	RECEIVE_SAVE_POST,
	REQUEST_REMOVE_POST,
	RECEIVE_REMOVE_POST } from '../actions/posts'

export default function posts (state = {
	isFetching: false,
	items: [],
	errors: [],
	success: false
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
		/**/
		case REQUEST_VOTE_POST :
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
		case RECEIVE_VOTE_POST :
			/* POST voteScore UPDATED BY REQUEST_VOTE_POST */
			return {
				...state,
				isFetching: false
			}
		/**/
		case REQUEST_SAVE_POST :
			return {
				...state,
				isFetching: true,
				success: false
			}
		case RECEIVE_SAVE_POST :
			/**/
			return {
				...state,
				items: [...state.items, action.post],
				success: true
			}
		/**/
		case REQUEST_REMOVE_POST :
			const items = state.items.filter((item) => (item.id !== action.id))

			return {
				...state,
				items,
				isFetching: true,
				success: false
			}
		case RECEIVE_REMOVE_POST :
			/**/
			return {
				...state,
				items: [...state.items],
				success: true
			}
		/**/
		default :
			return state
	}
}

