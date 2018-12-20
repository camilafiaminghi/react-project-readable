import { getComments } from '../utils/ApiServer'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
export const REQUEST_COMMENTS = 'REQUEST_COMMENTS'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'

export function requestComments () {
	return {
		type: REQUEST_COMMENTS
	}
}

export function receiveComments (items) {
	return {
		type: RECEIVE_COMMENTS,
		items
	}
}

// Async Action
export function handleComments (postId) {
	return (dispatch) => {
		dispatch(showLoading())
		dispatch(requestComments())

		return getComments(postId)
			.then((comments) => {
				dispatch(receiveComments(comments))
				dispatch(hideLoading())
			})
	}
}
