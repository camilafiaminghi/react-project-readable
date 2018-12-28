import { handleCategories } from './categories'
import { handlePosts, handleCleanPostFailure } from './posts'
import { handleSaveComment, handleRemoveComment, hideCommentFailure } from './comments'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export function handleInitialData () {
	return (dispatch) => {
		dispatch(showLoading())

		return Promise.all([
			dispatch(handleCategories()),
	    dispatch(handlePosts())
	  ])
	  	.then(() => dispatch(hideLoading()))
	  	.catch(() => dispatch(hideLoading()))
	}
}

export function handleUpdatePostComments (form, parentId) {
	return (dispatch) => {
		dispatch(showLoading())

		return Promise.all([
			dispatch(handleSaveComment(form, parentId)),
	    dispatch(handlePosts())
	  ])
	  	.then(() => dispatch(hideLoading()))
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
			dispatch(handleCleanPostFailure()),
	    dispatch(hideCommentFailure())
	   ])
	}
}
