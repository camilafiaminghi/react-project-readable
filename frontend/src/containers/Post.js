import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { push } from 'connected-react-router'
import { handleVotePost, handleRemovePost } from '../actions/posts'
import { timeDiff, formatTimeDiff } from '../utils/dateUtils'

export class Post extends Component {

	static propTypes = {
		id: PropTypes.string.isRequired,
		post: PropTypes.object,
		pathname: PropTypes.string.isRequired
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
		const { post } = this.props

		if ( post ) {
			const { id, voteScore, author, timestamp, title, body, category, commentCount } = post
			const { pathname } = this.props

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
						<span className="author"> Posted by <strong>{ author }</strong> { formatTimeDiff(timeDiff(timestamp)) }</span>
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
						<span className="count">
							<strong>{ commentCount }</strong> { (commentCount > 1) ? `comments` : `comment` }
						</span>
					</div>
						{ (pathname !== 'post')
							? null
							: <div className="controls">
									<Link
										to={{pathname: `/edit/post/${id}`, state: { category }}}
										aria-label="Edit Post">
										<i className="material-icons">edit</i>
									</Link>
									<button
										onClick={this.handleRemove}
										aria-label="Remove Post">
										<i className="material-icons">close</i>
									</button>
								</div>
						}
				</div>
			)
		} else {
			return (
				<div className="error">
  				<p>Sorry! The server is unavaiable. <br /> Please, try again later.</p>
  			</div>
			)
		}
	}
}

const mapStateToProps = ({ posts }, props) => {
	const { id } = props
	const post = posts.byId[id]
	const pathname = props.location.pathname.split('/')[1]

	return {
		id,
		post,
		pathname
	}
}

export default withRouter(connect(mapStateToProps)(Post))
