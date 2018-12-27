import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { handleComments } from '../actions/comments'
import Comment from './Comment'

export class Comments extends Component {

	static propTypes = {
		comments: PropTypes.object
	}

	componentDidMount() {
		/* HANDLE COMMENTS BY POST */
		this.props.dispatch(handleComments(this.props.id))
	}

	render() {
		const { success, byId } = this.props.comments

		return (
			<div className="children-list">
				<button
					onClick={() => {}}>
					<i className="material-icons">add_box</i>Comment
				</button>

				<ul className="items">
					{ (success) && Object.keys(byId).map((key, index) => (
						<li key={index} className="item bordered">
							<Comment id={key} />
						</li>
					))}
				</ul>
			</div>
		)
	}
}

export const mapStateToProps = ({ comments }, props) => {
	const { id } = props

	return {
		id,
		comments
	}
}

export default connect(mapStateToProps)(Comments)
