import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import DefaultView from './DefaultView'
import PostView from '../components/PostView'
import NewPost from './NewPost'
import EditPost from './EditPost'
import LoadingBar from 'react-redux-loading-bar'
import RouteNotFound from '../components/RouteNotFound'

class App extends Component {

	static propTypes = {
		routes: PropTypes.array.isRequired,
		loadingError: PropTypes.bool.isRequired
	}

	componentDidMount() {
		/* HANDLE INITIAL DATA */
		this.props.dispatch(handleInitialData())
	}

	render() {
		const { loadingError, routes } = this.props

		return (
			<Fragment>
				<div className="container">
					<LoadingBar className="loading-bar" />
					<Fragment>
						{ loadingError
		      		? <div className="error">
		      				<p>Sorry! The server is unavaiable. <br /> Please, try again later.</p>
		      			</div>
							: <Switch>
									<Route exact path="/" component={DefaultView} />
									{routes.map((route, index) => (
										<Route exact key={index} path={`/${route}`} render={() => <DefaultView category={route} />} />
		              ))}
		              <Route path="/edit/post/:id" component={EditPost} />
		              <Route path="/post/:id" component={PostView} />
		              <Route exact path="/post" component={NewPost} />
	              	<Route component={RouteNotFound} />
	            </Switch>
	          }
					</Fragment>
				</div>
			</Fragment>
		);
	}
}

const mapStateToProps = ({ categories, posts }) => {
	return {
		routes: categories.items.map(item => (item.path)),
		loadingError: (categories.error && posts.error)
	}
}

export default connect(mapStateToProps)(App)
