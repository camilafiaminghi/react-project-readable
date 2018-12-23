import { handleCategories } from './categories'
import { handlePosts } from './posts'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const ERROR_LOADING = 'ERROR_LOADING'
/**/
export function errorLoading () {
	return {
		type: ERROR_LOADING,
		error: true
	}
}

export function handleInitialData () {
	return (dispatch) => {
		dispatch(showLoading())

		return Promise.all([
			dispatch(handleCategories()),
	    dispatch(handlePosts())
	  ])
	  	.then(() => dispatch(hideLoading()))
	  	.catch(() => {
	  		dispatch(errorLoading())
	  		dispatch(hideLoading())
	  	})
	}
}
