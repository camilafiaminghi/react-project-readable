import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { handlePosts } from '../actions/posts'
import Nav from './Nav'
import Post from './Post'

class DefaultView extends Component {

	static propTypes = {
		category: PropTypes.string,
		posts: PropTypes.array.isRequired
	}

	componentDidMount() {
		/* HANDLE POSTS BY CATEGORY */
		this.props.dispatch(handlePosts(this.props.category))
	}

	render() {
		const { posts } = this.props

		return (
			<div>
				<Nav />
				<ul className="list">
					{posts.map((post, index) => (
						<li key={index}>
							<Post id={post.id} />
						</li>
					))}
				</ul>
			</div>
		)
	}
}

const mapStateToProps = ({ posts, categories }, props) => {
	const { category } = props

	return {
		category: category,
		posts: posts.items.sort((a, b) => ( b.voteScore - a.voteScore ))
	}
}

export default connect(mapStateToProps)(DefaultView)
