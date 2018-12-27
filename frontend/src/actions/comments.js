import { getComments, voteComment, saveComment } from '../utils/ApiServer'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import connectedReactRouter from 'connected-react-router'
export const LOAD_COMMENTS_REQUEST = 'LOAD_COMMENTS_REQUEST'
export const LOAD_COMMENTS_SUCCESS = 'LOAD_COMMENTS_SUCCESS'
export const VOTE_COMMENT_REQUEST = 'VOTE_COMMENT_REQUEST'
export const VOTE_COMMENT_SUCCESS = 'VOTE_COMMENT_SUCCESS'
export const SAVE_COMMENT_REQUEST = 'SAVE_COMMENT_REQUEST'
export const SAVE_COMMENT_SUCCESS = 'SAVE_COMMENT_SUCCESS'

/*
 * LOAD
 */
export function loadCommentsRequest () {
	return {
		type: LOAD_COMMENTS_REQUEST
	}
}

export function loadCommentsSuccess (items) {
	return {
		type: LOAD_COMMENTS_SUCCESS,
		items
	}
}

export function handleComments (commentId) {
	return (dispatch) => {
		dispatch(showLoading())
		dispatch(loadCommentsRequest())

		return getComments(commentId)
			.then((comments) => {
				dispatch(loadCommentsSuccess(comments))
				dispatch(hideLoading())
			})
	}
}

/*
 * VOTE
 */
export function voteCommentRequest (id, option) {
	return {
		type: VOTE_COMMENT_REQUEST,
		id,
		option
	}
}

export function voteCommentSuccess (comment) {
	return {
		type: VOTE_COMMENT_SUCCESS,
		comment
	}
}

export function handleVoteComment (id, option) {
	return (dispatch) => {
		dispatch(voteCommentRequest(id, option))

		return voteComment(id, option)
			.then((comment) => {
				if (comment)
					dispatch(voteCommentSuccess(comment))
				else
					/* DISPATCH receiveCommentDownVote */
					console.log('onError comment', comment)
			})
	}
}

/*
 * SAVE
 */
export function saveCommentRequest () {
	return {
		type: SAVE_COMMENT_REQUEST
	}
}

export function saveCommentSuccess (comment) {
	return {
		type: SAVE_COMMENT_SUCCESS,
		comment
	}
}

export function handleSaveComment (comment, parentId) {
	return (dispatch) => {
		dispatch(showLoading())
		dispatch(saveCommentRequest(comment))

		return saveComment(comment, parentId)
			.then((data) => {
				if (data) {
					dispatch(saveCommentSuccess(data))
					// dispatch(reload(`/post/${parentId}`))
				} else {
					/* DISPATCH ERROR */
					console.log('onError comment', data)
				}
				dispatch(hideLoading())
			})
	}
}
