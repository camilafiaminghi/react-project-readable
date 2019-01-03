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
		success: PropTypes.bool.isRequired,
		posts: PropTypes.object.isRequired,
		categories: PropTypes.object.isRequired
	}

	componentDidMount() {
		this.props.handleInitialData()
	}

	render() {
		const { success } = this.props

		if ( !success ) {
			return (<Messages />)
		} else {
			const posts = Object.keys(this.props.posts.byId).join('|')
			const categories = this.props.categories.byPath.join('|')

			return (
				<div className="container">
					<LoadingBar className="loading-bar" />
					<Switch>
						<Route exact path="/" component={DefaultView} />
						<Route path="/not-found" component={RouteNotFound} />
            <Route path="/edit/:id" component={EditPost} />
            <Route path="/add" component={NewPost} />
            <Route exact path={`/:category(${categories})/:id(${posts})`} component={PostView} />
						<Route exact path={`/:category(${categories})`} component={DefaultView} />
						<Route component={RouteNotFound} />
        	</Switch>
					<Messages />
				</div>
			)
		}
	}
}

export const mapStateToProps = ({ categories, posts }) => {
	const success = categories.success && posts.success

	return {
		success,
		categories,
		posts
	}
}

export const mapDispatchToProps = (dispatch) => {
  return {
    handleInitialData: () => dispatch(handleInitialData())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
