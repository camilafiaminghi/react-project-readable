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
  	return (
      <Router>
  			<Fragment>
		  		<div className="container">
		      	<Fragment>
      				<Route path="/" exact component={DefaultView} />
      			</Fragment>
      		</div>
		    </Fragment>
		  </Router>
    );
  }
}

export default connect()(App)
