import { getPosts, votePost, savePost, removePost, updatePost } from '../utils/ApiServer'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { push } from 'connected-react-router'
export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST'
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS'
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE'
export const VOTE_POST_REQUEST = 'VOTE_POST_REQUEST'
export const VOTE_POST_SUCCESS = 'VOTE_POST_SUCCESS'
export const SAVE_POST_REQUEST = 'SAVE_POST_REQUEST'
export const SAVE_POST_SUCCESS = 'SAVE_POST_SUCCESS'
export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST'
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS'
export const UPDATE_POST_REQUEST = 'UPDATE_POST_REQUEST'
export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS'

/*
 * LOAD
 */
export function loadPostsRequest () {
	return {
		type: LOAD_POSTS_REQUEST
	}
}

export function loadPostsSuccess (items) {
	return {
		type: LOAD_POSTS_SUCCESS,
		items
	}
}

export function loadPostsFailure () {
	return {
		type: LOAD_POSTS_FAILURE
	}
}

export function handlePosts (category) {
	return (dispatch) => {
		dispatch(loadPostsRequest())

		return getPosts(category)
			.then((posts) => dispatch(loadPostsSuccess(posts)))
			.catch(() => dispatch(loadPostsFailure()))
	}
}

/*
 * VOTE
 */
export function votePostRequest (id, option) {
	return {
		type: VOTE_POST_REQUEST,
		id,
		option
	}
}

export function votePostSuccess (post) {
	return {
		type: VOTE_POST_SUCCESS,
		post
	}
}

export function handleVotePost (id, option) {
	return (dispatch) => {
		dispatch(votePostRequest(id, option))

		return votePost(id, option)
			.then((post) => {
				if (post)
					dispatch(votePostSuccess(post))
				else
					/* DISPATCH receivePostDownVote */
					console.log('onError post', post)
			})
	}
}

/*
 * SAVE
 */
export function savePostRequest () {
	return {
		type: SAVE_POST_REQUEST
	}
}

export function savePostSuccess (post) {
	return {
		type: SAVE_POST_SUCCESS,
		post
	}
}

export function handleSavePost (post) {
	return (dispatch) => {
		dispatch(showLoading())
		dispatch(savePostRequest(post))

		return savePost(post)
			.then((data) => {
				if (data) {
					dispatch(savePostSuccess(data))
					dispatch(push(`/${data.category}`))
				} else {
					/* DISPATCH ERROR */
					console.log('onError post', data)
				}
				dispatch(hideLoading())
			})
	}
}

/*
 * REMOVE
 */
export function removePostRequest (id) {
	return {
		type: REMOVE_POST_REQUEST,
		id
	}
}

export function removePostSuccess (post) {
	return {
		type: REMOVE_POST_SUCCESS,
		post
	}
}

export function handleRemovePost (id) {
	return (dispatch) => {
		dispatch(removePostRequest(id))

		return removePost(id)
			.then((data) => {
				if (data) {
					dispatch(removePostSuccess(data))
					dispatch(push(`/${data.category}`))
				} else {
					/* DISPATCH ERROR */
					console.log('onError post', data)
				}
			})
	}
}

/*
 * UPDATE
 */
export function updatePostRequest () {
	return {
		type: UPDATE_POST_REQUEST
	}
}

export function updatePostSuccess (post) {
	return {
		type: UPDATE_POST_SUCCESS,
		post
	}
}

export function handleUpdatePost (id, post) {
	return (dispatch) => {
		dispatch(updatePostRequest())

		return updatePost(id, post)
			.then((data) => {
				if (data) {
					dispatch(updatePostSuccess(data))
					dispatch(push(`/post/${data.id}`))
				} else {
					/* DISPATCH ERROR */
					console.log('onError post', data)
				}
			})
	}
}
