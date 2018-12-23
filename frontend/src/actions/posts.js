import { getPosts, votePost, savePost, removePost } from '../utils/ApiServer'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const REQUEST_VOTE_POST = 'REQUEST_VOTE_POST'
export const RECEIVE_VOTE_POST = 'RECEIVE_VOTE_POST'
export const REQUEST_SAVE_POST = 'REQUEST_SAVE_POST'
export const RECEIVE_SAVE_POST = 'RECEIVE_SAVE_POST'
export const REQUEST_REMOVE_POST = 'REQUEST_REMOVE_POST'
export const RECEIVE_REMOVE_POST = 'RECEIVE_REMOVE_POST'

/**/
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

/**/
export function requestVotePost (id, option) {
	return {
		type: REQUEST_VOTE_POST,
		id,
		option
	}
}

export function receiveVotePost (post) {
	return {
		type: RECEIVE_VOTE_POST,
		post
	}
}

/**/
export function requestSavePost () {
	return {
		type: REQUEST_SAVE_POST
	}
}

export function receiveSavePost (post) {
	return {
		type: RECEIVE_SAVE_POST,
		post
	}
}

/**/
export function requestRemovePost (id) {
	return {
		type: REQUEST_REMOVE_POST,
		id
	}
}

export function receiveRemovePost (post) {
	return {
		type: RECEIVE_REMOVE_POST,
		post
	}
}

// Async Action getPosts
export function handlePosts (category) {
	return (dispatch) => {
		dispatch(requestPosts())

		return getPosts(category)
			.then((posts) => {
				dispatch(receivePosts(posts))
			})
	}
}

// Async Action votePost
export function handleVotePost (id, option) {
	return (dispatch) => {
		dispatch(requestVotePost(id, option))

		return votePost(id, option)
			.then((post) => {
				if (post)
					dispatch(receiveVotePost(post))
				else
					/* DISPATCH receivePostDownVote */
					console.log('onError post', post)
			})
	}
}

// Async Action votePost
export function handleSavePost (post) {
	return (dispatch) => {
		dispatch(showLoading())
		dispatch(requestSavePost(post))

		return savePost(post)
			.then((data) => {
				if (data) {
					dispatch(receiveSavePost(data))
				} else {
					/* DISPATCH ERROR */
					console.log('onError post', data)
				}
				dispatch(hideLoading())
			})
	}
}

// Async Action removePost
export function handleRemovePost (id) {
	return (dispatch) => {
		dispatch(requestRemovePost(id))

		return removePost(id)
			.then((data) => {
				if (data) {
					dispatch(receiveRemovePost(data))
				} else {
					/* DISPATCH ERROR */
					console.log('onError post', data)
				}
			})
	}
}
