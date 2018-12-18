import { REQUEST_CATEGORIES, RECEIVE_CATEGORIES } from '../actions/categories'

export default function categories (state = {
	isFetching: false,
	items: []
}, action) {
	switch(action.type) {
		case REQUEST_CATEGORIES :
			return {
				...state,
				isFetching: true
			}
		case RECEIVE_CATEGORIES :
			return {
				...state,
				isFetching: false,
				items: action.items.map(item => (item.path))
			}
		default :
			return state
	}
}

