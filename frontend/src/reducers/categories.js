import {
	LOAD_CATEGORIES_REQUEST,
	LOAD_CATEGORIES_SUCCESS,
	LOAD_CATEGORIES_FAILURE } from '../actions/categories'

export default function categories (state = {
	items: [],
	isFetching: false,
	success: false,
	error: false
}, action) {
	switch(action.type) {
		case LOAD_CATEGORIES_REQUEST:
			return {
				...state,
				isFetching: true,
				success: false,
				error: false
			}
		case LOAD_CATEGORIES_SUCCESS:
			return {
				...state,
				items: action.items,
				isFetching: false,
				success: true,
				error: false
			}
		case LOAD_CATEGORIES_FAILURE:
			return {
				...state,
				items: [],
				isFetching: false,
				success: false,
				error: true
			}
		default :
			return state
	}
}

