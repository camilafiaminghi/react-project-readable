import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { handlePosts } from '../actions/posts'
import { Link } from 'react-router-dom'
import Nav from './Nav'
import Post from './Post'

export class DefaultView extends Component {

	static propTypes = {
		category: PropTypes.string,
		items: PropTypes.array.isRequired
	}

	componentDidMount() {
		const { dispatch, category } = this.props

		/* HANDLE POSTS BY CATEGORY */
		dispatch(handlePosts(category))
	}

	render() {
		const { items, category } = this.props

		return (
			<div>
				<Nav />

				<ul className="items">
					{items.map((item, index) => (
						<li key={index}>
							<Post id={item.id} singleView={false} />
						</li>
					))}
				</ul>

				<Link
					to={{pathname: '/post', state: { category }}}
					className="btn-add"
					aria-label="Add Post">
					<i className="material-icons">add_circle</i>
				</Link>
			</div>
		)
	}
}

export const mapStateToProps = ({ posts, categories }, props) => {
	const { category } = props
	const items = posts.items

	return {
		category,
		items
	}
}

export default connect(mapStateToProps)(DefaultView)
