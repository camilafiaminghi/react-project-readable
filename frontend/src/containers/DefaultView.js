import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { handlePosts } from '../actions/posts'
import Nav from './Nav'

class DefaultView extends Component {

	static propTypes = {
		categories: PropTypes.array.isRequired
	}

	componentDidMount() {
		const category = this.props.match.path.split('/')[1]
		this.props.dispatch(handlePosts(category))
	}

	render() {
		return (
			<div>
				<Nav />
			</div>
		)
	}
}

const mapStateToProps = ({ categories }) => {
	return {
		categories: categories.items,
	}
}

export default connect(mapStateToProps)(DefaultView)
