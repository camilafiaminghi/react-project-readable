import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import DefaultView from './DefaultView'
import PostView from '../components/PostView'
import LoadingBar from 'react-redux-loading-bar'
import RouteNotFound from '../components/RouteNotFound'

class App extends Component {

	static propTypes = {
		routes: PropTypes.array.isRequired
	}

	componentDidMount() {
		/* HANDLE INITIAL DATA */
		this.props.dispatch(handleInitialData())
	}

	render() {
		return (
			<Router>
				<Fragment>
					<div className="container">
						<LoadingBar className="loading-bar" />
						<Fragment>
							<Switch>
									<Route exact path="/" component={DefaultView} />
									{this.props.routes.map((route, index) => (
										<Route exact key={index} path={`/${route}`} render={() => <DefaultView category={route} />} />
		              ))}
		              <Route path="/post/:id" component={PostView} />
	              	<Route component={RouteNotFound} />
	            </Switch>
						</Fragment>
					</div>
				</Fragment>
			</Router>
		);
	}
}

const mapStateToProps = ({ categories, posts }) => {
	return {
		routes: categories.items.map(item => (item.path))
	}
}

export default connect(mapStateToProps)(App)
