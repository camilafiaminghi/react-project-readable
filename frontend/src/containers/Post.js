import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { handleVotePost, handleRemovePost } from '../actions/posts'
import { timeDiff, formatTimeDiff } from '../utils/dateUtils'

export class Post extends Component {

	static propTypes = {
		id: PropTypes.string.isRequired,
		post: PropTypes.object.isRequired
	}

	handleUpVote = (event) => {
		event.preventDefault()
		const { dispatch, id } = this.props

		dispatch(handleVotePost(id, 'upVote'))
	}

	handleDownVote = (event) => {
		event.preventDefault()
		const { dispatch, id } = this.props

		dispatch(handleVotePost(id, 'downVote'))
	}

	handleRemove = (event) => {
		event.preventDefault()
		const { dispatch, id } = this.props

		dispatch(handleRemovePost(id))
	}

	render() {
		const { id, voteScore, author, timestamp, title, body, category, commentCount } = this.props.post
		const pathname = this.props.location.pathname.split('/')[1]

		return (
			<div className="item">
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
					{ (pathname === 'post')
						? <section>
								<h2 className="title">{ title }</h2>
								<p className="content">{ body }</p>
							</section>
						: <Link to={{pathname:`/post/${id}`, state:{ pathname }}}>
								<section>
									<h2>{ title }</h2>
									<p>{ body }</p>
								</section>
							</Link>
					}
					<span className="count">{ commentCount } { (commentCount > 1) ? `Comments` : `Comment` }</span>
				</div>
					{ (pathname !== 'post')
						? null
						: <div className="controls">
								<Link
									to={{pathname: `/edit/post/${id}`, state: { category }}}
									className="btn"
									aria-label="Edit Post">
									<i className="material-icons md-24">edit</i>
								</Link>
								<button
									onClick={this.handleRemove}
									aria-label="Remove Post">
									<i className="material-icons md-24">close</i>
								</button>
							</div>
					}
			</div>
		)
	}
}

const mapStateToProps = ({ posts }, props) => {
	const { id } = props
	const post = posts.items.filter((item) => (id === item.id))[0] || {}

	return {
		id,
		post
	}
}

export default withRouter(connect(mapStateToProps)(Post))
