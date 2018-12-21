import { getPosts, votePost, savePost } from '../utils/ApiServer'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const REQUEST_POST_VOTE = 'REQUEST_POST_VOTE'
export const RECEIVE_POST_VOTE = 'RECEIVE_POST_VOTE'
export const REQUEST_POST_SAVE = 'REQUEST_POST_SAVE'
export const RECEIVE_POST_SAVE = 'RECEIVE_POST_SAVE'

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
		type: REQUEST_POST_VOTE,
		id,
		option
	}
}

export function receiveVotePost (post) {
	return {
		type: RECEIVE_POST_VOTE,
		post
	}
}

/**/
export function requestSavePost () {
	return {
		type: REQUEST_POST_SAVE
	}
}

export function receiveSavePost (post) {
	return {
		type: RECEIVE_POST_SAVE,
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
