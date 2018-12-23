import { ERROR_LOADING } from '../actions/shared'

export function loading (state = {
	error: false
}, action) {
	switch(action.type) {
		case ERROR_LOADING :
			return {
				...state,
				error: action.error
			}
		default :
			return state
	}
}
