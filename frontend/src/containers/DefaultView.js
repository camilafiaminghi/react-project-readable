import React, { Component } from 'react'
import { connect } from 'react-redux'

class DefaultView extends Component {

	render() {
		// console.log('category param', this.props.match.params.category)
		// console.log('props', this.props)

		return (
			<div>
				Root View lists all posts
			</div>
		)
	}
}

function mapStateToProps ({ categories }) {
	return {
		// Initial state is null, true
		categories: categories,
	}
}

// export default withRouter(connect(mapStateToProps)(DefaultView))
export default connect(mapStateToProps)(DefaultView)
