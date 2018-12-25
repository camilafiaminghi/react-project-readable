import { getPosts, votePost, savePost, removePost } from '../utils/ApiServer'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST'
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS'
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE'

export const VOTE_POST_REQUEST = 'VOTE_POST_REQUEST'
export const VOTE_POST_SUCCESS = 'VOTE_POST_SUCCESS'

export const SAVE_POST_REQUEST = 'SAVE_POST_REQUEST'
export const SAVE_POST_SUCCESS = 'SAVE_POST_SUCCESS'

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST'
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS'

/**/
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

/**/
/**/
export function requestVotePost (id, option) {
	return {
		type: VOTE_POST_REQUEST,
		id,
		option
	}
}

export function receiveVotePost (post) {
	return {
		type: VOTE_POST_SUCCESS,
		post
	}
}

/**/
export function requestSavePost () {
	return {
		type: SAVE_POST_REQUEST
	}
}

export function receiveSavePost (post) {
	return {
		type: SAVE_POST_SUCCESS,
		post
	}
}

/**/
export function requestRemovePost (id) {
	return {
		type: REMOVE_POST_REQUEST,
		id
	}
}

export function receiveRemovePost (post) {
	return {
		type: REMOVE_POST_SUCCESS,
		post
	}
}

// Async Action getPosts
export function handlePosts (category) {
	return (dispatch) => {
		dispatch(loadPostsRequest())

		return getPosts(category)
			.then((posts) => dispatch(loadPostsSuccess(posts)))
			.catch(() => dispatch(loadPostsFailure()))
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
