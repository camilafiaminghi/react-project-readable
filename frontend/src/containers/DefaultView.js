import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { handlePosts } from '../actions/posts'
import Nav from './Nav'
import Post from './Post'

class DefaultView extends Component {

	static propTypes = {
		categories: PropTypes.array.isRequired,
		posts: PropTypes.array.isRequired
	}

	componentDidMount() {
		const category = this.props.match.path.split('/')[1]
		this.props.dispatch(handlePosts(category))
	}

	render() {
		const { posts } = this.props

		return (
			<div>
				<Nav />
				<ul>
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

const mapStateToProps = ({ categories, posts }) => {
	return {
		categories: categories.items,
		posts: posts.items.sort((a, b) => ( b.voteScore - a.voteScore ))
	}
}

export default connect(mapStateToProps)(DefaultView)
