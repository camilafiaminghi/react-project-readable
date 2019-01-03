import {
	LOAD_CATEGORIES_REQUEST,
	LOAD_CATEGORIES_SUCCESS,
	LOAD_CATEGORIES_FAILURE,
	HIDE_CATEGORIES_FAILURE } from '../actions/categories'

export default function categories (state = {
	items: [],
	byPath: [],
	isFetching: false,
	success: false,
	failure: ''
}, action) {
	switch(action.type) {
		/*
		 * LOAD
		 */
		case LOAD_CATEGORIES_REQUEST:
			return {
				...state,
				isFetching: true,
				success: false
			}
		case LOAD_CATEGORIES_SUCCESS:
			return {
				...state,
				items: action.items,
				byPath: action.items.map((item) => (item.path)),
				isFetching: false,
				success: true
			}
		case LOAD_CATEGORIES_FAILURE:
			return {
				...state,
				items: [],
				isFetching: false,
				success: false,
				failure: action.failure
			}
		/*
		 * FAILURE
		 */
		case HIDE_CATEGORIES_FAILURE :
			return {
				...state,
				failure: ''
			}
		default :
			return state
	}
}

