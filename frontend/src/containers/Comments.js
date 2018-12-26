import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { handleComments } from '../actions/comments'
import Comment from './Comment'

export class Comments extends Component {

	static propTypes = {
		comments: PropTypes.array
	}

	componentDidMount() {
		/* HANDLE COMMENTS BY POST */
		this.props.dispatch(handleComments(this.props.id))
	}

	render() {
		const { comments } = this.props

		return (
			<ul className="list">
				{comments.map((comment, index) => (
					<li key={index}>
						<Comment id={comment.id} />
					</li>
				))}
			</ul>
		)
	}
}

export const mapStateToProps = ({ comments }, props) => {
	const { id } = props

	return {
		id,
		comments: comments.items
	}
}

export default connect(mapStateToProps)(Comments)
