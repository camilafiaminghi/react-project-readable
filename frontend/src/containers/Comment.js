import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { handleVoteComment } from '../actions/comments'
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

	handleUpVote = (event) => {
		event.preventDefault()
		const { dispatch, id } = this.props

		dispatch(handleVoteComment(id, 'upVote'))
	}

	handleDownVote = (event) => {
		event.preventDefault()
		const { dispatch, id } = this.props

		dispatch(handleVoteComment(id, 'downVote'))
	}

	handleRemove = () => {
		const { dispatch, id } = this.props
		dispatch(handleRemovePostComments(id))
	}

	handleUpdate = () => {
		// const { dispatch, id } = this.props
		// dispatch(handleUpdateComment(id))
	}

	render() {
		const { voteScore, author, body, timestamp } = this.props.comment
		const { editComment } = this.state

		return (
			<div>
				<div className="vote-score">
					<button
						onClick={this.handleUpVote}
						aria-label="Increase Vote Score">
						<i className="material-icons">expand_less</i>
					</button>
					<span>{ voteScore }</span>
					<button
						onClick={this.handleDownVote}
						aria-label="Decrease Vote Score">
						<i className="material-icons">expand_more</i>
					</button>
				</div>
				<div className="details">
					<span className="author"> Commented by { author } { formatTimeDiff(timeDiff(timestamp)) }</span>
					<section>
						<h3>{ body }</h3>
					</section>
				</div>
				<div className="controls">
					{/* (!editComment) &&
						<button
							onClick={() => this.setState((prevState) => ({...prevState, editComment: !prevState.editComment}))}
							aria-label="Edit Post">
							<i className="material-icons md-24">edit</i>
						</button>
					*/}
					<button
						onClick={this.handleRemove}
						aria-label="Remove Post">
						<i className="material-icons md-24">close</i>
					</button>
				</div>

				{ (editComment) &&
					<div className="form-edit">
						<button
							onClick={() => this.setState((prevState) => ({...prevState, editComment: !prevState.editComment}))}
							className="btn-add">
							<i className="material-icons">remove_circle_outline</i>cancel
						</button>
						<FormComment comment={{author,body}} handleSubmit={this.handleUpdate} />
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

export default connect(mapStateToProps)(Comment)
