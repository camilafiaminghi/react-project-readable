import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleCategories } from '../actions/categories'
import DefaultView from './DefaultView'

class App extends Component {
	componentDidMount() {
		this.props.dispatch(handleCategories())
	}

	render() {
		const routes = this.props.categories.items.map(item => (`/${item}`))
		routes.push('/')

		return (
			<Router>
				<Fragment>
					<div className="container">
						<Fragment>
							{routes.map((route, index) => (
								<Route exact key={index} path={route} component={DefaultView} />
              ))}
						</Fragment>
					</div>
				</Fragment>
			</Router>
		);
	}
}

function mapStateToProps ({ categories }) {
	return {
		categories: categories
	}
}

export default connect(mapStateToProps)(App)
