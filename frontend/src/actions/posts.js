import { getPosts } from '../utils/ApiServer'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'

export function requestPosts () {
	return {
		type: REQUEST_POSTS
	}
}

export function receivePosts (items) {
	return {
		type: RECEIVE_POSTS,
		items
	}
}

// Async Action
export function handlePosts (category) {
	return (dispatch) => {
		dispatch(requestPosts())
		dispatch(showLoading())

		return getPosts(category)
			.then((data) => {
				dispatch(receivePosts(data))
				dispatch(hideLoading())
			})
	}
}
