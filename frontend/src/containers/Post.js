import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { handlePostUpVote } from '../actions/posts'
import { Link, withRouter } from 'react-router-dom'
import { timeDiff, formatTimeDiff } from '../utils/dateUtils'

export class Post extends Component {

	static propTypes = {
		id: PropTypes.string.isRequired,
		post: PropTypes.object.isRequired
	}

	handleUpVote = (event) => {
		event.preventDefault()
		const { dispatch, id } = this.props

		dispatch(handlePostUpVote(id))
	}

	render() {
		const { id, voteScore, author, timestamp, title, body, commentCount } = this.props.post

		return (
			<div className="post">
				<div className="header">
					<span>
						Score
						[{ voteScore }]
						<button onClick={this.handleUpVote}>+</button>
					</span>
					<span>Posted by { author } { formatTimeDiff(timeDiff(timestamp)) }</span>
				</div>
				<Link to={`/post/${id}`}>
					<section>
						<h2 className="title">{ title }</h2>
						<div className="content">{ body }</div>
					</section>
				</Link>
				<div className="footer">
					<span>{ commentCount } { (commentCount > 1) ? `Comments` : `Comment` }</span>
				</div>
			</div>
		)
	}
}

const mapStateToProps = ({ posts }, props) => {
	const id = props.id
	const post = posts.items.filter((item) => (id === item.id))[0] || {}

	return {
		id,
		post
	}
}

export default withRouter(connect(mapStateToProps)(Post))
