import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { handlePosts } from '../actions/posts'
import { Link } from 'react-router-dom'
import Nav from './Nav'
import Post from './Post'

class DefaultView extends Component {

	static propTypes = {
		category: PropTypes.string,
		items: PropTypes.array.isRequired
	}

	componentDidMount() {
		/* HANDLE POSTS BY CATEGORY */
		this.props.dispatch(handlePosts(this.props.category))
	}

	render() {
		const { items, category } = this.props

		return (
			<div>
				<Nav />

				<ul className="list">
					{items.map((item, index) => (
						<li key={index}>
							<Post id={item.id} singleView={false} />
						</li>
					))}
				</ul>

				<div className="btn-add-post">
					<Link to={{pathname: '/post', state: { category }}}>Add Post</Link>
				</div>
			</div>
		)
	}
}

const mapStateToProps = ({ posts, categories }, props) => {
	const { category } = props
	const items = posts.items.sort((a, b) => ( b.voteScore - a.voteScore ))

	return {
		category: category,
		items
	}
}

export default connect(mapStateToProps)(DefaultView)
