import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { timeDiff, formatTimeDiff } from '../utils/dateUtils'

export class Comment extends Component {

	static propTypes = {
		comment: PropTypes.object.isRequired
	}

	render() {
		const { id, voteScore, author, body, timestamp } = this.props.comment

		return (
			<div className="comment">
				<div className="header">
					<span>Score [{ voteScore }] </span>
					<span>Commented by { author } { formatTimeDiff(timeDiff(timestamp)) }</span>
				</div>
				<section>
					<h2>Comment {id}</h2>
					<div className="content">{ body }</div>
				</section>
				<div className="footer">
					<span></span>
				</div>
			</div>
		)
	}
}

const mapStateToProps = ({ comments }, props) => {
	const { id } = props
	const comment = comments.items.filter((comment) => (comment.id === id))[0]

	return {
		comment
	}
}

export default connect(mapStateToProps)(Comment)
