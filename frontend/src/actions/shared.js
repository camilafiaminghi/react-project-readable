import { handleCategories } from './categories'
import { handlePosts, hidePostFailure } from './posts'
import { handleSaveComment, handleRemoveComment, hideCommentFailure } from './comments'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export function handleInitialData () {
	return (dispatch) => {
		dispatch(showLoading())

		return Promise.all([
			dispatch(handleCategories())
	  ])
	  	.then(() => dispatch(hideLoading()))
	}
}

export function handleUpdatePostComments (form, parentId) {
	return (dispatch) => {
		return Promise.all([
			dispatch(handleSaveComment(form, parentId)),
	    dispatch(handlePosts())
	  ])
	}
}

export function handleRemovePostComments (id) {
	return (dispatch) => {
		dispatch(showLoading())

		return Promise.all([
			dispatch(handleRemoveComment(id)),
	    dispatch(handlePosts())
	   ])
	  	.then(() => dispatch(hideLoading()))
	}
}

export function handleCleanAllFailures (id) {
	return (dispatch) => {

		return Promise.all([
			dispatch(hidePostFailure()),
	    dispatch(hideCommentFailure())
	   ])
	}
}
