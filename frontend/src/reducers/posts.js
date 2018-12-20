import {
	REQUEST_POSTS,
	RECEIVE_POSTS,
	REQUEST_POST_VOTE,
	RECEIVE_POST_VOTE } from '../actions/posts'

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
		case REQUEST_POST_VOTE :
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
		case RECEIVE_POST_VOTE :
			/* POST voteScore UPDATE BY REQUEST_POST_VOTE */
			return {
				...state,
				isFetching: false
			}
		default :
			return state
	}
}

