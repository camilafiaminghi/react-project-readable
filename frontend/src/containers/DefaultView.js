import React, { Component } from 'react'
import { connect } from 'react-redux'

class DefaultView extends Component {

	render() {
		return (
			<div>
				Root View lists all posts
			</div>
		)
	}
}

function mapStateToProps ({ categories }) {
	return {
		categories: categories,
	}
}

export default connect(mapStateToProps)(DefaultView)
