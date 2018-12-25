import thunk from 'redux-thunk'
import { createBrowserHistory } from 'history'
import { applyMiddleware } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import logger from './logger'

export const history = createBrowserHistory()

export default applyMiddleware(
	routerMiddleware(history),
	thunk,
	logger
)
