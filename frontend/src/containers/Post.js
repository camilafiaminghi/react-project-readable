import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Debounce } from 'react-throttle';
import { handlePosts, handleVotePost, handleRemovePost } from '../actions/posts'
import { timeDiff, formatTimeDiff } from '../utils/dateUtils'

export class Post extends Component {

	static propTypes = {
		id: PropTypes.string.isRequired,
		post: PropTypes.object,
		singleView: PropTypes.bool.isRequired
	}

	render() {
		const { post, singleView, handleRemove, handleVote } = this.props
		const { id, voteScore, author, timestamp, title, body, category, commentCount } = post

		return (
			<div className="item">
				<div className="vote-score">
					<Debounce time="100" handler="onClick">
						<button
							onClick={() => handleVote(id, 'upVote')}
							aria-label="Increase Vote Score">
							<i className="material-icons">expand_less</i>
						</button>
					</Debounce>
					<span>{ voteScore }</span>
					<Debounce time="100" handler="onClick">
						<button
							onClick={() => handleVote(id, 'downVote')}
							aria-label="Decrease Vote Score">
							<i className="material-icons">expand_more</i>
						</button>
					</Debounce>
				</div>
				<div className="details">
					<span className="author"> Posted by <strong>{ author }</strong> { formatTimeDiff(timeDiff(timestamp)) }</span>
					{ (singleView)
						? <section>
								<h2 className="title">{ title }</h2>
								<p className="content">{ body }</p>
							</section>
						: <Link to={`/${category}/${id}`}>
								<section>
									<h2>{ title }</h2>
									<p>{ body }</p>
								</section>
							</Link>
					}
					<span className="count">
						<strong>{ commentCount }</strong> { (commentCount > 1) ? `comments` : `comment` }
					</span>
				</div>
					{ (singleView)
						? <div className="controls">
								<Link
									to={`/edit/${id}`}
									aria-label="Edit Post">
									<i className="material-icons">edit</i>
								</Link>
								<button
									onClick={() => handleRemove(id)}
									aria-label="Remove Post">
									<i className="material-icons">close</i>
								</button>
							</div>
						: null
					}
			</div>
		)
	}
}

export const mapStateToProps = ({ posts }, props) => {
	const { id, singleView } = props
	const post = posts.byId[id]

	return {
		id,
		post,
		singleView
	}
}

export const mapDispatchToProps = (dispatch) => {
  return {
  	handlePosts: (category) => dispatch(handlePosts(category)),
    handleVote: (id, option) => dispatch(handleVotePost(id, option)),
    handleRemove: (id) => dispatch(handleRemovePost(id))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post))
