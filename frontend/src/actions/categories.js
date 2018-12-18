import { getCategories } from '../utils/ApiServer'

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'

export function receiveCategories (categories) {
	return {
		type: RECEIVE_CATEGORIES,
		categories
	}
}

// Async Action TOGGLE_TWEET
export function handleCategories (info) {
	return (dispatch) => {
		return getCategories()
			.then(({ categories }) => {
				dispatch(receiveCategories(categories))
			})
	}
}