import { getPosts } from '../utils/ApiServer'

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

		return getPosts(category)
			.then((posts) => {
				dispatch(receivePosts(posts))
			})
	}
}
