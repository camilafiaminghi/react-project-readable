import React, { Component } from 'react'
import { connect } from 'react-redux'
import Nav from './Nav'

class DefaultView extends Component {

	render() {
		return (
			<div>
				DefaultView
				<Nav />
			</div>
		)
	}
}

function mapStateToProps ({ categories }) {
	return {
		categories: categories.items,
	}
}

export default connect(mapStateToProps)(DefaultView)
