import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import DefaultView from './DefaultView'

class App extends Component {
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

export default App
