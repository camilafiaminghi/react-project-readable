import { getPosts, votePost } from '../utils/ApiServer'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const REQUEST_POST_VOTE = 'REQUEST_POST_VOTE'
export const RECEIVE_POST_VOTE = 'RECEIVE_POST_VOTE'

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

export function requestPostVote (id, option) {
	return {
		type: REQUEST_POST_VOTE,
		id,
		option
	}
}

export function receivePostVote (post) {
	return {
		type: RECEIVE_POST_VOTE,
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
export function handleVotePost (id, option) {
	return (dispatch) => {
		dispatch(requestPostVote(id, option))

		return votePost(id, option)
			.then((post) => {
				if (post)
					dispatch(receivePostVote(post))
				else
					/* DISPATCH receivePostDownVote */
					console.log('onError post', post)
			})
	}
}
