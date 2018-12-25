import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { handleVotePost, handleRemovePost } from '../actions/posts'
import { timeDiff, formatTimeDiff } from '../utils/dateUtils'

export class Post extends Component {

	static propTypes = {
		id: PropTypes.string.isRequired,
		post: PropTypes.object.isRequired,
		singleView: PropTypes.bool.isRequired,
		action: PropTypes.string.isRequired,
		success: PropTypes.bool.isRequired
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
		const { id, voteScore, author, timestamp, title, body, commentCount } = this.props.post
		const { singleView, action, success } = this.props
		const { goBack } = this.props.history
		const pathname = this.props.location.pathname.split('/')[1]

		/* IF SUCCESS HANDLE REMOVE GO BACK */
		if ( action === 'remove' && success ) {
			goBack()
		}

		return (
			<div className="post">
				<div className="header">
					<span>
						Score [{ voteScore }]
						<button onClick={this.handleUpVote}>+</button>
						<button onClick={this.handleDownVote}>-</button>
					</span>
					<span> Posted by { author } { formatTimeDiff(timeDiff(timestamp)) }</span>
				</div>
				{ (pathname === 'post')
					? <section>
							<h2 className="title">{ title }</h2>
							<p className="content">{ body }</p>
						</section>
					: <Link to={`/post/${id}`}>
							<section>
								<h2 className="title">{ title }</h2>
								<p className="content">{ body }</p>
							</section>
						</Link>
				}
				<div className="footer">
					<div>
						<button onClick={this.handleRemove}>Remove Post</button>
					</div>
					<span>{ commentCount } { (commentCount > 1) ? `Comments` : `Comment` }</span>
				</div>
			</div>
		)
	}
}

const mapStateToProps = ({ posts }, props) => {
	const { id, singleView } = props
	const { action, success } = posts
	const post = posts.items.filter((item) => (id === item.id))[0] || {}

	return {
		id,
		post,
		singleView,
		action,
		success
	}
}

export default withRouter(connect(mapStateToProps)(Post))
