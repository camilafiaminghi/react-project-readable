import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading-bar'
import DefaultView from './DefaultView'
import PostView from '../components/PostView'
import NewPost from './NewPost'
import EditPost from './EditPost'
import Messages from './Messages'
import RouteNotFound from '../components/RouteNotFound'

export class App extends Component {

	static propTypes = {
		initialDataError: PropTypes.bool.isRequired,
		routes: PropTypes.array.isRequired
	}

	componentDidMount() {
		/* HANDLE INITIAL DATA */
		this.props.dispatch(handleInitialData())
	}

	render() {
		const { initialDataError, routes } = this.props

		if (initialDataError) {
			return (
				<div className="error">
  				<p>Sorry! The server is unavaiable. <br /> Please, try again later.</p>
  			</div>
			)
		} else {
			return (
				<div className="container">
					<LoadingBar className="loading-bar" />
					<Switch>
						<Route exact path="/" render={() => <DefaultView category="" />} />
						{routes.map((route, index) => (
							<Route exact key={index} path={`/${route}`} render={() => <DefaultView category={route} />} />
            ))}
            <Route path="/edit/:id" component={EditPost} />
            <Route exact path="/post" component={NewPost} />
            <Route exact strict path="/:category/:id" component={PostView} />
            <Route component={RouteNotFound} />
            <Route path="/not-found" component={RouteNotFound} />
        	</Switch>
					<Messages />
				</div>
			)
		}
	}
}

export const mapStateToProps = ({ categories, posts }) => {

	return {
		initialDataError: (categories.error && posts.error),
		routes: categories.items.map(item => (item.path))
	}
}

export default connect(mapStateToProps)(App)
