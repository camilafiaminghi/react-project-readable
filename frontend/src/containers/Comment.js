import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { handleVoteComment, handleUpdateComment } from '../actions/comments'
import { handleRemovePostComments } from '../actions/shared'
import { timeDiff, formatTimeDiff } from '../utils/dateUtils'
import FormComment from './FormComment'

export class Comment extends Component {

	static propTypes = {
		comment: PropTypes.object.isRequired
	}

	state = {
		editComment: false
	}

	handleOnUpdate = (validated, form) => {
		const { id, handleUpdate } = this.props

		if (validated) {
			handleUpdate(id, form)
			this.setState((prevState) => ({...prevState, editComment: !prevState.editComment}))
		}
	}

	render() {
		const { id, handleRemove, handleVote } = this.props
		const { voteScore, author, body, timestamp } = this.props.comment
		const { editComment } = this.state

		return (
			<div>
				<div className="vote-score">
					<button
						onClick={() => handleVote(id, 'upVote')}
						aria-label="Increase Vote Score">
						<i className="material-icons">expand_less</i>
					</button>
					<span>{ voteScore }</span>
					<button
						onClick={() => handleVote(id, 'downVote')}
						aria-label="Decrease Vote Score">
						<i className="material-icons">expand_more</i>
					</button>
				</div>
				<div className="details">
					<span className="author"> Commented by <strong>{ author }</strong> { formatTimeDiff(timeDiff(timestamp)) }</span>
					<section>
						<h3>{ body }</h3>
					</section>
				</div>
				<div className="controls">
					{ (!editComment) &&
						<button
							onClick={() => this.setState((prevState) => ({...prevState, editComment: !prevState.editComment}))}
							aria-label="Edit Comment">
							<i className="material-icons">edit</i>
						</button>
					}
					<button
						onClick={() => handleRemove(id)}
						aria-label="Remove Comment">
						<i className="material-icons">close</i>
					</button>
				</div>

				{ (editComment) &&
					<div className="form-edit">
						<button
							onClick={() => this.setState((prevState) => ({...prevState, editComment: !prevState.editComment}))}
							aria-label="Cancel Comment">
							<i className="material-icons">remove_circle_outline</i>cancel
						</button>
						<FormComment comment={{author,body}} handleSubmit={this.handleOnUpdate} />
					</div>
				}
			</div>
		)
	}
}

export const mapStateToProps = ({ comments }, props) => {
	const { id } = props
	const comment = (comments.success) ? comments.byId[id] : {}

	return {
		comment
	}
}

export const mapDispatchToProps = (dispatch) => {
  return {
    handleVote: (id, option) => dispatch(handleVoteComment(id, option)),
    handleRemove: (id) => dispatch(handleRemovePostComments(id)),
    handleUpdate: (id, form) => dispatch(handleUpdateComment(id, form))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)
