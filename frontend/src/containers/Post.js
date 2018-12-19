import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

export class Post extends Component {

	static propTypes = {
		id: PropTypes.string.isRequired,
		post: PropTypes.object.isRequired
	}

	render() {
		const { voteScore, author, timestamp, title, body, commentCount } = this.props.post

		return (
			<div className="post">
				<div className="header">
					<span>Score [{ voteScore }] </span>
					<span>Posted by { author } - { timestamp }</span>
				</div>
				<section>
					<h2 className="title">{ title }</h2>
					<div className="content">{ body }</div>
				</section>
				<div className="footer">
					<span>{ commentCount } Comments</span>
				</div>
			</div>
		)
	}
}

const mapStateToProps = ({ posts }, { id }) => {
	return {
		post: posts.items.filter((item) => (id === item.id))[0]
	}
}

export default withRouter(connect(mapStateToProps)(Post))
