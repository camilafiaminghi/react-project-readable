import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { handleComments } from '../actions/comments'
import { handleUpdatePostComments } from '../actions/shared'
import Comment from './Comment'
import FormComment from './FormComment'

export class Comments extends Component {

	static propTypes = {
		parentId: PropTypes.string.isRequired,
		items: PropTypes.array.isRequired
	}

	state = {
		addComment: false
	}

	componentDidMount() {
		/* HANDLE COMMENTS BY POST */
		this.props.dispatch(handleComments(this.props.parentId))
	}

	handleSave = (validated, form) => {
		const { dispatch, parentId } = this.props

		/* DISPATCH IF IS VALID */
		if (validated) {
			dispatch(handleUpdatePostComments(form, parentId))
			this.setState((prevState) => ({...prevState, addComment: !prevState.addComment}))
		}
	}

	render() {
		const { items } = this.props
		const { addComment } = this.state

		return (
			<div className="children-list">
				{ (!addComment) &&
					<button
						onClick={() => this.setState((prevState) => ({...prevState, addComment: !prevState.addComment}))}
						className="btn-add">
						<i className="material-icons">add_circle_outline</i>add comment
					</button>
				}

				{ (addComment) &&
					<div className="form-edit">
						<button
							onClick={() => this.setState((prevState) => ({...prevState, addComment: !prevState.addComment}))}
							className="btn-add">
							<i className="material-icons">remove_circle_outline</i>cancel
						</button>
						<FormComment comment={{author:'',body:''}} handleSubmit={this.handleSave} />
					</div>
				}

				<ul className="items">
					{ items.map((key, index) => (
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
	const { parentId } = props
	const items = (comments.success) ? Object.keys(comments.byId) : []

	return {
		parentId,
		items
	}
}

export default connect(mapStateToProps)(Comments)
