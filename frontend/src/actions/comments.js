import { getComments, voteComment, saveComment, removeComment, updateComment } from '../utils/ApiServer'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
export const LOAD_COMMENTS_REQUEST = 'LOAD_COMMENTS_REQUEST'
export const LOAD_COMMENTS_SUCCESS = 'LOAD_COMMENTS_SUCCESS'

export const VOTE_COMMENT_REQUEST = 'VOTE_COMMENT_REQUEST'
export const VOTE_COMMENT_SUCCESS = 'VOTE_COMMENT_SUCCESS'
export const VOTE_COMMENT_FAILURE = 'VOTE_COMMENT_FAILURE'

export const SAVE_COMMENT_REQUEST = 'SAVE_COMMENT_REQUEST'
export const SAVE_COMMENT_SUCCESS = 'SAVE_COMMENT_SUCCESS'

export const REMOVE_COMMENT_REQUEST = 'REMOVE_COMMENT_REQUEST'
export const REMOVE_COMMENT_SUCCESS = 'REMOVE_COMMENT_SUCCESS'

export const UPDATE_COMMENT_REQUEST = 'UPDATE_COMMENT_REQUEST'
export const UPDATE_COMMENT_SUCCESS = 'UPDATE_COMMENT_SUCCESS'

export const SHOW_COMMENT_FAILURE = 'SHOW_COMMENT_FAILURE'
export const HIDE_COMMENT_FAILURE = 'HIDE_COMMENT_FAILURE'

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

export function voteCommentFailure (id, option, failure) {
	return {
		type: VOTE_COMMENT_FAILURE,
		id,
		option,
		failure
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
					dispatch(voteCommentFailure(id, option, 'vote'))
			})
			.catch(() => dispatch(voteCommentFailure(id, option, 'vote')))
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
				} else {
					dispatch(showCommentFailure('save'))
				}
				dispatch(hideLoading())
			})
			.catch(() => {
				dispatch(showCommentFailure('save'))
				dispatch(hideLoading())
			})
	}
}

/*
 * REMOVE
 */
export function removeCommentRequest () {
	return {
		type: REMOVE_COMMENT_REQUEST
	}
}

export function removeCommentSuccess (id) {
	return {
		type: REMOVE_COMMENT_SUCCESS,
		id
	}
}

export function handleRemoveComment (id) {
	return (dispatch) => {
		dispatch(removeCommentRequest())

		return removeComment(id)
			.then((data) => {
				if (data) {
					dispatch(removeCommentSuccess(id))
				} else {
					dispatch(showCommentFailure('remove'))
				}
			})
			.catch(() => dispatch(showCommentFailure('remove')))
	}
}

/*
 * UPDATE
 */
export function updateCommentRequest () {
	return {
		type: UPDATE_COMMENT_REQUEST
	}
}

export function updateCommentSuccess (comment) {
	return {
		type: UPDATE_COMMENT_SUCCESS,
		comment
	}
}

export function handleUpdateComment (id, comment) {
	return (dispatch) => {
		dispatch(updateCommentRequest())

		return updateComment(id, comment)
			.then((data) => {
				if (data) {
					dispatch(updateCommentSuccess(data))
				} else {
					dispatch(showCommentFailure('edit'))
				}
			})
			.catch(() => dispatch(showCommentFailure('edit')))
	}
}

/*
 * FAILURE
 */
export function showCommentFailure (failure) {
	return {
		type: SHOW_COMMENT_FAILURE,
		failure
	}
}

export function hideCommentFailure () {
	return {
		type: HIDE_COMMENT_FAILURE
	}
}
