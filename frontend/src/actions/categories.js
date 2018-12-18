import { getCategories } from '../utils/ApiServer'

export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'

export function requestCategories () {
	return {
		type: REQUEST_CATEGORIES
	}
}

export function receiveCategories (items) {
	return {
		type: RECEIVE_CATEGORIES,
		items
	}
}

// Async Action TOGGLE_TWEET
export function handleCategories () {
	return (dispatch) => {
		dispatch(requestCategories())

		return getCategories()
			.then((data) => {
				dispatch(receiveCategories(data.categories))
			})
	}
}
