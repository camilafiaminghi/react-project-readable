import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import DefaultView from './DefaultView'
import PostView from '../components/PostView'
import NewPost from './NewPost'
import LoadingBar from 'react-redux-loading-bar'
import RouteNotFound from '../components/RouteNotFound'

class App extends Component {

	static propTypes = {
		routes: PropTypes.array.isRequired,
		loading: PropTypes.bool.isRequired
	}

	componentDidMount() {
		/* HANDLE INITIAL DATA */
		this.props.dispatch(handleInitialData())
	}

	render() {
		const { loading, routes } = this.props

		return (
			<Router>
				<Fragment>
					<div className="container">
						<LoadingBar className="loading-bar" />
						<Fragment>
							{ loading
			      		? <div className="error">
			      				<p>Sorry! The server is unavaiable. <br /> Please, try again later.</p>
			      			</div>
								: <Switch>
										<Route exact path="/" component={DefaultView} />
										{routes.map((route, index) => (
											<Route exact key={index} path={`/${route}`} render={() => <DefaultView category={route} />} />
			              ))}
			              <Route path="/post/:id" component={PostView} />
			              <Route exat path="/post" component={NewPost} />
		              	<Route component={RouteNotFound} />
		            </Switch>
		          }
						</Fragment>
					</div>
				</Fragment>
			</Router>
		);
	}
}

const mapStateToProps = ({ categories, posts, loading }) => {

	console.log('mapStateToProps', loading)
	return {
		routes: categories.items.map(item => (item.path)),
		loading: loading.error
	}
}

export default connect(mapStateToProps)(App)
