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
	}

	componentDidMount() {
		this.props.handleInitialData()
	}

	render() {
		const { initialDataError } = this.props

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
						<Route exact path="/" component={DefaultView} />
						<Route path="/not-found" component={RouteNotFound} />
            <Route path="/edit/:id" component={EditPost} />
            <Route path="/add" component={NewPost} />
            <Route path="/:category/:id" component={PostView} />
						<Route path="/:category" component={DefaultView} />
						<Route component={RouteNotFound} />
        	</Switch>
					<Messages />
				</div>
			)
		}
	}
}

export const mapStateToProps = ({ categories, posts }) => {
	return {
		initialDataError: (categories.error && posts.error)
	}
}

export const mapDispatchToProps = (dispatch) => {
  return {
    handleInitialData: () => dispatch(handleInitialData())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
