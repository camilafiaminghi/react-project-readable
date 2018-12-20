import { getPosts, upVotePost } from '../utils/ApiServer'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const REQUEST_POST_UPVOTE = 'REQUEST_POST_UPVOTE'
export const RECEIVE_POST_UPVOTE = 'RECEIVE_POST_UPVOTE'

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

export function requestPostUpVote (id) {
	return {
		type: REQUEST_POST_UPVOTE,
		id
	}
}

export function receivePostUpVote (post) {
	return {
		type: RECEIVE_POST_UPVOTE,
		post
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

// Async Action REQUEST_POST_UPVOTE
export function handlePostUpVote (id) {
	return (dispatch) => {
		dispatch(requestPostUpVote(id))

		return upVotePost(id)
			.then((post) => {
				if (post)
					dispatch(receivePostUpVote(post))
				else
					/* DISPATCH receivePostDownVote */
					console.log('onError post', post)
			})
	}
}
