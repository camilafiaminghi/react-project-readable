import { getCategories } from '../utils/ApiServer'

export const LOAD_CATEGORIES_REQUEST = 'LOAD_CATEGORIES_REQUEST'
export const LOAD_CATEGORIES_SUCCESS = 'LOAD_CATEGORIES_SUCCESS'
export const LOAD_CATEGORIES_FAILURE = 'LOAD_CATEGORIES_FAILURE'

export const HIDE_CATEGORIES_FAILURE = 'HIDE_CATEGORIES_FAILURE'

/*
 * LOAD
 */
export function loadCategoriesRequest () {
	return {
		type: LOAD_CATEGORIES_REQUEST
	}
}

export function loadCategoriesSuccess (items) {
	return {
		type: LOAD_CATEGORIES_SUCCESS,
		items
	}
}

export function loadCategoriesFailure () {
	return {
		type: LOAD_CATEGORIES_FAILURE,
		failure: 'load'
	}
}

export function handleCategories () {
	return (dispatch) => {
		dispatch(loadCategoriesRequest())

		return getCategories()
			.then((data) => dispatch(loadCategoriesSuccess(data.categories)))
			.catch((error) => dispatch(loadCategoriesFailure()))
	}
}

/*
 * FAILURE
 */
export function hideCategoriesFailure () {
	return {
		type: HIDE_CATEGORIES_FAILURE
	}
}
