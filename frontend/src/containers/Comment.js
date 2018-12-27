import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { handleVoteComment } from '../actions/comments'
import { timeDiff, formatTimeDiff } from '../utils/dateUtils'

export class Comment extends Component {

	static propTypes = {
		comment: PropTypes.object.isRequired
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

	render() {
		const { voteScore, author, body, timestamp } = this.props.comment

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
					<span className="author"> Posted by { author } { formatTimeDiff(timeDiff(timestamp)) }</span>
					<section>
						<h3>{ body }</h3>
					</section>
				</div>
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
