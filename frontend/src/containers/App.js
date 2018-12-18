import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleCategories } from '../actions/categories'
import DefaultView from './DefaultView'
import RouteNotFound from '../components/RouteNotFound'

class App extends Component {

	static propTypes = {
		routes: PropTypes.array.isRequired
	}

	componentDidMount() {
		this.props.dispatch(handleCategories())
	}

	render() {
		return (
			<Router>
				<Fragment>
					<div className="container">
						<Fragment>
							<Switch>
								<Route exact path="/" component={DefaultView} />
								{this.props.routes.map((route, index) => (
									<Route exact key={index} path={route} component={DefaultView} />
	              ))}
	              <Route component={RouteNotFound} />
	            </Switch>
						</Fragment>
					</div>
				</Fragment>
			</Router>
		);
	}
}

function mapStateToProps ({ categories }) {
	return {
		routes: categories.items.map(item => (`/${item.path}`))
	}
}

export default connect(mapStateToProps)(App)
