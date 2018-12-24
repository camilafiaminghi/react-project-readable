import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ConnectedRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { compose, createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from './reducers'
import middleware from './middleware'
import App from './containers/App';

const history = createBrowserHistory()
const store = createStore(
	reducers(history),
	compose(middleware)
)

ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<App />
		</ConnectedRouter>
	</Provider>, document.getElementById('root'))
