import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading-bar'
import categories from './categories'
import posts from './posts'

export default combineReducers({
	loadingBar: loadingBarReducer,
	categories,
	posts
})
