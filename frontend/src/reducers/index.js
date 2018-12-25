import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { loadingBarReducer } from 'react-redux-loading-bar'
import categories from './categories'
import posts from './posts'
import comments from './comments'

export default (history) => combineReducers({
	router: connectRouter(history),
	loadingBar: loadingBarReducer,
	categories,
	posts,
	comments
})
