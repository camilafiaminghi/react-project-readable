import { handleCategories } from './categories'
import { handlePosts } from './posts'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export function handleInitialData () {
	return (dispatch) => {
		dispatch(showLoading())

		return Promise.all([
			dispatch(handleCategories()),
	    dispatch(handlePosts())
	  ]).then(() => dispatch(hideLoading()))
	}
}
