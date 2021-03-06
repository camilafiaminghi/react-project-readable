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
		this.props.handleComments(this.props.parentId)
	}

	handleOnSave = (validated, form) => {
		const { parentId, handleSave } = this.props

		/* DISPATCH IF IS VALID */
		if (validated) {
			handleSave(form, parentId)
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
						className="btn-add"
						aria-label="Add Comment">
						<i className="material-icons">add_circle_outline</i>add comment
					</button>
				}

				{ (addComment) &&
					<div className="form-edit">
						<button
							onClick={() => this.setState((prevState) => ({...prevState, addComment: !prevState.addComment}))}
							className="btn-add"
							aria-label="Cancel Comment">
							<i className="material-icons">remove_circle_outline</i>cancel
						</button>
						<FormComment comment={{author:'',body:''}} handleSubmit={this.handleOnSave} />
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

export const mapDispatchToProps = (dispatch) => {
  return {
    handleComments: (id) => dispatch(handleComments(id)),
    handleSave: (form, parentId) => dispatch(handleUpdatePostComments(form, parentId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)
