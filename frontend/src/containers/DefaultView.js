import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Nav from './Nav'

class DefaultView extends Component {

	static propTypes = {
		categories: PropTypes.array.isRequired
	}

	componentDidMount() {
		console.log('pathname: ', this.props.match.path.split('/')[1])
	}

	render() {
		return (
			<div>
				DefaultView
				<Nav />
			</div>
		)
	}
}

function mapStateToProps ({ categories }, { route }) {
	return {
		categories: categories.items,
	}
}

export default connect(mapStateToProps)(DefaultView)
